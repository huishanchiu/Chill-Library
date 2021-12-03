import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { getAuthorInfo } from "../../utils/firebaseFunction";

const AuthorDiv = styled.div`
  display: flex;
  align-items: center;
`;
const CommentAuthorPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const CommentAuthorName = styled.div`
  white-space: nowrap;
  margin-left: 10px;
`;

function CommentAuthorInfo({ comment }) {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    getAuthorInfo(comment.author.uid, setAuthor);
  }, [comment.author.uid]);
  console.log(author);
  return (
    <AuthorDiv>
      <CommentAuthorPhoto src={author.URL} alt="" />
      <CommentAuthorName>{author.userName || "使用者"}</CommentAuthorName>
    </AuthorDiv>
  );
}

export default CommentAuthorInfo;
