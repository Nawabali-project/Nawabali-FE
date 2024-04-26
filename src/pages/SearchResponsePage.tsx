import { useSearchedPosts } from '@/api/header';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  CafeIcon,
  CameraFilledIcon,
  GlobalIcon,
  StarIcon,
  FoodIcon,
  FoodFilledIcon,
  CameraIcon2,
  CafeFilledIcon,
  MapIcon,
  ListBlackIcon,
} from '@/utils/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import { IoHeartOutline } from 'react-icons/io5';
import { useState } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';
import DetailPostModal from '@/components/modal/DetailPostModal';

const SearchResponsePage = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);

  const { data, error, isLoading } = useSearchedPosts(keyword!);

  const handleKindClick = (kind: string) => {
    setClickedKind(clickedKind === kind ? null : kind);
  };

  const handlePostClick = (item: PostItem) => {
    setSelectedPost(item);
    setIsDetailPostModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Container>
        <CategoryBox>
          <SecondHeader>
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
            <FourComponentBox>
              <FourCategory onClick={() => navigate('/')}>
                <MapIcon />
                &nbsp;지도
              </FourCategory>
              <FourCategory onClick={() => navigate('/listpage')}>
                <ListBlackIcon />
                <SelectedPageComment>&nbsp;리스트</SelectedPageComment>
              </FourCategory>
              <FourCategory onClick={() => navigate('/scorepage')}>
                <GlobalIcon />
                &nbsp;동네별 활동점수
              </FourCategory>
              <FourCategory onClick={() => navigate('/newspage')}>
                <StarIcon />
                &nbsp;동네소식
              </FourCategory>
            </FourComponentBox>
          </SecondHeader>
        </CategoryBox>
        {data && (
          <span style={{ fontWeight: '800', fontSize: '30px' }}>
            '{keyword}'에 대한 검색결과
          </span>
        )}
        <div style={{ margin: '0 auto' }}>
          <FeedsBox>
            {data?.content.map((item: PostItem, idx: number) => (
              <ImageContainer key={idx}>
                <Row style={{ marginBottom: '8px' }}>
                  <ProfileImg $profileImageUrl={item.profileImageUrl} />
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>
                    &nbsp;&nbsp;{item.nickname}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 400 }}>
                    &nbsp;&nbsp;·&nbsp;&nbsp;{item.district}&nbsp;
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 400 }}>
                    {item.userRankName}
                  </span>
                </Row>
                <div style={{ position: 'relative' }}>
                  <Post $backgroundImage={item.mainImageUrl} />

                  <PostType $category={item.category}>
                    {item.category === 'FOOD'
                      ? '맛집'
                      : item.category === 'CAFE'
                        ? '카페'
                        : item.category === 'PHOTOZONE'
                          ? '사진'
                          : ' '}
                  </PostType>
                </div>
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
                      <span>&nbsp;{item.likesCount}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RiChat1Line />
                      <span>&nbsp;{item.commentCount}</span>
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
                    <FaMapMarkerAlt style={{ marginRight: '3px' }} />
                    {item.placeName ? item.placeName : item.placeAddr}
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
                      {item.contents}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginRight: '5px',
                      }}
                      onClick={() => handlePostClick(item)}
                    >
                      게시물 보기
                    </span>
                  </div>
                </div>
              </ImageContainer>
            ))}
          </FeedsBox>
        </div>
        {!data && (
          <NoResults>
            <NoResultIcon src="/assets/svgs/searchWithNoAnswers.svg" />
            <div style={{ fontSize: '30px' }}>
              <span style={{ fontWeight: '800' }}>'{keyword}'</span>
              <span>에 대한 검색결과를 찾지 못했어요.</span>
            </div>
          </NoResults>
        )}
      </Container>
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
    </>
  );
};

export default SearchResponsePage;

const Container = styled.div`
  width: 1240px;
  margin: 160px auto;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  margin: 60px 5px 0;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const NoResultIcon = styled.img`
  width: 150px;
  height: 300px;
`;

const SecondHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
`;

const CategoryBox = styled.div`
  position: fixed;
  top: 61.25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  height: 65px;
  border-bottom: 1px solid #d9d9d9;
  z-index: 9;
`;

const ThreeKindBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const KindBox = styled.div<{ $isSelected?: boolean; kind: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 6px 9px;
  width: ${(props) => {
    return props.kind == 'PHOTOZONE' ? '84px' : '60px';
  }};
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

const FourComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 392px;
  cursor: pointer;
`;

const FourCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: #a1a1a1;
  font-weight: bold;
  cursor: pointer;
`;

const FeedsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1260px;
  margin: 0 auto;
  gap: 5px;
`;

const SelectedPageComment = styled.div`
  color: black;
`;

const ProfileImg = styled.div<{ $profileImageUrl: string }>`
  background-image: url(${(props) => props.$profileImageUrl});
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
  border: 1px solid #eeeeee;
`;

export const Post = styled.div<{
  $backgroundImage: string;
}>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  width: 234px;
  height: 234px;
  display: block;
  border-radius: 20px 0 20px 0;
`;

const PostType = styled.div<{ $category: string }>`
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 3px 10px;
  background-color: ${(props) => {
    switch (props.$category) {
      case 'FOOD':
        return '#FE6847';
      case 'CAFE':
        return '#9BCF53';
      case 'PHOTOZONE':
        return '#00A3FF';
      default:
        return '#ccc';
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 15;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;
