import { memo } from "react";
import LoginForm from "./form";

const MemoLoginContentSection = () => {
  return (
    <div className="dv-login__content-section">
      <div className="dv-login__content-section__content">
        <LoginForm />
      </div>
      {/* <LoginCopyright /> */}
    </div>
  );
};

const LoginContentSection = memo(MemoLoginContentSection);

export default LoginContentSection;
