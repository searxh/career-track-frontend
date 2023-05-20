import { Profile } from "types";

type AuthorProps = {
  author: Profile;
  createdAt: string;
};
export default function AuthorInfo({ author, createdAt }: AuthorProps) {
  return (
    <>
      <a href={`/#/profile/${author.username}`}>
        <img src="profile_pic.jpeg" />
      </a>
      <div className="info">
        <a href={`/#/profile/${author.username}`} className="author">
          {author.username}
        </a>
        <span className="date">{createdAt}</span>
      </div>
    </>
  );
}
