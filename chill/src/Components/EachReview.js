import React, { useState } from "react";
import styled from "styled-components";
import { IoMdBeer } from "react-icons/io";
import { Link } from "react-router-dom";

const ReviewTag = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #abebc6;
  border-radius: 10px;
  color: grey;
  width: 650px;
`;
const ReviewAuthor = styled(Link)`
  color: #2c213b;
  text-decoration: none;
  display: flex;
  margin: 20px;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const Rate = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const Question = styled.h3`
  display: flex;
  align-items: center;
`;
const Hashtag = styled.h4`
  color: #f83b10;
`;
const Beer = styled.div`
  font-size: 16px;
`;
const BeerIcon = styled(IoMdBeer)`
  /* color: #fefa0c; */
  margin: 0 5px;
  width: 20px;
  height: 100%;
`;
function EachReview() {
  const [hashtags, setHashtags] = useState("#吃太快");
  const [BeerCount, setBeerCount] = useState("433");
  const [reviewAuthor, setReviewAuthor] = useState(
    "https://miro.medium.com/max/1400/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg"
  );
  const [reviewContent, setReviewContent] = useState(
    "ghjbkdjcnbndkdjncbfdkjcnbnd"
  );
  return (
    <ReviewTag>
      <ReviewAuthor>
        <ReviewAuthorImg src={reviewAuthor} alt="" />
        發表了一篇去憂
        <Rate>
          <BeerIcon />
          {BeerCount}
        </Rate>
      </ReviewAuthor>
      {reviewContent}
      <Question>
        這本書幫我解決了
        <Hashtag>{hashtags}</Hashtag>
        的問題!
      </Question>
      <Beer>
        <BeerIcon />
        覺得很讚，賞作者一杯啤酒!
      </Beer>
    </ReviewTag>
  );
}

export default EachReview;
