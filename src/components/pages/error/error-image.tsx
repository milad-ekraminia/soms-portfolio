import { memo } from "react";
import "./error-page.scss";

const MemoErrorPageImagee = () => {
  return (
    <div className="dv-error__image-section">
      <img
        src="/images/error-Image.png"
        alt="Atolla"
        className="dv-error__image-section__image"
      />
    </div>
  );
};

const ErrorPageImage = memo(MemoErrorPageImagee);

export default ErrorPageImage;
