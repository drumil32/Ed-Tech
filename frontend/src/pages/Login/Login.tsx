import { useState } from "react";
import Button from "../../components/atoms/Button/Button";
import styles from "./Login.module.scss";
import Input from "../../components/atoms/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { validateName, validatePhoneNumber } from "../../utils/validations";
import axios from "axios";
import restEndPoints from "../../data/restEndPoints.json";

const Login = () => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(inputName);
    console.log(nameError);
    let numberError = null;
    setNameError(nameError);

    if ('/signup' === pathName) {
      numberError = validatePhoneNumber(inputNumber);
      setNumberError(numberError);
      return;
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
      if ('/signup' === pathName) {

        const data = {
          phoneNumber: inputNumber,
          name: inputName.trim()
        }
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/${restEndPoints.signup}`,
          data
        );
        toast.success(response.data.message);
      } else {

        const data = {
          phoneNumber: inputNumber
        }

        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/${restEndPoints.login}`,
          data
        );
        toast.success(response.data.message);
      }
    } catch (err: any) {
      console.log(err);
      if (404 == err.response.status) {
        toast.info(err.response.data.message);
        navigate('/signup');
      }
    } finally {
      if (response) {
        console.log(response);
      }
      setLoading(false);
    }

    console.log("submit");
  };

  const onChangecaptcha = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <img
            src={
              pathName === "/signup"
                ? "/assets/signup.svg"
                : "/assets/login.svg"
            }
            alt=""
          />
          <h2 className={styles.formTitle}>
            {pathName === "/signup"
              ? "Sign Up to SprintUp"
              : "Log In to SprintUp"}
          </h2>
          <p className={styles.formSubTitle}>
            {pathName === "/signup"
              ? "Explore the available courses in detail"
              : "Explore the available courses in detail"}
          </p>
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
              placeholder="10 digits Mobile Number"
              value={inputNumber}
              disabled={isLoading}
              errorMessage={numberError}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={onChangecaptcha} />
            {isLoading ? (
              <div className="form-loader">
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
