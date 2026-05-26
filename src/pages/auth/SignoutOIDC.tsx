import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const SignoutOIDC = () => {
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
  }, []);

  return <div>Çıkış Yapılıyor...</div>;
};

export default SignoutOIDC;
