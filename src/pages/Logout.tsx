import { UserContext } from "App";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router";

const Logout: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useLayoutEffect(() => {
    setUser(undefined);
    sessionStorage.removeItem("user");
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default Logout;
