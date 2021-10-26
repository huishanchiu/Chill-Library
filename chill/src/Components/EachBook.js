import React from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import styled from "styled-components";
import EachReview from "./EachReview";
import { useState, useEffect } from "react";
import NewReview from "./NewReview";
import firebase from "../utils/firebase";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #2c213b;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 650px;
  @media (max-width: 1200px) {
    max-width: 650px;
  }
  @media (max-width: 900px) {
  }
`;
const BookTag = styled.div`
  padding: 20px;
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  background-color: #fbe192;
  margin-top: 20px;
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: 20px;
`;
const BookImg = styled.img`
  height: 250px;
  width: 150px;
  box-shadow: 3px 3px 6px grey;
`;
const BookTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
  margin: 15px;
`;
const BookDetail = styled.div`
  color: grey;
`;
const BookInfo = styled.h4``;
const Btn = styled.div`
  margin: 15px auto;
  position: relative;
  text-decoration: none;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
  cursor: pointer;
`;

function Book() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const db = firebase.firestore();

  useEffect(() => {
    const bookRef = db.collection("books").doc("怎麼走");
    bookRef.get().then((doc) => {
      setBookInfo({
        title: doc.data().title,
        authors: doc.data().author,
        publisher: doc.data().publisher,
        publishedDate: doc.data().publishedDate,
        categories: doc.data().categories,
        image: doc.data().image,
        description: doc.data().description,
      });
    });
  }, []);

  db.collection("books")
    .where("categories", "array-contains", "宅在家好發慌？")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return (
    <Div>
      <SideMenu />
      <Content>
        <BookTag>
          <BookImg src={bookInfo.image} alt="" />
          <BookContent>
            <BookTitle>{bookInfo.title}</BookTitle>
            <BookDetail>
              <BookInfo>作者：{bookInfo.author}</BookInfo>
              <BookInfo>出版社：{bookInfo.publisher}</BookInfo>
              <BookInfo>出版日期：{bookInfo.publishedDate}</BookInfo>
              <BookInfo>去憂分類：{bookInfo.categories}</BookInfo>
            </BookDetail>
          </BookContent>
          <BookSummary>{bookInfo.description}</BookSummary>
          <EachReview />
          <Btn onClick={() => setButtonPopup(true)}>發表一篇去憂</Btn>
        </BookTag>
        <NewReview
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
        ></NewReview>
      </Content>
      <Header />
    </Div>
  );
}

export default Book;
