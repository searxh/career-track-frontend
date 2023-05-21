import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Article, Profile as ProfileType } from "types";
import ArticleItem from "../components/ArticleItem";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { UserContext } from "App";
import FollowAuthorButton from "components/FollowAuthorButton";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams<{ username: string }>();
  const history = useHistory();
  const location = useLocation();
  const [profile, setProfile] = useState<ProfileType>();
  const [articles, setArticles] = useState<Array<Article>>([]);
  const fetchConfig: { [key: string]: any } = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (user) fetchConfig.headers.Authorization = `Token ${user.token}`;
  const fetchArticles = () => {
    fetch(
      `http://localhost:3000/api/articles?${
        location.pathname.includes("favorites") ? "favorited" : "author"
      }=${username}`,
      fetchConfig
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.articles);
      });
  };
  const fetchProfile = () => {
    fetch(`http://localhost:3000/api/profiles/${username}`, fetchConfig)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProfile(data.profile);
      });
  };
  useEffect(() => {
    fetchProfile();
    fetchArticles();
  }, [username, location.pathname]);
  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src="profile_pic.jpeg" className="user-img" />
                <h4>{profile?.username}</h4>
                <p>{profile?.bio}</p>
                {user?.username === username ? (
                  <button
                    onClick={() => {
                      history.push("/settings");
                    }}
                    className={`btn btn-sm btn-outline-secondary action-btn`}
                  >
                    <i className="ion-gear-a" />
                    &nbsp; Edit Profile Settings
                  </button>
                ) : profile ? (
                  <FollowAuthorButton
                    author={profile}
                    onFollowCallback={() => {
                      fetchProfile();
                    }}
                    className="action-btn"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${location.pathname.includes("favorites") ? "" : "active"}`}
                      href={`/#/profile/${username}`}
                    >
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${location.pathname.includes("favorites") ? "active" : ""}`}
                      href={`/#/profile/${username}/favorites`}
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articles && articles.length !== 0 ? (
                articles.map(article => {
                  return <ArticleItem key={article.slug} article={article} onFavoriteCallback={fetchArticles} />;
                })
              ) : (
                <div className="col-md-3 message-text">
                  <p>No articles are here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
