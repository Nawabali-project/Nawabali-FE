import Modal from './Modal';
import styled from 'styled-components';
import {
  CloseIcon,
  ThreePointIcon,
  LikeIcon,
  BookMarkIcon,
  LeftTranslucentIcon,
  RightTranslucentIcon,
  LocationWhiteIcon,
  LikeFilledIcon,
  BookMarkFilledIcon,
  ThumbIcon,
} from '@/utils/icons';
import { deletePost, editPost, useGetDedetailPost } from '@/api/post';
import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkBookmark, checkLike, checkLocalLike } from '@/api/likeBookmark';
import { useQueryClient } from '@tanstack/react-query';
import CommentInput from '../comment/CommentInput';
import CommentList from '../comment/CommentList';
import AlertModal from './AlertModal';

interface DetailPostProps {
  postId: number;
  setIsDetailPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailPostModal: React.FC<DetailPostProps> = ({
  postId,
  setIsDetailPostModalOpen,
}) => {
  const { data, isFetching, isError, error } = useGetDedetailPost(postId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLocalLiked, setIsLocalLiked] = useState(false);
  const [localLikesCount, setLocalLikesCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [isPostEditing, setIsPostEditing] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>('');
  const [alertType, setAlertType] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // 경고창 열기
  const showAlertModal = (message: React.ReactNode) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 수정, 삭제 토글창
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // 해당 게시물 (좋아요, 주민추천, 북마크) 초기값 세팅
  useEffect(() => {
    if (data) {
      setIsLiked(data.likeStatus);
      setIsLocalLiked(data.localLikeStatus);
      setIsBookmarked(data.bookmarkStatus);
      setLikesCount(data.likesCount);
      setLocalLikesCount(data.localLikesCount);
    }
  }, [data]);

  // 여러 사진 미리보기 동작
  const goNextImg = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.imageUrls.length);
  };
  const goPrevImg = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.imageUrls.length) % data.imageUrls.length,
    );
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsDetailPostModalOpen(false);
  };

  // 게시글 수정
  const editPostMutation = useMutation({
    mutationFn: ({ postId, contents }: { postId: number; contents: string }) =>
      editPost(postId, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [postId] });
      setAlertType('complete');
      showAlertModal('게시물 수정이 완료되었어요!');
    },
    onError: () => {
      setAlertType('error');
      showAlertModal('게시글 수정 실패 ㅠㅠ');
    },
  });

  const handleEditStart = () => {
    setEditingContent(data.contents);
    setIsPostEditing(true);
  };

  const handleEditPostClick = () => {
    editPostMutation.mutate({ postId, contents: editingContent });
    setIsPostEditing(false);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleEditPostClick();
    }
  };

  // 게시글 삭제
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      setIsDetailPostModalOpen(false);
      queryClient.invalidateQueries();
      setAlertType('complete');
      showAlertModal('게시글을 삭제하였습니다.');
    },
    onError: () => {
      setAlertType('error');
      showAlertModal('게시글 삭제 실패ㅠㅠ');
    },
  });

  const handleDeletePostClick = (postId: number) => {
    if (isBookmarked) {
      checkBookMarkMUtation.mutate(postId);
    }
    deletePostMutation.mutate(postId);
  };

  // 주민추천 클릭 동작
  const checkLocalLikeMutation = useMutation({
    mutationFn: checkLocalLike,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['scrollPosts'] });
    },
    onError: (error: any) => {
      setIsLocalLiked(!isLocalLiked);
      setLocalLikesCount(localLikesCount - 1);
      if (error.response.status === 403) {
        setAlertType('error');
        showAlertModal([
          '앗, 주민추천은',
          <br />,
          '로그인 후 이용 가능합니다 :)',
        ]);
      } else if (error.response.status === 400) {
        setAlertType('error');
        showAlertModal([
          '앗, 주민추천은',
          <br />,
          '동네주민만 누를 수 있어요!',
        ]);
      }
    },
  });

  const handleLocalLikeClick = (postId: number) => {
    setIsLocalLiked(!isLocalLiked);
    setLocalLikesCount((count) => (isLocalLiked ? count - 1 : count + 1));
    checkLocalLikeMutation.mutate(postId);
  };

  // 좋아요 클릭 동작
  const checkLikeMutation = useMutation({
    mutationFn: checkLike,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['scrollPosts'] });
    },
    onError: (error: any) => {
      setIsLiked(!isLiked);
      setLikesCount(likesCount - 1);
      if (error.response.status === 403) {
        setAlertType('error');
        showAlertModal([
          '앗, 좋아요는',
          <br />,
          '로그인 후 이용 가능합니다 :)',
        ]);
      }
    },
  });

  const handleLikeClick = (postId: number) => {
    setIsLiked(!isLiked);
    setLikesCount((count) => (isLiked ? count - 1 : count + 1));
    checkLikeMutation.mutate(postId);
  };

  // 북마크 클릭 동작
  const checkBookMarkMUtation = useMutation({
    mutationFn: checkBookmark,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['scrollPosts'] });
    },
    onError: (error: any) => {
      setIsBookmarked(!isBookmarked);
      if (error.response.status === 403) {
        setAlertType('error');
        showAlertModal([
          '앗, 북마크는',
          <br />,
          '로그인 후 이용 가능합니다 :)',
        ]);
      }
    },
  });

  const handleBookMarkClick = (postId: number) => {
    setIsBookmarked(!isBookmarked);
    checkBookMarkMUtation.mutate(postId);
  };

  console.log('id: ', postId);
  console.log('detail data: ', data);
  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error(error);
    return <p>Error loading the post details!</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Modal onClose={handleCloseModal} isAlertModalOpen={isAlertModalOpen}>
        <CloseBox onClick={handleCloseModal}>
          <CloseIcon />
        </CloseBox>
        <LocationBox>
          <LocationWhiteIcon />
          &nbsp;{data.placeName == '' ? data.placeAddr : data.placeName}
        </LocationBox>

        <MainLayout>
          <ImageBox>
            <img
              src={data?.imageUrls[currentIndex]}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {data.imageUrls.length > 1 && (
              <>
                <LeftIconBox
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrevImg();
                  }}
                >
                  <LeftTranslucentIcon />
                </LeftIconBox>

                <RightIconBox
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNextImg();
                  }}
                >
                  <RightTranslucentIcon />
                </RightIconBox>
                <DotsBox>
                  {data.imageUrls.map((_: null, index: number) => (
                    <Dot key={index} $active={currentIndex === index} />
                  ))}
                </DotsBox>
              </>
            )}
          </ImageBox>
          <DotsBox>
            {data.imageUrls.map((_: null, index: number) => {
              <Dot key={index} $active={currentIndex === index} />;
            })}
          </DotsBox>

          <ContentBox>
            <ContentHeader>
              <ProfileBox>
                <ProfileImg src={data?.profileImageUrl} />
              </ProfileBox>
              <div>
                <NameAndIcon>
                  <NickName>
                    {data?.nickname}
                    <UserGrade>
                      &nbsp;&nbsp;&nbsp;• {data?.district} {data?.userRankName}
                    </UserGrade>
                  </NickName>

                  {data?.userId == localStorage.getItem('userId') && (
                    <>
                      {isPostEditing ? (
                        <>
                          <CancelConfirmMent
                            onClick={() => setIsPostEditing(false)}
                          >
                            취소
                          </CancelConfirmMent>
                          <CancelConfirmMent onClick={handleEditPostClick}>
                            확인
                          </CancelConfirmMent>
                        </>
                      ) : (
                        <>
                          <ThreePointIconBox
                            onClick={toggleDropdown}
                            ref={dropdownRef}
                          >
                            <ThreePointIcon />
                            {showDropdown && (
                              <ToggleLayout>
                                <EditBox onClick={handleEditStart}>
                                  수정
                                </EditBox>
                                <EditBox
                                  onClick={() =>
                                    handleDeletePostClick(data?.postId)
                                  }
                                >
                                  삭제
                                </EditBox>
                              </ToggleLayout>
                            )}
                          </ThreePointIconBox>
                        </>
                      )}
                    </>
                  )}
                </NameAndIcon>
                {isPostEditing ? (
                  <>
                    <ContentTextArea
                      value={editingContent}
                      cols={10}
                      rows={6}
                      onChange={(e) => setEditingContent(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </>
                ) : (
                  <>
                    <ContentText>{data?.contents}</ContentText>
                  </>
                )}
              </div>
            </ContentHeader>

            <CommentList postId={data?.postId} />

            <ItemBox>
              <LikesBox>
                <LocalLikesBox
                  $isLocalLiked={isLocalLiked}
                  onClick={() => handleLocalLikeClick(data?.postId)}
                >
                  <ThumbIcon />
                  &nbsp;주민추천 {localLikesCount}
                </LocalLikesBox>
                <LikeIconBox onClick={() => handleLikeClick(data?.postId)}>
                  {isLiked ? <LikeFilledIcon /> : <LikeIcon />}
                  <LikeCount>{likesCount}</LikeCount>
                </LikeIconBox>
              </LikesBox>
              <BookMarkBox onClick={() => handleBookMarkClick(data?.postId)}>
                {isBookmarked ? <BookMarkFilledIcon /> : <BookMarkIcon />}
              </BookMarkBox>
            </ItemBox>

            <CommentInput postId={data?.postId} />
          </ContentBox>
        </MainLayout>
      </Modal>
      {isAlertModalOpen && (
        <AlertModal
          message={alertMessage}
          closeAlert={() => setIsAlertModalOpen(false)}
          alertType={alertType}
        />
      )}
    </>
  );
};

