import { LockSvg } from "@/assets/icons/lock-svg";
import { UserCircleSvg } from "@/assets/icons/user-circle-svg";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";

import {
  loginInitialValues,
  loginInitialValuesTypes,
  loginResolver,
} from "@/validations/login-validation";

import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";

const MemoLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<loginInitialValuesTypes>({
    resolver: yupResolver(loginResolver),
    defaultValues: loginInitialValues,
  });

  const submitHandler = async (formData: loginInitialValuesTypes) => {
    setIsSubmitting(true);
    setLoginError("");

    const success = await login(formData.username, formData.password);

    if (success) {
      navigate("/");
    } else {
      setLoginError("Kullanıcı adı veya şifre hatalı");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="dv-login__content-section__content__form">
      <h1 className="dv-login__content-section__content__form__title">
        AKILLI KESİNTİ YÖNETİM SİSTEMİ{" "}
      </h1>

      <form
        className="dv-login__content-section__content__form__box"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          label={"Kullanıcı Adı"}
          placeholder="admin"
          autoComplete="off"
          autoFocus
          error={errors.username?.message}
          leftIcon={<UserCircleSvg />}
          {...register("username")}
        />
        <Input
          label={"Şifre"}
          type={"password"}
          placeholder="admin"
          autoComplete="off"
          error={errors.password?.message || loginError}
          leftIcon={<LockSvg />}
          {...register("password")}
        />
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>
        <span className="forgot-password">Şifremi Unuttum</span>
      </form>
    </div>
  );
};

const LoginForm = memo(MemoLoginForm);

export default LoginForm;
