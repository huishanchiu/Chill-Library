import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import ReviewAuthorInfo from "./ReviewAuthorInfo";
import { getReviewsWithBook } from "../../utils/firebaseFunction";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const ReviewTag = styled.div`
  color: rgba(255, 240, 221, 0.6);
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  padding: 15px;
  background-color: rgba(213, 219, 219, 0.1);
`;

const Question = styled.h3`
  color: rgba(255, 240, 221, 1);
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Hashtag = styled.h4`
  color: #f83b10;
  margin-right: 10px;
  padding: 3px 5px;
  background-color: rgba(254, 239, 222, 0.7);
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
`;
const ContentDiv = styled.div`
  font-size: 15px;
  color: rgba(255, 240, 221, 0.8);
  word-break: break-all;
`;

function EachReview({ bookName }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Taipei",
  };
  useEffect(() => {
    getReviewsWithBook(bookName, setReviews);
  }, [bookName]);

  return (
    <Div>
      {reviews.map((review) => {
        return (
          <ReviewTag key={review.id}>
            <ReviewAuthorInfo review={review} />
            <ContentDiv>{review.content}</ContentDiv>
            <Question>
              這本書幫我解決了
              <HashtagContainer>
                {review.hashtag1 && <Hashtag>#{review.hashtag1}</Hashtag>}
                {review.hashtag2 && <Hashtag>#{review.hashtag2}</Hashtag>}
                {review.hashtag3 && <Hashtag>#{review.hashtag3}</Hashtag>}
              </HashtagContainer>
              的問題!
            </Question>
            {new Date(review.createdAt.seconds * 1000).toLocaleString(
              "en-US",
              options
            )}
            {open && <Comment close={setOpen} review={review} />}
            {currentUser ? <Comments review={review} /> : ""}
          </ReviewTag>
        );
      })}
    </Div>
  );
}

export default EachReview;
