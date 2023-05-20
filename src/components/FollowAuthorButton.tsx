import { Profile } from "types";

type FollowAuthorButtonProps = {
  username: string;
  className?: string;
};
export default function FollowAuthorButton({ username, className }: FollowAuthorButtonProps) {
  return (
    <>
      <button className={`btn btn-sm btn-outline-secondary ${className}`}>
        <i className="ion-plus-round" />
        &nbsp; Follow {username}
      </button>
    </>
  );
}
