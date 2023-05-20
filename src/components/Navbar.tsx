import { UserContext } from "App";
import { useContext } from "react";

export default function Navbar() {
  const { user } = useContext(UserContext);
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
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#/editor">
                    <i className="ion-compose" />
                    &nbsp;New Article
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#/settings">
                    <i className="ion-gear-a" />
                    &nbsp;Settings
                  </a>
                </li>
              </>
            ) : null}
            {user ? (
              <li className="nav-item">
                <a className="nav-link" href={`/#/profile/${user.username}`}>
                  <img className="user-pic" src="profile_pic.jpeg" />
                  {user.username}
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/#/login">
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#/register">
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
}