const UserGrade = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  color: gray;
  font-size: 12px;
`;

const ContentTextArea = styled.textarea`
  box-sizing: border-box;
  width: 85%;
  height: 60%;
  padding: 12px 12px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 15px;
  resize: none;
`;

const CancelConfirmMent = styled.div`
  width: 50px;
  color: gray;
  font-size: 13px;

  &:hover {
    color: red;
  }
`;

const ToggleLayout = styled.div`
  position: absolute;
  right: -90px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  z-index: 100;
`;

const EditBox = styled.div`
  padding: 5px 15px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const BookMarkBox = styled.div`
  cursor: pointer;
`;

const LocationBox = styled.div`
  position: absolute;
  left: 26%;
  top: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  padding: 7px 10px;
  color: white;
  background-color: #000000;
  opacity: 0.6;
  border-radius: 100px;
  font-size: 13px;
`;

const LeftIconBox = styled.button`
  position: absolute;
  top: 270px;
  left: 5px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  cursor: pointer;
`;

const RightIconBox = styled.button`
  position: absolute;
  top: 270px;
  right: 495px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  cursor: pointer;
`;

const DotsBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 23%;
`;

const Dot = styled.span<{ $active: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 3px;
  background-color: ${(props) => (props.$active ? '#ffffff' : '#b7b7b7')};
  border-radius: 100%;
`;

