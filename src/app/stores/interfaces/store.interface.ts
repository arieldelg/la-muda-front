export interface ReviewsResponse {
  total: number;
  reviews: Review[];
}

export interface ReviewsMap {
  ok: boolean;
  data: Review[];
  totalReviews: number;
}

export interface ReviewMap {
  ok: boolean;
  data: Review;
}

export interface PostResponse {
  ok: boolean;
  data: Review;
}

export interface Review {
  badge: string;
  description: string;
  id: string;
  images: Images[];
  tags: string[];
  title: string;
}

export interface Images {
  url: string;
  id: string;
}

export interface PaginationOptions {
  offset?: string;
  limit: number;
}

export interface PostOptions {
  badge: string;
  description: string;
  images: string[];
  tags: string[];
  title: string;
}

export interface SendFormInt {
  form: PostOptions;
  images: FileList;
}
