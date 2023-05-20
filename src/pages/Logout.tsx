import { UserContext } from "App";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router";

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  useLayoutEffect(() => {
    setUser(undefined);
    sessionStorage.removeItem("user");
    history.push("/");
  }, []);
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
