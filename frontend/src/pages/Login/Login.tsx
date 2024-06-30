import { useState } from "react";
import Button from "../../components/atoms/Button/Button";
import styles from "./Login.module.scss";
import Input from "../../components/atoms/Input/Input";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

const Login = () => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const pathName = useLocation().pathname;

  const handleSubmit = () => {
    console.log("submit");
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
                errorMessage={nameError}
                onChange={(e) => setInputName(e.target.value)}
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
            {isLoading ? (
              <div className="form-loader">
                <img src="/assets/loader_compressed.gif" alt="loader" />
              </div>
            ) : (
              <Button
                text="Continue"
                style={{ width: "100%" }}
              />
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
