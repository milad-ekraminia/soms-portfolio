import { SignOutSvg } from "@/assets/icons/sign-out-svg";
import "./user-avatar.scss";
import { getClassNames } from "@/helpers/get-class-names";
interface UserAvatarProps {
  isExpanded: boolean;
  initials: any;
}
const UserAvatar = ({ isExpanded, initials = "" }: UserAvatarProps) => {
  const firstName = "Test";
  const lastName = "User";
  return (
    <div className="user-profile">
      <div className="user-profile__avatar">{initials}</div>
      <div
        className={getClassNames("user-profile__details", [
          [isExpanded, "expanded"],
        ])}
      >
        <h4>
          {firstName} {lastName}
        </h4>
        <p>user@test.com</p>
      </div>
      <div
        className={getClassNames("user-profile__signout", [
          [isExpanded, "expanded"],
        ])}
      >
        <SignOutSvg />
      </div>
    </div>
  );
};

export default UserAvatar;
