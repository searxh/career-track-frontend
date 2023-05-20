type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Array<string>;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type { Article, Profile };
