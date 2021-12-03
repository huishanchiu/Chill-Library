import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getOtherShelf } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { getEachAuthorData } from "../../utils/firebaseFunction";

const Star = ({ starId, marked }) => {
  return (
    <span star-id={starId} style={{ color: "#ff9933" }}>
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

const ReviewAuthor = styled.div`
  align-items: center;
  justify-content: center;
  color: rgba(254, 240, 221, 0.8);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: flex-start;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  &:hover {
    border-radius: 18px;
  }
`;
const Rate = styled.div`
  white-space: nowrap;
  display: flex;
  align-self: center;
  justify-self: center;
`;
const Quote = styled.h3`
  margin-left: 10px;
  color: tomato;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;
const RateQuote = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ReviewAuthorDiv = styled.div`
  cursor: pointer;
`;
const AuthorInfo = styled.div``;
const AuthorInfoTag = styled.div`
  display: flex;
  align-items: center;
`;

function ReviewAuthorInfo({ review }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    getEachAuthorData(review.author.uid, setAuthor);
  }, [review.author.uid]);

  return (
    <ReviewAuthor key={uuidv4()}>
      <ReviewAuthorDiv
        onClick={() => {
          getOtherShelf(review.author.uid, currentUser, "請先登入！");
        }}
      >
        <AuthorInfoTag>
          <AuthorInfo>
            <ReviewAuthorImg src={author?.URL} alt="" />
          </AuthorInfo>
          <AuthorInfo>{author?.userName}</AuthorInfo>
        </AuthorInfoTag>
      </ReviewAuthorDiv>
      <RateQuote>
        <Quote>{review.quote}</Quote>
        <Rate>
          去憂指數：
          {Array.from({ length: 5 }, (v, i) => (
            <Star marked={review.rating > i} key={uuidv4()} />
          ))}
        </Rate>
      </RateQuote>
    </ReviewAuthor>
  );
}

export default ReviewAuthorInfo;
