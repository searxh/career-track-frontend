import { Profile } from "types";
import format from "date-fns/format";

type AuthorInfoProps = {
  author: Profile;
  createdAt: string;
};
const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, createdAt }: AuthorInfoProps) => {
  return (
    <>
      <a href={`/#/profile/${author.username}`}>
        <img src={author.image.length === 0 ? "profile_pic.jpeg" : author.image} />
      </a>
      <div className="info">
        <a href={`/#/profile/${author.username}`} className="author">
          {author.username}
        </a>
        <span className="date">{format(new Date(createdAt), "MMMM dd, yyyy")}</span>
      </div>
    </>
  );
};

export default AuthorInfo;
