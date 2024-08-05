import { useCallback, useMemo, useState } from "react";
import Button from "../../components/atoms/Button/Button";
import styles from "./Login.module.scss";
import Input from "../../components/atoms/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { validateName, validatePhoneNumber } from "../../utils/validations";
import restEndPoints from "../../data/restEndPoints.json";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/UserSliice";

const Login = () => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const numberError = validatePhoneNumber(inputNumber);
    setNumberError(numberError);

    let nameError = null;

    if ("/signup" === pathName) {
      nameError = validateName(inputName);
      setNameError(nameError);
    }

    if (nameError || numberError) {
      return;
    }

    if (!captchaVerified) {
      toast.error("Please verify that you are not a robot.");
      return;
    }
    let response = null;
    setLoading(true);

    try {
      if ("/signup" === pathName) {
        const data = {
          phoneNumber: inputNumber,
          name: inputName.trim(),
        };
        response = await axiosInstance.post(`/${restEndPoints.signup}`, data);
      } else {
        const data = {
          phoneNumber: inputNumber,
        };
        response = await axiosInstance.post(`/${restEndPoints.login}`, data);
      }
      const studentDetails = response.data.student;
      setInputName("");
      setInputNumber("");
      dispatch(
        setUserDetails({
          enrolled: studentDetails.isEnrolled,
          phoneNumber: studentDetails.phoneNumber,
          name: studentDetails.name,
          progress: studentDetails.enrolled
            ? studentDetails.enrolled.progress
            : 0,
          avatar: studentDetails.avatar,
        })
      );
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (err: any) {
      if (404 == err.response.status) {
        toast.info(err.response.data.error);
        navigate("/signup");
      }
      else {
        toast.error(err.response.data.error);
      }
    } finally {
      if (response) {
      }
      setLoading(false);
    }
  }, [inputName, inputNumber, captchaVerified, pathName, dispatch, navigate]);

  const onChangecaptcha = useCallback(async (value: string | null) => {
    if (value) {
      const response = await axiosInstance.post(`${restEndPoints.captchaVerify}`, {
        token: value
      });
      if (response.data.success) {
        setCaptchaVerified(true);
      }
      else {
        setCaptchaVerified(false);
      }
    } else {
      setCaptchaVerified(false);
    }
  }, []);


  const formTitle = useMemo(() => (
    pathName === "/signup"
      ? "Sign Up to SprintUp"
      : "Log In to SprintUp"
  ), [pathName]);

  const formSubTitle = useMemo(() => (
    "Explore the available courses in detail"
  ), []);
  const imgSrc = useMemo(() => (
    pathName === "/signup"
      ? "/assets/signup.svg"
      : "/assets/login.svg"
  ), [pathName]);

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <img
            src={imgSrc}
            alt=""
          />
          <h2 className={styles.formTitle}>{formTitle}</h2>
          <p className={styles.formSubTitle}>{formSubTitle}</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {pathName === "/signup" ? (
              <Input
                label="Full Name"
                icon={<FaUser />}
                placeholder="Full Name"
                value={inputName}
                disabled={isLoading}
                onChange={(e) => setInputName(e.target.value)}
                errorMessage={nameError}
              />
            ) : null}
            <Input
              label="Mobile Number"
              preText="+91"
              type="tel"
              placeholder="Enter your 10-digit number"
              value={inputNumber}
              disabled={isLoading}
              errorMessage={numberError}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onChangecaptcha}
            />
            {isLoading ? (
              <div className={styles.formLoader}>
                <img src="/assets/loader_compressed.gif" alt="loader" />
              </div>
            ) : (
              <Button text="Continue" style={{ width: "100%" }} />
            )}
          </form>
          <p className={styles.disclaimer}>
            By selecting ‘Continue’, you agree to SprintUp’s{" "}
            <a href="" target="_blank">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" target="_blank">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
