export interface ReviewsResponse {
  total: number;
  reviews: Review[];
}

export interface Review {
  badge: string;
  description: string;
  id: string;
  image: string;
  tags: string[];
  title: string;
}

export interface PaginationOptions {
  offset?: string;
  limit: number;
}
