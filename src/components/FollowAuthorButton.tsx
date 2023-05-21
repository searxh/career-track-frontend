import { UserContext } from "App";
import { useContext } from "react";
import { Profile } from "types";

type FollowAuthorButtonProps = {
  author: Profile;
  onFollowCallback: () => unknown;
  className?: string;
};
export default function FollowAuthorButton({ author, onFollowCallback, className }: FollowAuthorButtonProps) {
  const { user } = useContext(UserContext);
  const handleFollow = () => {
    console.log(user?.token);
    fetch(`http://localhost:3000/api/profiles/${author.username}/follow`, {
      method: author.following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.profile) {
          onFollowCallback();
        }
      });
  };
  return (
    <>
      {user?.username !== author.username ? (
        <button onClick={handleFollow} className={`btn btn-sm btn-outline-secondary ${className}`}>
          <i className="ion-plus-round" />
          &nbsp; {author.following ? "Unfollow" : "Follow"} {author.username}
        </button>
      ) : null}
    </>
  );
}
