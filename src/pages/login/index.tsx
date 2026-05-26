import LoginContentSection from "@/components/pages/login/content";
import LoginImageSection from "@/components/pages/login/image";
import "@/components/pages/login/login.scss";
export default function Login() {
  return (
    <div className="dv-login">
      <LoginImageSection />

      <LoginContentSection />
    </div>
  );
}
