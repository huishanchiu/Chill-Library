import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import firebase from "../../utils/firebase";
import { Link } from "react-router-dom";

const BookCollection = styled(BsBookmarkFill)`
  width: 10px;
  color: tomato;
`;
const BookUnCollection = styled(BsBookmark)`
  width: 20px;
  height: 100%;
  color: tomato;
`;

const AllBook = styled.div``;
const BookTag = styled(Link)`
  padding: 20px;
  text-decoration: none;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  background-color: #fbe192;
  margin-top: 20px;
  height: 200px;
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookImg = styled.img`
  outline: grey solid 1px;
  height: 150px;
  width: 100px;
`;
const BookName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
`;

function Collection() {
  const [bookList, setBookList] = useState([]);
  const db = firebase.firestore();
  console.log(firebase.auth().currentUser.uid);
  useEffect(() => {
    db.collection("books")
      .where("collectedBy", "array-contains", firebase.auth().currentUser.uid)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setBookList(data);
      });
  }, []);
  console.log(bookList);
  return (
    <AllBook>
      {bookList.map((item) => {
        let des = item.description.slice(0, 200);
        item.description = des + "......";

        return (
          <BookTag key={item.title} to={`/book/${item.title}`}>
            <BookImg src={item.image} alt="" />
            <BookContent>
              <BookName>{item.title}</BookName>
              <BookSummary>{item.description}</BookSummary>
            </BookContent>
          </BookTag>
        );
      })}
    </AllBook>
  );
}

export default Collection;
