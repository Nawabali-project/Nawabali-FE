export interface Post {
  postId: number;
  profileImageUrl: string;
  nickname: string;
  imageUrls: string[];
  category: string;
  likesCount: number;
  commentCount: number;
  contents: string;
}
