import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article as ArticleType } from "types";
import ReactMarkDown from "react-markdown";

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType>();
  useEffect(() => {
    fetch(`http://localhost:3000/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticle(data.article);
      });
  }, [slug]);
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
          </ul>
        </div>
      </nav>

      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>

            <div className="article-meta">
              <a href={`/#/profile/${article?.author.username}`}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div className="info">
                <a href={`/#/profile/${article?.author.username}`} className="author">
                  {article?.author.username}
                </a>
                <span className="date">{article?.createdAt}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.author.username} <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">({article?.favoritesCount})</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              {article ? (
                <p>
                  <ReactMarkDown>{article.body}</ReactMarkDown>
                </p>
              ) : null}
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href={`/#/profile/${article?.author.username}`}>
                <img src="http://i.imgur.com/Qr71crq.jpg" />
              </a>
              <div className="info">
                <a href={`/#/profile/${article?.author.username}`} className="author">
                  {article?.author.username}
                </a>
                <span className="date">{article?.createdAt}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {article?.author.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Article;
