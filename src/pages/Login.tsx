import { UserContext } from "App";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSignIn = () => {
    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.user) {
          setUser(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          history.push("/");
        } else if (data.message) {
          setIsError(true);
        }
      });
  };
  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="/#/register">Need an account?</a>
              </p>

              {isError ? (
                <ul className="error-messages">
                  <li>Email or password is invalid</li>
                </ul>
              ) : null}

              <form>
                <fieldset className="form-group">
                  <input ref={emailRef} className="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    ref={passwordRef}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                  />
                </fieldset>
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleSignIn();
                  }}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