const CloseBox = styled.div`
  position: absolute;
  left: 45%;
  bottom: -80px;
  padding: 5px 6px 3px 7px;
  border-radius: 100px;
  z-index: 20;
  cursor: pointer;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 620px;
  border-top-left-radius: 140px;
  border-bottom-right-radius: 140px;
  border-bottom-left-radius: 15px;
  object-fit: cover;
  overflow: hidden;
`;

const NameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 370px;
`;

const ContentBox = styled.div`
  width: 480px;
  height: 620px;
`;

const ContentHeader = styled.div`
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid #f1f1f1;
`;

const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px 10px 10px 40px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 100px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 100px;
  object-fit: cover;
`;

const NickName = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: auto;
  height: 70px;
  padding: 10px 16px;
  border: none;
  font-size: 15px;
`;

const ContentText = styled.div`
  box-sizing: border-box;
  width: 85%;
  height: 120px;
  border: none;
  font-size: 15px;
  resize: none;
`;

const ThreePointIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px 0px 50px;
  margin: 15px 0px 5px 0px;
`;

const LikesBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
`;

const LocalLikesBox = styled.div<{ $isLocalLiked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 300px;
  background-color: #00a3ff;
  opacity: ${(props) => (props.$isLocalLiked ? '1' : '0.4')};
  color: white;
`;

const LikeIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
`;

export default DetailPostModal;
