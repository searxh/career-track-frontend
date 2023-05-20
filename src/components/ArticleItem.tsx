import { Article } from "types";

type ArticleListProps = {
  article: Article;
};
export default function ArticleList({ article }: ArticleListProps) {
  const { author, createdAt, title, description, slug } = article;
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <a href={`/#/profile/${author.username}`}>
            <img src={author.image} />
          </a>
          <div className="info">
            <a href={`/#/profile/${author.username}`} className="author">
              {author.username}
            </a>
            <span className="date">{createdAt}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> 32
          </button>
        </div>
        <a href={`/#/${slug}`} className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </a>
      </div>
    </>
  );
}
