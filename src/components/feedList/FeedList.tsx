import { CommentIcon, LikeIcon } from '@/utils/icons';
import styled from 'styled-components';
import { getPosts } from '@/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import DetailPostModal from '../modal/DetailPostModal';
import { Post } from '@/interfaces/main/posts.interface';

interface FeedListProps {
  clickedCategory: string | null;
}

const FeedList = ({ clickedCategory }: FeedListProps) => {
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsDetailPostModalOpen(true);
  };
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['scrollPosts'],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.content.length > 0) {
        return allPages.length;
      }
      return undefined;
    },
  });

  console.log('choi data', data);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fire!');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  /*
  const filteredPost =
    clickedCategory === null
      ? data.data.content
      : data.data.content.filter(
          (post: Post) => post.category === clickedCategory,
        );
  */

  return (
    <>
      {data?.pages.map((page: any) =>
        page.data.content.map((post: any) => (
          <FeedTotalBox ref={ref} key={post.postId}>
            <UserInfoBox>
              <UserImg src="https://img.freepik.com/free-photo/kitty-with-monochrome-wall-her_23-2148955134.jpg?t=st=1712986129~exp=1712989729~hmac=54301ae24769efc751f61f9514bed0b431756c6ef930490e47da5b8aa97cf46c&w=740" />
              <UserName>{post.nickname}</UserName>
              <UserGrade>서교동 토박이</UserGrade>
            </UserInfoBox>
            <ImgBox onClick={() => handlePostClick(post)}>
              <img src={post.imageUrls?.[0]} alt="Post Image" />
              <PostType category={post.category}>
                {post.category === 'FOOD'
                  ? '맛집'
                  : post.category === 'CAFE'
                    ? '카페'
                    : post.category === 'PHOTOZONE'
                      ? '사진'
                      : ' '}
              </PostType>
            </ImgBox>
            <LikeCommentBox>
              <LikeIcon />
              <LikesCountBox>{post.likesCount}</LikesCountBox>
              <CommentIcon />
              <CommentsCountBox>{post.commentCount}</CommentsCountBox>
            </LikeCommentBox>
            <ContentsBox>{post.contents}</ContentsBox>
          </FeedTotalBox>
        )),
      )}
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </>
  );
};

const ContentsBox = styled.div`
  width: 295px;
  padding: 5px 0px;
  color: gray;
  font-size: 13px;
`;

const FeedTotalBox = styled.div`
  width: 295px;
  margin: 10px;
`;

const UserInfoBox = styled.div`
  display: flex;
  width: 285px;
  margin: 5px;
`;

const UserImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 1000px;
  background-size: cover;
  object-fit: cover;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 0px 10px;
  font-size: 16px;
  font-weight: bold;
`;

const UserGrade = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #a1a1a1;
`;

const ImgBox = styled.div`
  position: relative;
  width: 295px;
  height: 295px;
  background-color: #d9d9d9;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

const PostType = styled.div<{ category: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  background-color: ${(props) => {
    switch (props.category) {
      case 'FOOD':
        return '#FE6847'; // 맛집 카테고리의 배경색
      case 'CAFE':
        return '#9BCF53'; // 카페 카테고리의 배경색
      case 'PHOTOZONE':
        return '#00A3FF'; // 사진 존 카테고리의 배경색
      default:
        return '#ccc'; // 기본 배경색
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 5;
`;

const LikeCommentBox = styled.div`
  display: flex;
  width: 295px;
  padding: 5px;
`;

const LikesCountBox = styled.div`
  margin: 0px 20px 0px 5px;
`;

const CommentsCountBox = styled.div`
  margin: 0px 20px 0px 5px;
`;

export default FeedList;
