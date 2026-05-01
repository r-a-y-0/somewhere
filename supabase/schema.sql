create extension if not exists "pgcrypto";

create table if not exists boards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cover_image_url text,
  share_token text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists spots (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references boards(id) on delete cascade,
  title text not null,
  memo text,
  source_url text,
  image_url text,
  source_type text,
  section text not null default 'maybe',
  is_favorite boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references boards(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique(board_id, name)
);

create table if not exists spot_tags (
  spot_id uuid not null references spots(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (spot_id, tag_id)
);
