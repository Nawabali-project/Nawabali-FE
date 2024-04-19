import { useState } from 'react';
import styled from 'styled-components';
import { addComment } from '@/api/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentInput = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  // 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: () => addComment(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scrollComments'] });
      alert('성공');
      setNewComment('');
    },
    onError: (error: any) => {
      if (error.response.status === 500) {
        alert('댓글작성은 로그인 후 이용 가능합니다 :)');
      }
    },
  });

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter' && newComment.trim()) {
      createCommentMutation.mutate();
    }
  };

  return (
    <>
      <MyCommentBox>
        <MyProfile></MyProfile>
        <MyCommentInput
          placeholder="댓글 달기"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          onKeyDown={handleKeyDown}
        ></MyCommentInput>
      </MyCommentBox>
    </>
  );
};

const MyCommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const MyProfile = styled.div`
  width: 13px;
  height: 13px;
  background-color: #f1f1f1;
  padding: 20px;
  margin: 0px 10px;
  border: none;
  border-radius: 100px;
`;

const MyCommentInput = styled.input`
  width: 280px;
  height: 20px;
  padding: 12px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 60px;
`;

export default CommentInput;
