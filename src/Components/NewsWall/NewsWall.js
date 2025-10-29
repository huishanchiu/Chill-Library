import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllReviews } from "../../utils/firebaseFunction";
import EachReview from "../EachBook/EachReview";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 875px) {
    width: 100%;
  }
`;

const NewsWall = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getAllReviews(setNews);
  }, []);

  return (
    <Div>
      {news.map((review) => {
        return <EachReview key={review.id} bookName={review.bookName} />;
      })}
    </Div>
  );
};

export default NewsWall;
