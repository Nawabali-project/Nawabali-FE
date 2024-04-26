import styled from 'styled-components';
import * as c from '@/styles/CommonSytle';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Post } from '@/interfaces/main/posts.interface';
import DetailPostModal from '@/components/modal/DetailPostModal';
import { PostType } from '../components/news/CasouselStyle';
import {
  IoHeartOutline,
  // IoHeartSharp,
} from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import {
  Lv1Icon,
  Lv2Icon,
  Lv3Icon,
  CafeIcon,
  FoodIcon,
  CameraIcon2,
  FoodFilledIcon,
  CameraFilledIcon,
  CafeFilledIcon,
} from '@/utils/icons';
import { getOtherUsersContents } from '@/api/otherUser';
import { searchUserByNickname } from '@/api/chat';
import { User } from '@/interfaces/chat/chat.interface';
import { useParams } from 'react-router-dom';

const OtherUserPage = () => {
  const { nickname } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [category, setCategory] = useState<string>('');
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { ref, inView } = useInView();
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await searchUserByNickname(nickname!);
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    if (nickname) {
      fetchUserInfo();
    }
  }, [nickname]);

  useEffect(() => {}, [user, category]);

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['scrollPosts', user?.id, category],
    queryFn: ({ pageParam = 0 }) =>
      getOtherUsersContents({ pageParam }, user?.id, category),
    getNextPageParam: (lastPage) => {
      return lastPage.data.last ? undefined : lastPage.data.number + 1;
    },
    enabled: !!user?.id,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, data]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsDetailPostModalOpen(true);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, data]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  const handleKindClick = (kind: string) => {
    const newKind = clickedKind === kind ? '' : kind;
    setClickedKind(newKind);
    setCategory(newKind);
  };

  const hasNoPosts = data?.pages?.every(
    (page) => page.data.content.length === 0,
  );

  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <Row
        style={{
          width: '1000px',
          height: '160px',
          margin: '100px auto 10px',
          alignItems: 'center',
        }}
      >
        <ProfileBox>
          <ProfileImage src={user?.imgUrl} alt="Profile" />
          <MyLevel>
            {user?.rankName === '주민' ? (
              <Lv1Icon />
            ) : user?.rankName === '토박이' ? (
              <Lv2Icon />
            ) : (
              <Lv3Icon />
            )}
          </MyLevel>
        </ProfileBox>
        <Col style={{ marginLeft: '25px', justifyContent: 'center' }}>
          <c.Title>{nickname}</c.Title>
          <Col>
            <c.MiddleTitle>
              {user?.district} {user?.rankName}
            </c.MiddleTitle>
          </Col>
        </Col>
      </Row>

      <Row style={{ marginBottom: '10px' }}>
        <Col>
          <StatusBar
            style={{
              backgroundColor: '#A1A1A1',
            }}
          />
          <div
            style={{
              width: '1000px',
              height: '50px',
              margin: '20px auto 5px',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: '50px',
              fontSize: '20px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <ThreeKindBox>
              <KindBox
                kind="FOOD"
                $isSelected={clickedKind === 'FOOD'}
                onClick={() => handleKindClick('FOOD')}
              >
                {clickedKind === 'FOOD' ? <FoodIcon /> : <FoodFilledIcon />}
                &nbsp;맛집
              </KindBox>
              <KindBox
                kind="CAFE"
                $isSelected={clickedKind === 'CAFE'}
                onClick={() => handleKindClick('CAFE')}
              >
                {clickedKind === 'CAFE' ? <CafeIcon /> : <CafeFilledIcon />}
                &nbsp;카페
              </KindBox>
              <KindBox
                kind="PHOTOZONE"
                $isSelected={clickedKind === 'PHOTOZONE'}
                onClick={() => handleKindClick('PHOTOZONE')}
              >
                {clickedKind === 'PHOTOZONE' ? (
                  <CameraIcon2 />
                ) : (
                  <CameraFilledIcon />
                )}
                &nbsp;사진스팟
              </KindBox>
            </ThreeKindBox>
          </div>
        </Col>
      </Row>
      <Row style={{ flexWrap: 'wrap' }}>
        {data?.pages.map((page: any) =>
          page.data.content.map((post: any) => (
            <FeedTotalBox ref={ref} key={post.postId}>
              <ImgBox onClick={() => handlePostClick(post)}>
                <img src={post.mainImageUrl} alt="Post Image" />
                <PostType $category={post.category}>
                  {post.category === 'FOOD'
                    ? '맛집'
                    : post.category === 'CAFE'
                      ? '카페'
                      : post.category === 'PHOTOZONE'
                        ? '사진'
                        : ' '}
                </PostType>
              </ImgBox>

              <div style={{ padding: '0 5px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '400',
                    color: '#a1a1a1',
                    margin: '5px 0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      marginRight: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IoHeartOutline />
                    <span>&nbsp;{post.likesCount}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RiChat1Line />
                    <span>&nbsp;{post.commentCount}</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    margin: '5px 0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  서울특별시 연남동 48-7 1층
                  <FaMapMarkerAlt />
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: '400',
                    color: '#858585',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '180px',
                    }}
                  >
                    {post.contents}
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                    onClick={() => handlePostClick(post)}
                  >
                    게시물 보기
                  </span>
                </div>
              </div>
            </FeedTotalBox>
          )),
        )}
      </Row>
      {hasNoPosts && (
        <div
          style={{
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0px',
            color: '#A1A1A1',
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          아직 작성된 게시글이 없어요
        </div>
      )}
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

export default OtherUserPage;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileBox = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px solid #e7e7e7;
  object-fit: cover;
`;

const MyLevel = styled.div`
  position: absolute;
  top: -35px;
  left: 13px;
`;

const FeedTotalBox = styled.div`
  width: 240px;
  margin: 5px 5px 20px 5px;
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

const StatusBar = styled.div`
  width: 1000px;
  height: 1px;
`;

const ThreeKindBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const KindBox = styled.div<{ $isSelected?: boolean; kind: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  padding: 0px 9px;
  background-color: ${(props) => {
    if (!props.$isSelected) {
      return 'none';
    } else if (props.kind == 'FOOD') {
      return '#FE6847';
    } else if (props.kind == 'CAFE') {
      return '#9BCF53';
    } else if (props.kind == 'PHOTOZONE') {
      return '#00A3FF';
    }
  }};
  color: ${(props) => (props.$isSelected ? 'white' : 'none')};
  border: none;
  border-radius: 300px;
  box-shadow: 0px 0px 5px #d8d8d8;
  font-size: 14px;
  cursor: pointer;
`;
