import { Profile } from "types";

type FollowAuthorButtonProps = {
  author: Profile;
};
export default function FollowAuthorButton({ author }: FollowAuthorButtonProps) {
  return (
    <>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; Follow {author.username}
      </button>
    </>
  );
}
