import { UserContext } from "App";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Profile } from "types";

type FollowAuthorButtonProps = {
  author: Profile;
  onFollowCallback: () => unknown;
  className?: string;
};
const FollowAuthorButton: React.FC<FollowAuthorButtonProps> = ({
  author,
  onFollowCallback,
  className,
}: FollowAuthorButtonProps) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleFollow = () => {
    if (user) {
      fetch(`http://localhost:3000/api/profiles/${author.username}/follow`, {
        method: author.following ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.profile) {
            onFollowCallback();
          } else if (data.message === "Unauthorized") {
            setUser(undefined);
            sessionStorage.removeItem("user");
          }
        });
    } else {
      history.push("/login");
    }
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
};

export default FollowAuthorButton;
