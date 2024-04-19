import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteComment, getComments } from '@/api/comment';
import { useEffect } from 'react';

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }: any) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

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

  console.log('choi comment list', data);

  // 무한스크롤 옵저버
  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('Fire!');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['scrollComments'] });
      alert('댓글 삭제 성공 :)');
    },
    onError: () => {
      alert('댓글 삭제 실패 ㅠㅠ');
    },
  });

  const handleDeleteCommentClick = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

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
            <Comment ref={ref} key={post.postId}>
              <ProfileBox>
                <ProfileImg src={post.profileImageUrl} />
              </ProfileBox>
              <div>
                <NameGrade>
                  <UserName>{post.nickname}</UserName>
                  <UserGrade>• {post.userInfo}</UserGrade>
                  {post?.userId == localStorage.getItem('userId') ? (
                    <>
                      <EditDelete>수정</EditDelete>
                      <EditDelete
                        onClick={() => handleDeleteCommentClick(post.commentId)}
                      >
                        삭제
                      </EditDelete>
                    </>
                  ) : (
                    <></>
                  )}
                </NameGrade>
                <UserComment>{post.contents}</UserComment>
              </div>
            </Comment>
          )),
        )
      ) : (
        <InfoComment>첫 댓글을 남겨주세요 :)</InfoComment>
      )}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </CommentsBox>
  );
};

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
  padding: 100px 0px 0px 160px;
  font-size: 12px;
  color: gray;
`;

const CommentsBox = styled.div`
  width: 420px;
  height: 220px;
  padding: 0px 30px;
  border-bottom: 1px solid #f1f1f1;
  overflow-y: auto;
`;

const Comment = styled.div`
  display: flex;
  width: 390px;
  height: 100px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
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
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 70px;
  border: none;
  font-size: 15px;
`;

const UserGrade = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  color: gray;
  font-size: 12px;
`;

const UserComment = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: none;
  font-size: 15px;
  resize: none;
`;

export default CommentList;
