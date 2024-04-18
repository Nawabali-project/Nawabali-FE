import { useState } from 'react';
import styled from 'styled-components';
import { addComment } from '@/api/comment';

const CommentInput = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState('');

  const handleKeyDown = async (event: any) => {
    if (event.key === 'Enter' && newComment.trim()) {
      try {
        await addComment(postId, newComment);
        setNewComment('');
        alert('댓글 등록 성공 :)');
      } catch (error) {
        console.error('댓글 등록 실패:', error);
        alert('댓글 등록 실패...');
      }
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
