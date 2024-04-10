import { CommentIcon, LikeIcon } from '@/utils/icons/icons';
import styled from 'styled-components';
import { getPosts } from '@/api/axios/post';
// import { useQuery } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Feed = () => {
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
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.content.length > 0) {
        return allPages.length + 1;
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

  return (
    <>
      {data?.pages.map((page: any) =>
        page.data.content.map((post: any) => (
          <FeedTotalBox ref={ref} key={post.postId}>
            <UserInfoBox>
              <UserImg src={post.profileImageUrl} />
              <UserName>{post.nickname}</UserName>
              <UserGrade>서교동 토박이</UserGrade>
            </UserInfoBox>
            <ImgBox>
              <img
                src={post.imageUrls?.[0]} // 'imageUrls' 배열이 undefined일 수 있으므로 옵셔널 체이닝 사용
                alt="Post Image"
                style={{ width: '100%', height: '100%' }}
              />
              <PostType>{post.category}</PostType>
            </ImgBox>
            <LikeCommentBox>
              <LikeIcon />
              <LikesCountBox>{post.likesCount}</LikesCountBox>
              <CommentIcon />
              <CommentsCountBox>{post.commentCount}</CommentsCountBox>
            </LikeCommentBox>
          </FeedTotalBox>
        )),
      )}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </>
  );
};

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
  background-size: cover;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

const PostType = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  background-color: black;
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 100;
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

export default Feed;
