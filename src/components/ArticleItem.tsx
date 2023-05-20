import { Article } from "types";
import AuthorInfo from "./AuthorInfo";

type ArticleListProps = {
  article: Article;
};
export default function ArticleList({ article }: ArticleListProps) {
  const { author, createdAt, title, description, slug, favoritesCount } = article;
  console.log(article);
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <AuthorInfo author={author} createdAt={createdAt} />
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> {favoritesCount}
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
