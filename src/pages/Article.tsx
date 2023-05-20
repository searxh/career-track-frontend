import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article as ArticleType } from "types";
import ReactMarkDown from "react-markdown";
import AuthorInfo from "components/AuthorInfo";
import FollowAuthorButton from "components/FollowAuthorButton";
import FavoriteArticleButton from "components/FavoriteArticleButton";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

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
      <Navbar />

      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>
            <div className="article-meta">
              {article ? (
                <>
                  <AuthorInfo author={article.author} createdAt={article.createdAt} />
                  <FollowAuthorButton author={article.author} />
                  &nbsp;&nbsp;
                  <FavoriteArticleButton article={article} />
                </>
              ) : null}
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
              {article ? (
                <>
                  <AuthorInfo author={article.author} createdAt={article.createdAt} />
                  <FollowAuthorButton author={article.author} />
                  &nbsp;&nbsp;
                  <FavoriteArticleButton article={article} />
                </>
              ) : null}
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

      <Footer />
    </>
  );
};

export default Article;
