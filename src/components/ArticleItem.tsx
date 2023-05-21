import { Article } from "types";
import AuthorInfo from "./AuthorInfo";
import FavoriteArticleButton from "./FavoriteArticleButton";

type ArticleItemProps = {
  article: Article;
  onFavoriteCallback: () => void;
};
export default function ArticleItem({ article, onFavoriteCallback }: ArticleItemProps) {
  const { author, createdAt, title, description, slug } = article;
  return (
    <>
      <div className="article-preview">
        <div className="article-meta">
          <AuthorInfo author={author} createdAt={createdAt} />
          <FavoriteArticleButton article={article} onFavoriteCallback={onFavoriteCallback} isMinified />
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
