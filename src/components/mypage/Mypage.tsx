import styled from 'styled-components';
import * as c from '@/styles/CommonSytle';
import { TbApps } from 'react-icons/tb';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Post } from '@/interfaces/main/posts.interface';
import DetailPostModal from '../modal/DetailPostModal';
import { getMyBookMarks, getMyContents } from '@/api/mypage';
import { useNavigate } from 'react-router-dom';
import { BsFiles } from 'react-icons/bs';

const Mypage = () => {
  const navigate = useNavigate();
  const profileImg = localStorage.getItem('profileImageUrl') ?? undefined;
  const nickname = localStorage.getItem('nickname') ?? 'Unknown';
  const district = localStorage.getItem('district') ?? 'Unknown';
  const rank = localStorage.getItem('rank') ?? 'Unknown';
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
      <Row
        style={{
          width: '1000px',
          height: '160px',
          margin: '100px auto 10px',
          // border: '1px solid red',
          alignItems: 'center',
        }}
      >
        <ProfileImage src={profileImg} alt="Profile" />
        <Col style={{ marginLeft: '25px', justifyContent: 'center' }}>
          <Row style={{ alignItems: 'center' }}>
            <c.Title>{nickname}</c.Title>
            <c.LightSpan
              style={{
                height: '13px',
                padding: '5px 10px',
                border: '1px solid #A1A1A1',
                borderRadius: '15px',
                cursor: 'pointer',
                lineHeight: '13px',
                fontSize: '12px',
                marginLeft: '10px',
              }}
              onClick={() => {
                navigate('/mypage/edit');
              }}
            >
              프로필 편집
            </c.LightSpan>
          </Row>
          <Col>
            <c.MiddleTitle>
              {district} {rank}
            </c.MiddleTitle>
            <c.LightSpan>
              다음등급인 터줏대감까지 게시물 3개 / 좋아요 23개 남았어요 :)
            </c.LightSpan>
          </Col>
        </Col>
      </Row>

      <Row style={{ marginBottom: '10px' }}>
        <Col>
          <StatusBar
            style={{
              backgroundColor: type === 'contents' ? 'black' : '#A1A1A1',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '50px',
              margin: '7px auto',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: '50px',
              fontSize: '20px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              handleShow('contents');
            }}
          >
            <TbApps /> <span style={{ marginLeft: '5px' }}>게시물 6</span>
          </div>
        </Col>
        <Col>
          <StatusBar
            style={{
              backgroundColor: type === 'bookmarks' ? 'black' : '#A1A1A1',
            }}
          />
          <div
            style={{
              width: '500px',
              margin: '7px auto',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: '50px',
              fontSize: '20px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              handleShow('bookmarks');
            }}
          >
            <IoBookmarkOutline />
            <span style={{ marginLeft: '5px' }}>저장됨</span>
          </div>
        </Col>
      </Row>
      <Row style={{ flexWrap: 'wrap' }}>
        {data?.pages.map((page: any) =>
          page.data.content.map((post: any) => (
            <FeedTotalBox ref={ref} key={post.postId}>
              <ImgBox onClick={() => handlePostClick(post)}>
                <img src={post.imageUrls?.[0]} alt="Post Image" />
                {post.imageUrls && post.imageUrls.length >= 2 && (
                  <PostsIcon>
                    <BsFiles size={'25px'} />
                  </PostsIcon>
                )}
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

const PostsIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 0px;
  padding: 3px 10px;
  color: white;
  font-size: 9px;
  z-index: 5;
`;

const StatusBar = styled.div`
  width: 500px;
  height: 2px;
`;
