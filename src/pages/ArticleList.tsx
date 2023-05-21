import { useState, useEffect, useContext } from "react";
import { Article } from "types";
import ArticleItem from "../components/ArticleItem";
import { UserContext } from "App";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

export default function ArticleList() {
  const { user } = useContext(UserContext);
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [isGlobalFeed, setIsGlobalFeed] = useState<boolean>(false);
  const fetchFeed = () => {
    if (!user) setIsGlobalFeed(true);
    fetch(`http://localhost:3000/api/articles${isGlobalFeed ? "" : "/feed"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setArticles(data.articles);
      });
  };
  useEffect(() => {
    fetchFeed();
  }, [isGlobalFeed]);
  return (
    <>
      <Navbar />

      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {user ? (
                    <li className="nav-item">
                      <a onClick={() => setIsGlobalFeed(false)} className={`nav-link ${isGlobalFeed ? "" : "active"}`}>
                        Your Feed
                      </a>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <a onClick={() => setIsGlobalFeed(true)} className={`nav-link ${isGlobalFeed ? "active" : ""}`}>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {articles && articles.length !== 0 ? (
                articles.map(article => {
                  return <ArticleItem key={article.slug} article={article} onFavoriteCallback={fetchFeed} />;
                })
              ) : (
                <div className="col-md-3 message-text">
                  <p>No articles are here...</p>
                </div>
              )}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
