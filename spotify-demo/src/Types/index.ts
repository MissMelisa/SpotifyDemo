export type ItemType = {
  id: string;
  image: string;
  title: string;
  singer: string;
  uri?: string;
  date?: any;
};

export type CurrentPlayBack = {
  id: string;
  image: string;
  uri: string;
  name: string;
  singer?: string;
};

export type ProfileType = {
  images: string;
  name: string;
  followers: number;
  email: string;
};
