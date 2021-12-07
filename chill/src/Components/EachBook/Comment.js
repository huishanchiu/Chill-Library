import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../common/Loading";
import { submitComments } from "../../utils/firebaseFunction";
import { alert } from "../../utils/utils";

const Icon = styled.div`
  border-bottom: hsla(0, 0%, 0%, 0.2) 1px solid;
  width: 680px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Btn = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;
const Mask = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(211, 211, 211, 0.1);
  display: flex;
  align-items: center;
`;

const PopupInner = styled.div`
  height: 300px;
  z-index: 3;
  position: relative;
  padding: 15px 0;
  background-color: #f1faf7;
  border-radius: 1rem;
`;
const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
`;
const CommentTag = styled.div`
  position: relative;
`;
const CommentDiv = styled.textarea`
  font-size: 18px;
  ::placeholder {
    color: rgba(211, 211, 211, 0.8);
  }
  border: none;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  width: 100%;
  height: 300px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

function Comment({ review, close }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    setIsLoading(true);
    submitComments(review.id, setCommentContent, commentContent);
    setIsLoading(false);
    close(false);
    alert("送出留言");
  }

  return (
    <Mask>
      {isLoading ? <Loading /> : ""}
      <PopupInner>
        <Icon>
          <Btn onClick={onSubmit}>送出</Btn>
          <CloseIcon onClick={() => close(false)} />
        </Icon>
        <CommentTag>
          <CommentDiv
            placeholder="想說什麼呢？"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
        </CommentTag>
      </PopupInner>
    </Mask>
  );
}

export default Comment;
