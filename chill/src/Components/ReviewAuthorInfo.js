import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";

const Star = ({ starId, marked }) => {
  return (
    <span star-id={starId} style={{ color: "#ff9933" }}>
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

const ReviewAuthorLink = styled(Link)`
  text-decoration: none;
  color: rgba(254, 240, 221, 0.8);
  display: flex;
  align-items: center;
`;

const ReviewAuthor = styled.div`
  outline: red solid;
  align-items: center;
  color: rgba(254, 240, 221, 0.8);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: flex-start;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Rate = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
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
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

function ReviewAuthorInfo({ review }) {
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", review.author.uid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return { ...docSnapshot.data() };
        });
        setAuthor(data[0]);
      });
  }, [review.author.uid]);

  return (
    <ReviewAuthor key={review.id}>
      <ReviewAuthorLink to={`/mybooks/${review.author.uid}/collection`}>
        <ReviewAuthorImg src={author?.URL} alt="" />
        {author?.userName}
      </ReviewAuthorLink>
      <RateQuote>
        <Quote>{review.quote}</Quote>
        <Rate>
          去憂指數：
          {Array.from({ length: 5 }, (v, i) => (
            <Star marked={review.rating > i} />
          ))}
        </Rate>
      </RateQuote>
    </ReviewAuthor>
  );
}

export default ReviewAuthorInfo;
