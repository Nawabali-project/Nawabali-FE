export interface PostItem {
  userId: number;
  postId: number;
  nickname: string;
  contents: string;
  category: string;
  district: string;
  placeName: string;
  placeAddr: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  modifiedAt: string;
  mainImageUrl: string;
  multiImages: true;
  likesCount: number;
  localLikesCount: number;
  commentCount: number;
  userRankName: string;
  profileImageUrl: string;
}

export interface ApiResponse {
  content: PostItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface GetRecentPostsParams {
  category: number;
  district: string;
  period: string;
}

export type CategoryData = {
  category: string;
  postCount: number;
};

export interface CarouselProps {
  iconCategory: string;
  category: string;
}
