import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Link } from "react-router-dom";

const Div = styled.div`
  /* display: flex; */
  background-color: #e5e5e3;
`;
const QuoteTag = styled.h3`
  margin: 10px;
  padding: 10px;
  background-color: #414141;
`;
const BookName = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-top: 0;
`;

function Quote() {
  const [quotes, setQuotes] = useState([]);
  const db = firebase.firestore();
  console.log(firebase.auth().currentUser.uid);
  useEffect(() => {
    db.collection("reviews")
      .where("author.uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((collectionSnapshot) => {
        const list = [];
        collectionSnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setQuotes(list);
      });
  }, []);
  console.log(quotes);
  return (
    <Div>
      {quotes.map((review) => {
        return (
          <div>
            <QuoteTag>
              {review.quote}
              <br />-<BookName>{review.bookName}</BookName>
            </QuoteTag>
          </div>
        );
      })}
    </Div>
  );
}

export default Quote;
