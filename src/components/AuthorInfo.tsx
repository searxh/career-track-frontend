import { Profile } from "types";

type AuthorProps = {
  author: Profile;
  createdAt: string;
};
export default function AuthorInfo({ author, createdAt }: AuthorProps) {
  return (
    <>
      <a href={`/#/profile/${author.username}`}>
        <img src="http://i.imgur.com/Qr71crq.jpg" />
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
