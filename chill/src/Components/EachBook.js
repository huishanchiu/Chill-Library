import React from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import styled from "styled-components";
import EachReview from "./EachReview";
import { useState, useEffect } from "react";
import NewReview from "./NewReview";
import firebase from "../utils/firebase";
import { useParams } from "react-router-dom";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

const BookCollection = styled(BsBookmarkFill)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: tomato;
`;
const BookUnCollection = styled(BsBookmark)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: tomato;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-image: linear-gradient(to right, #2c213b, #4f3a6c);
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
  align-items: center;
  justify-content: center;
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
const ReviewTag = styled.div`
  display: flex;
  flex-direction: column;
`;

function Book() {
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [book, setBook] = useState({});
  const db = firebase.firestore();
  let bookid = useParams();
  function linkToBorrow() {
    window.open(
      `https://webpac.tphcc.gov.tw/webpac/search.cfm?m=ss&k0=${bookInfo.ISBN}&t0=k&c0=and`,
      "新北市立圖書館"
    );
  }
  useEffect(() => {
    const bookRef = db.collection("books").doc(bookid.id);
    console.log(bookid);
    bookRef.get().then((doc) => {
      setBookInfo({
        title: doc.data().title,
        authors: doc.data().authors,
        publisher: doc.data().publisher,
        publishedDate: doc.data().publishedDate,
        categories: doc.data().categories,
        image: doc.data().image,
        description: doc.data().description,
        ISBN: doc.data().ISBN,
      });
    });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .doc(bookid.id)
      .onSnapshot((docSnapshot) => {
        setBook(docSnapshot.data());
      });
  }, []);
  function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;
    if (isCollect) {
      firebase
        .firestore()
        .collection("books")
        .doc(bookid.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection("books")
        .doc(bookid.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  }

  const isCollect = book.collectedBy?.includes(firebase.auth().currentUser.uid);

  return (
    <Div>
      <SideMenu />
      <Content>
        <BookTag>
          <BookImg src={bookInfo.image} alt="" />
          <BookContent>
            <BookTitle>{bookInfo.title}</BookTitle>
            <BookDetail>
              <BookInfo>作者：{bookInfo.authors}</BookInfo>
              <BookInfo>出版社：{bookInfo.publisher}</BookInfo>
              <BookInfo>出版日期：{bookInfo.publishedDate}</BookInfo>
              <BookInfo>去憂分類：{bookInfo.categories}</BookInfo>
              <Btn onClick={linkToBorrow}>圖書館借閱</Btn>
            </BookDetail>
            <div onClick={toggleCollected}>
              {isCollect ? <BookCollection /> : <BookUnCollection />}
            </div>
          </BookContent>
          <BookSummary>{bookInfo.description}</BookSummary>
          <ReviewTag>
            <EachReview />
            <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
          </ReviewTag>
        </BookTag>
        {open && <NewReview close={setOpen} />}
      </Content>
      <Header />
    </Div>
  );
}

export default Book;
