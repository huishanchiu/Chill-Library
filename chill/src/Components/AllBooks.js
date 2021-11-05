import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";

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

function AllBooks({ theme }) {
  const [bookList, setBookList] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `${theme}`)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList(list);
      });
  }, []);
  console.log(bookList);
  return (
    <div>
      <AllBook>
        {bookList.map((item) => {
          let des = item.description.slice(0, 200);
          item.description = des + "......";

          return (
            <BookTag key={item.title} to={`/book/${item.title}`}>
              <BookImg
                src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                alt=""
              />
              <BookContent>
                <BookName>{item.title}</BookName>
                <BookSummary>{item.description}</BookSummary>
              </BookContent>
            </BookTag>
          );
        })}
      </AllBook>
    </div>
  );
}

export default AllBooks;
