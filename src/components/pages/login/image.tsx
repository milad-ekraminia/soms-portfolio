import { memo } from "react";

const MemoLoginImageSection = () => {
  return (
    <div className="dv-login__image-section">
      <img
        src="/images/login-content.png"
        alt="Atolla"
        className="dv-login__image-section__image"
      />

      <img
        src="/images/Logo.png"
        alt="Atolla logo"
        className="dv-login__image-section__image-logo"
      />
    </div>
  );
};

const LoginImageSection = memo(MemoLoginImageSection);

export default LoginImageSection;
