import { Article } from "types";

type FavoriteArticleButtonProps = {
  article: Article;
};
export default function FavoriteArticleButton({ article }: FavoriteArticleButtonProps) {
  return (
    <>
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart" />
        &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
      </button>
    </>
  );
}
