import { UserContext } from "App";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { User } from "types";

const Settings: React.FC = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleUpdateSettings = () => {
    const fetchConfig: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
      body: "",
    };
    const tempBody: { user: { [key: string]: string } } = {
      user: {},
    };
    if (imageRef.current?.value && imageRef.current?.value !== user?.image)
      tempBody.user.image = imageRef.current?.value;
    if (nameRef?.current?.value && nameRef.current.value !== user?.username)
      tempBody.user.username = nameRef.current.value;
    if (bioRef?.current?.value && bioRef.current.value !== user?.bio) tempBody.user.bio = bioRef.current.value;
    if (emailRef?.current?.value && emailRef.current.value !== user?.email)
      tempBody.user.email = emailRef.current.value;

    fetchConfig.body = JSON.stringify(tempBody);

    fetch(`http://localhost:3000/api/user`, fetchConfig)
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          history.push(`/profile/${data.user.username}`);
        } else if (data.message === "Unauthorized") {
          setUser(undefined);
          sessionStorage.removeItem("user");
        }
      });
  };

  const initializeValues = (user: User) => {
    if (imageRef.current) imageRef.current.value = user.image;
    if (nameRef.current) nameRef.current.value = user.username;
    if (bioRef.current) bioRef.current.value = user.bio;
    if (emailRef.current) emailRef.current.value = user.email;
  };

  useEffect(() => {
    if (user) {
      initializeValues(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input ref={imageRef} className="form-control" type="text" placeholder="URL of profile picture" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input ref={nameRef} className="form-control form-control-lg" type="text" placeholder="Your Name" />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      ref={bioRef}
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input ref={emailRef} className="form-control form-control-lg" type="text" placeholder="Email" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg" type="password" placeholder="Password" />
                  </fieldset>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      handleUpdateSettings();
                    }}
                    className="btn btn-lg btn-primary pull-xs-right"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <a className="btn btn-outline-danger" href="/#/logout">
                Or click here to logout.
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
