import { UserContext } from "App";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { user } = useContext(UserContext);
  const routes = ["/", "/editor", "/settings", `/profile/${user?.username}`, "/login", "/register"];
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className={`nav-link ${location.pathname === routes[0] ? "active" : ""}`} href="/#">
                Home
              </a>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <a className={`nav-link ${location.pathname === routes[1] ? "active" : ""}`} href="/#/editor">
                    <i className="ion-compose" />
                    &nbsp;New Article
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${location.pathname === routes[2] ? "active" : ""}`} href="/#/settings">
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                  </a>
                </li>
              </>
            ) : null}
            {user ? (
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === routes[3] ? "active" : ""}`}
                  href={`/#/profile/${user.username}`}
                >
                  <img className="user-pic" src={user.image.length === 0 ? "profile_pic.jpeg" : user.image} />
                  {user.username}
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className={`nav-link ${location.pathname === routes[4] ? "active" : ""}`} href="/#/login">
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${location.pathname === routes[5] ? "active" : ""}`} href="/#/register">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
