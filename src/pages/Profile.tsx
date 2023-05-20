import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article, Profile as ProfileType } from "types";
import ArticleItem from "../components/ArticleItem";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileType>();
  const [articles, setArticles] = useState<Array<Article>>([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/profiles/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProfile(data.profile);
      });
    fetch(`http://localhost:3000/api/articles?author=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.articles);
      });
  }, [username]);
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
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {profile?.username}
                </button>
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
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {articles.map(article => {
                return <ArticleItem key={article.slug} article={article} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
