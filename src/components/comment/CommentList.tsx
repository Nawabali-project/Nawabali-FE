import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteComment, editComment, getComments } from '@/api/comment';
import { useEffect, useState } from 'react';
import AlertModal from '../modal/AlertModal';
import { NoCommentIcon } from '@/utils/icons';
import { formatDistanceToNow, addHours } from 'date-fns';
import { ko } from 'date-fns/locale';

interface CommentListType {
  postId: number;
}

interface IsEditingType {
  [key: number]: boolean;
}

interface EditContentType {
  [key: number]: string;
}

const CommentList: React.FC<CommentListType> = ({ postId }: any) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<IsEditingType>({});
  const [editContent, setEditContent] = useState<EditContentType>({});
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>('');
  const [alertType, setAlertType] = useState('');

  const showAlertModal = (message: React.ReactNode) => {
    setAlertMessage(message);
    setIsAlertModalOpen(true);
  };

  // 댓글 전체 조회 (무한스크롤)
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['scrollComments', postId],
    queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data.content.length > 0) {
        return allPages.length;
      }
      return undefined;
    },
  });

  // 무한스크롤 옵저버
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['scrollComments'] });
      queryClient.invalidateQueries({ queryKey: ['scrollPosts'] });
      setAlertType('complete');
      showAlertModal('댓글 삭제 완료!');
    },
    onError: () => {
      alert('댓글 삭제 실패 ㅠㅠ');
    },
  });

  const handleDeleteCommentClick = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  // 댓글 수정
  const handleEditStart = (commentId: number, content: string) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: true }));
    setEditContent((prev) => ({ ...prev, [commentId]: content }));
  };

  const handleEditCancel = (commentId: number) => {
    setIsEditing((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleChange = (commentId: number, value: string) => {
    setEditContent((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleEditConfirm = (commentId: number) => {
    const content = editContent[commentId];
    editCommentMutation.mutate({ commentId, content });
    setIsEditing((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleKeyPress = (event: any, commentId: number) => {
    if (event.key === 'Enter') {
      handleEditConfirm(commentId);
    }
  };

  const editCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => editComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrollComments', postId] });
    },
    onError: () => {
      alert('댓글 수정 실패 ㅠㅠ');
    },
  });

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }

  const hasComments = data?.pages.some((page) => page?.data.content.length > 0);

  return (
    <CommentsBox>
      {hasComments ? (
        data?.pages.map((page) =>
          page?.data?.content.map((post: any) => (
            <Comment ref={ref} key={post.commentId}>
              <ProfileBox>
                <ProfileImg src={post.profileImageUrl} />
              </ProfileBox>
              <div>
                <NameGrade>
                  <UserName>{post.nickname}</UserName>
                  <UserGrade>• {post.userInfo}</UserGrade>
                  {post?.userId == localStorage.getItem('userId') && (
                    <>
                      {isEditing[post.commentId] ? (
                        <>
                          <EditDelete
                            onClick={() => handleEditCancel(post.commentId)}
                          >
                            취소
                          </EditDelete>
                          <EditDelete
                            onClick={() => handleEditConfirm(post.commentId)}
                          >
                            확인
                          </EditDelete>
                        </>
                      ) : (
                        <>
                          <EditDelete
                            onClick={() =>
                              handleEditStart(post.commentId, post.contents)
                            }
                          >
                            수정
                          </EditDelete>
                          <EditDelete
                            onClick={() =>
                              handleDeleteCommentClick(post.commentId)
                            }
                          >
                            삭제
                          </EditDelete>
                        </>
                      )}
                    </>
                  )}
                </NameGrade>
                {!isEditing[post.commentId] ? (
                  <UserComment>{post.contents}</UserComment>
                ) : (
                  <EditComment
                    type="text"
                    value={editContent[post.commentId]}
                    onChange={(e) =>
                      handleChange(post.commentId, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyPress(e, post.commentId)}
                  />
                )}
                <CommentTime>
                  {formatDistanceToNow(addHours(new Date(post.createdAt), 9), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </CommentTime>
              </div>
            </Comment>
          )),
        )
      ) : (
        <InfoComment>
          <NoCommentIcon />
        </InfoComment>
      )}
      {isAlertModalOpen && (
        <AlertModal
          message={alertMessage}
          closeAlert={() => setIsAlertModalOpen(false)}
          alertType={alertType}
        />
      )}
      {isFetchingNextPage}
    </CommentsBox>
  );
};

const CommentTime = styled.div`
  margin: 7px 0 0 2px;
  color: gray;
  font-size: 11px;
`;

const EditComment = styled.input`
  width: 292px;
  border-radius: 5px;
  padding: 5px;
`;

const EditDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  color: gray;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const InfoComment = styled.div`
  padding: 105px 0px 0px 160px;
  font-size: 12px;
  color: gray;
`;

const CommentsBox = styled.div`
  width: 440px;
  height: 270px;
  padding: 0px 10px 0px 30px;
  border-bottom: 1px solid #f1f1f1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: gray;
  }
`;

const Comment = styled.div`
  display: flex;
  width: 420px;
  height: auto;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 15px;
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

const NameGrade = styled.div`
  display: flex;
  height: 30px;
  margin-top: 13px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 30px;
  border: none;
  font-size: 15px;
`;

const UserGrade = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 30px;
  color: gray;
  font-size: 12px;
`;

const UserComment = styled.div`
  box-sizing: border-box;
  width: 280px;
  height: auto;
  border: none;
  font-size: 15px;
  resize: none;
  overflow-y: auto;
`;

export default CommentList;
