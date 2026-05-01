export type Section = "all" | "day1" | "day2" | "maybe" | "favorite";

export type Board = {
  id: string;
  title: string;
  share_token: string;
  created_at: string;
};

export type Spot = {
  id: string;
  board_id: string;
  title: string;
  memo: string | null;
  source_url: string | null;
  image_url: string | null;
  section: "day1" | "day2" | "maybe";
  is_favorite: boolean;
  created_at: string;
};
