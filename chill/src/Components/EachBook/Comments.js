import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { BsFillChatTextFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toastGrey from "../../images/toast_grey.png";
import toastYellow from "../../images/toast_gold.png";
import Comment from "./Comment";
import CommentAuthorInfo from "./CommentAuthorInfo";
import { useSelector } from "react-redux";
import {
  addLikedReviews,
  deleteComment,
  getComments,
} from "../../utils/firebaseFunction";

const TextIcon = styled(BsFillChatTextFill)`
  cursor: pointer;
  position: absolute;
  color: #bdbcbc;
  width: 26px;
  height: 100%;
`;

const Beer = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  padding: 5px;
`;

const BeerIcon = styled.img`
  cursor: pointer;
  width: 35px;
  margin-left: 30px;
`;

const BeerYellow = styled.img`
  cursor: pointer;
  width: 35px;
  margin-left: 30px;
`;

const LikeCount = styled.div`
  color: orange;
  font-weight: 500;
  font-size: 13px;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  text-align: center;
`;

const LikeDiv = styled.div`
  position: relative;
  display: flex;
`;

const CloseIcon = styled(AiOutlineCloseCircle)`
  display: none;
  color: rgba(211, 211, 211, 0.8);
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 8px;
`;
const Close = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
`;

const CommentTag = styled.div`
  width: 100%;
  color: rgba(255, 240, 221, 0.6);
  padding-bottom: 20px;
  position: relative;
`;

const CommentCount = styled.div`
  cursor: pointer;
  width: 100%;
  color: rgba(255, 240, 221, 0.8);
  padding: 10px 0;
`;
const CommentContent = styled.div`
  padding: 20px 0;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  position: relative;
  &:hover :first-child {
    display: block;
  }
`;
const Text = styled.div`
  margin: 20px;
`;

function Comments({ review }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const toggleLiked = (reviewId) => {
    addLikedReviews(reviewId, currentUser.uid);
  };

  function toggleRemove(commentId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "確定要刪除留言嗎？",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "再想想",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            text: "刪除成功",
          });
          deleteComment(review.id, commentId);
        }
      });
  }

  useEffect(() => {
    getComments(review.id, setComments);
  }, []);
  const isLiked = review.likedBy?.includes(currentUser?.uid);
  function showComment() {
    if (commentOpen) {
      setCommentOpen(false);
    } else {
      setCommentOpen(true);
    }
  }
  return (
    <>
      {currentUser && (
        <CommentTag>
          <LikeDiv>
            <TextIcon onClick={() => setOpen(true)} />
            <Beer>
              {isLiked ? (
                <BeerYellow
                  onClick={(e) => toggleLiked(review.id, isLiked)}
                  src={toastYellow}
                />
              ) : (
                <BeerIcon
                  onClick={(e) => toggleLiked(review.id, isLiked)}
                  src={toastGrey}
                />
              )}
              {review.likedCount >= 1 && (
                <LikeCount>{review.likedCount && review.likedCount}</LikeCount>
              )}
            </Beer>
          </LikeDiv>
          <CommentCount onClick={showComment}>
            共{comments.length || 0}則留言
          </CommentCount>
          {open && <Comment review={review} close={setOpen} />}
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                {commentOpen && (
                  <CommentContent>
                    {comment.author.uid === currentUser.uid ? (
                      <Close>
                        <CloseIcon onClick={(e) => toggleRemove(comment.id)} />
                      </Close>
                    ) : (
                      <Close />
                    )}
                    <CommentAuthorInfo comment={comment} />
                    <Text>{comment.content}</Text>
                    {comment.createdAt.toDate().toLocaleString()}
                  </CommentContent>
                )}
              </div>
            );
          })}
        </CommentTag>
      )}
    </>
  );
}

export default Comments;
