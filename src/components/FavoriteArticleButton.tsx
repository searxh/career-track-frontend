import { UserContext } from "App";
import { useContext } from "react";
import { Article } from "types";

type FavoriteArticleButtonProps = {
  article: Article;
  isMinified?: boolean;
  onFavoriteCallback: () => void;
};
export default function FavoriteArticleButton({ article, isMinified, onFavoriteCallback }: FavoriteArticleButtonProps) {
  const { user } = useContext(UserContext);
  const handleFavorite = () => {
    console.log(user?.token);
    fetch(`http://localhost:3000/api/articles/${article.slug}/favorite`, {
      method: article.favorited ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.article) {
          onFavoriteCallback();
        }
      });
  };
  return (
    <>
      {isMinified ? (
        <button
          onClick={handleFavorite}
          className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm pull-xs-right`}
        >
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      ) : (
        <button
          onClick={handleFavorite}
          className={`btn btn-sm ${article.favorited ? "btn-primary" : "btn-outline-primary"}`}
        >
          <i className="ion-heart" />
          &nbsp; {article.favorited ? "Unfavorite Article" : "Favorite Article"}{" "}
          <span className="counter">({article.favoritesCount})</span>
        </button>
      )}
    </>
  );
}
