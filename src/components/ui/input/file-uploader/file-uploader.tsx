import { UploadSvg } from "@/assets/icons/upload-svg";
import "./file-uploader.scss";
import { Button } from "@/components/ui/button/button";

export const FileUploader = () => {
  return (
    <div className="file-upload">
      <input type="file" id="file-upload" className="file-upload__input" />
      <label htmlFor="file-upload" className="file-upload__label">
        <div className="upload-icon">
          <Button variant="secondary">
            <UploadSvg />
          </Button>
        </div>
        <div className="upload-text">
          <span className="upload-click">Yüklemek için tıklayın</span> veya
          sürükleyip bırakın
          <br />
          <span className="upload-formats">
            SVG, PNG, JPG veya GIF (maks. 800×400px)
          </span>
        </div>
      </label>
    </div>
  );
};
