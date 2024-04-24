import {
  CommentIcon,
  LikeIcon,
  NoPostIcon,
  ThumbOutlineIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { getPostsByFilter } from '@/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import DetailPostModal from '../modal/DetailPostModal';
import { Post } from '@/interfaces/main/posts.interface';
import { LocationIcon } from '@/utils/icons';

const FeedList = ({ category, district }: { category: any; district: any }) => {
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
    queryKey: ['scrollPosts', category, district],
    queryFn: ({ pageParam = 0 }) =>
      getPostsByFilter({
        pageParam,
        category,
        district,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.number + 1;
      }
      return undefined;
    },
  });

  console.log('choi data', data);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('다음 페이지 로딩 중...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (
    status === 'success' &&
    data.pages[0]?.data?.content.length === 0 &&
    !isFetchingNextPage
  ) {
    return (
      <NoPostBox>
        <NoPostIcon />
        <NoPostComment>해당 게시물이 아직 없어요.</NoPostComment>
      </NoPostBox>
    );
  }

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {data?.pages.map((page: any, pageIndex) =>
        page.data?.content.map((post: any) => (
          <FeedTotalBox
            ref={pageIndex === data.pages.length - 1 ? ref : null}
            key={post.postId}
          >
            <UserInfoBox>
              <UserImg src={post.profileImageUrl} />
              <UserName>{post.nickname}</UserName>
              <UserGrade>
                {post.district} {post.userRankName}
              </UserGrade>
            </UserInfoBox>
            <ImgBox onClick={() => handlePostClick(post)}>
              <img src={post.mainImageUrl} alt="게시물 이미지" />
              <PostType category={post.category}>
                {post.category === 'FOOD'
                  ? '맛집'
                  : post.category === 'CAFE'
                    ? '카페'
                    : post.category === 'PHOTOZONE'
                      ? '사진'
                      : ''}
              </PostType>
            </ImgBox>
            <LikeCommentBox>
              <ThumbOutlineIcon />
              <CountBox>{post.localLikesCount}</CountBox>
              <LikeIcon />
              <CountBox>{post.likesCount}</CountBox>
              <CommentIcon />
              <CountBox>{post.commentCount}</CountBox>
            </LikeCommentBox>
            <LocationBox>
              {post.placeName == '' ? post.placeAddr : post.placeName}&nbsp;
              <LocationIcon />
            </LocationBox>
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
      {isFetchingNextPage}
    </>
  );
};

const NoPostBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  flex-direction: column;
`;

const NoPostComment = styled.div`
  margin: 30px 0 0 0;
  font-size: 30px;
  font-weight: 400;
`;

const LocationBox = styled.div`
  display: flex;
  align-items: center;
  width: 295px;
  padding: 5px 0px;
  font-size: 13px;
`;

const ContentsBox = styled.div`
  width: 295px;
  padding: 5px 0px;
  color: gray;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const CountBox = styled.div`
  margin: 0px 20px 0px 5px;
`;

export default FeedList;
