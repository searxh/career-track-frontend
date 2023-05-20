import { Article } from "types";

type ArticleListProps = {
  article: Article;
};
export default function ArticleList({ article }: ArticleListProps) {
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href="/#/profile/albertpai">
            <img src={article.author.image} />
          </a>
          <div className="info">
            <a href="/#/profile/albertpai" className="author">
              {article.author.username}
            </a>
            <span className="date">{article.createdAt}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> 32
          </button>
        </div>
        <a href="/#/the-song-you-wont-ever-stop-singing" className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    </>
  );
}
