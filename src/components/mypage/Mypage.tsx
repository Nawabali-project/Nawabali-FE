import styled from 'styled-components';
import { TbApps } from 'react-icons/tb';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Post } from '@/interfaces/main/posts.interface';
import DetailPostModal from '../modal/DetailPostModal';
import { getMyBookMarks, getMyContents } from '@/api/mypage';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();
  const profileImg = localStorage.getItem('profileImageUrl') ?? undefined;
  const nickname = localStorage.getItem('nickname') ?? 'Unknown';
  const [type, setType] = useState<string>('contents');
  const { ref, inView } = useInView();
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsDetailPostModalOpen(true);
  };

  const fetchFunction = type === 'contents' ? getMyContents : getMyBookMarks;

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['scrollPosts', type],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.content.length > 0 && lastPage.data.hasNext) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fetching page number:', data!.pages.length + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, data]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  const handleShow = (changeType: string) => {
    setType(changeType);
  };

  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <div
        style={{
          width: '1000px',
          height: '160px',
          margin: '100px auto 10px',
          border: '1px solid red',
        }}
      >
        <Row>
          <ProfileImage src={profileImg} alt="Profile" />
          <Col>
            <div>
              <span>{nickname}</span>
              <span
                style={{
                  height: '20px',
                  padding: '5px 10px',
                  border: '1px solid #A1A1A1',
                  borderRadius: '15px',
                  color: '#757575',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/mypage/edit');
                }}
              >
                프로필 편집
              </span>
            </div>
            <span>서초구 토박이</span>
            <span>
              다음등급인 터줏대감까지 게시물 3개 / 좋아요 23개 남았어요 :)
            </span>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <div
            style={{ width: '500px', height: '2px', backgroundColor: 'black' }}
          />
          <div
            style={{
              width: '500px',
              margin: '0 auto',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => {
              handleShow('contents');
            }}
          >
            <TbApps /> 게시물 6
          </div>
        </Col>
        <Col>
          <div
            style={{
              width: '500px',
              height: '2px',
              backgroundColor: '#A1A1A1',
            }}
          />
          <div
            style={{
              width: '500px',
              margin: '0 auto',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => {
              handleShow('bookmarks');
            }}
          >
            <IoBookmarkOutline /> 저장됨
          </div>
        </Col>
      </Row>
      <Row style={{ flexWrap: 'wrap' }}>
        {data?.pages.map((page: any) =>
          page.data.content.map((post: any) => (
            <FeedTotalBox ref={ref} key={post.postId}>
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
            </FeedTotalBox>
          )),
        )}
      </Row>
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </div>
  );
};

export default Mypage;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px solid #e7e7e7;
`;

const FeedTotalBox = styled.div`
  width: 240px;
  margin: 5px;
`;

const ImgBox = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
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
        return '#FFB700'; // 카페 카테고리의 배경색
      case 'PHOTOZONE':
        return '#2176AE'; // 사진 존 카테고리의 배경색
      default:
        return '#ccc'; // 기본 배경색
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 5;
`;
