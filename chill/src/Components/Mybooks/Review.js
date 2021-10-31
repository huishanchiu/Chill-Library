import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Link } from "react-router-dom";

const AllBook = styled.div`
  /* outline: red solid; */
`;

const ReviewTag = styled.div`
  border-radius: 10px 20px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-decoration: none;
  color: grey;
  background-color: #fbe192;
  margin: 20px 0;
`;

const Quote = styled.h3`
  color: tomato;
  margin-bottom: 5px;
`;
const BookName = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-top: 0;
`;
const Hashtag = styled.div`
  /* background-color: #1abea7;
  color:; */
  margin-left: 10px;
  padding: 0.6%;
  background: #f7e8dc center/contain no-repeat;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
  -webkit-animation: animate-face 0.5s steps(2, end) infinite;
  animation: animate-face 0.5s steps(2, end) infinite;
`;
const ReviewTime = styled.h4`
  color: gray;
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
`;

function Review() {
  const [reviews, setReviews] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("reviews")
      .where("author.uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setReviews(data);
      });
  }, []);

  console.log(reviews);
  return (
    <AllBook>
      {reviews.map((review) => {
        return (
          <ReviewTag key={review.id}>
            <Quote>{review.quote}</Quote>
            <BookName>-{review.bookName}</BookName>
            {review.content}

            <HashtagContainer>
              {review.hashtag1 ? <Hashtag>#{review.hashtag1}</Hashtag> : ""}
              {review.hashtag2 ? <Hashtag>#{review.hashtag2}</Hashtag> : ""}
              {review.hashtag3 ? <Hashtag>#{review.hashtag3}</Hashtag> : ""}
            </HashtagContainer>
            <ReviewTime>
              {new Date(review.createdAt.seconds * 1000).toLocaleString()}
            </ReviewTime>
          </ReviewTag>
        );
      })}
    </AllBook>
  );
}

export default Review;
