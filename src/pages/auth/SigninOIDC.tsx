import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "react-oauth2-code-pkce";
const SigninOIDC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, error } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }

    if (error) {
      console.log("OAuth Error:", error);
    }
  }, [token, error, navigate, location.pathname]);

  return <div></div>;
};

export default SigninOIDC;
