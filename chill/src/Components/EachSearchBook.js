import React from "react";

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
  background-image: #2c213b;
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
const Category = styled.div`
  background-color: white;
  width: 130px;
  margin: 10px;
  cursor: pointer;
`;

function EachSearchBook() {
  const [checkBook, setCheckBook] = useState();
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [book, setBook] = useState({});
  const [bookTitle, setBookTitle] = useState("");
  // const [categories, setCategories] = useState([]);
  const search = useParams();
  function linkToRead() {
    window.open(
      `https://play.google.com/books/reader?id=${bookInfo.id}&pg=GBS.PP1&hl=zh_TW`,
      "試閱"
    );
  }
  function linkToBorrow() {
    window.open(
      `https://webpac.tphcc.gov.tw/webpac/search.cfm?m=ss&k0=${search.id}&t0=k&c0=and`,
      "新北市立圖書館"
    );
  }
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${search.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        setBookInfo(datas.items[0]);
        setBookTitle(datas.items[0].volumeInfo.title);
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle]);

  function addToFirebase(bookInfo) {
    // alert("先幫這本書選個去憂分類吧！");
    const documentRef = firebase
      .firestore()
      .collection("books")
      .doc(bookInfo.volumeInfo.title);
    documentRef.set(
      {
        title: bookInfo.volumeInfo.title || "",
        subtitle: bookInfo.volumeInfo.subtitle || "",
        authors: bookInfo.volumeInfo.authors || "",
        publisher: bookInfo.volumeInfo.publisher || "",
        publishedDate: bookInfo.volumeInfo.publishedDate || "",
        ISBN: bookInfo.volumeInfo.industryIdentifiers[0].identifier || "",
        description: bookInfo.volumeInfo.description || "",
        image: bookInfo.volumeInfo.imageLinks.smallThumbnail || "",
        id: bookInfo.id || "",
      },
      { merge: true }
    );

    if (
      firebase.firestore().collection("books").doc(bookInfo.volumeInfo.title)
    ) {
      toggleCollected(bookInfo.volumeInfo.title);
    }
  }

  console.log(bookTitle);
  useEffect(() => {
    bookTitle &&
      firebase
        .firestore()
        .collection("books")
        .doc(bookTitle)
        .onSnapshot((docSnapshot) => {
          console.log(docSnapshot.data());
          setBook(docSnapshot.data());
        });
  }, [bookTitle]);
  console.log(bookTitle);
  useEffect(() => {
    firebase
      .firestore()
      .collection("books")
      .where("title", "==", bookTitle)
      .onSnapshot((collectionSnapshot) => {
        console.log(collectionSnapshot.docs);
        // setBook(data);
        setCheckBook(true);
      });
  }, []);

  function toggleCollected(bookInfo) {
    const uid = firebase.auth().currentUser.uid;
    if (isCollect) {
      firebase
        .firestore()
        .collection("books")
        .doc(bookInfo)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection("books")
        .doc(bookInfo)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  }
  console.log(Object.keys(book).length);
  console.log(book);

  const isCollect =
    Object.keys(book).length > 0
      ? book.collectedBy?.includes(firebase.auth().currentUser.uid)
      : "";
  console.log(isCollect);

  function toggleAddCategory(e) {
    const isCategory =
      Object.keys(book).length > 0
        ? book.categories?.includes(e.target.textContent)
        : "";

    console.log(book.categories);
    console.log(isCategory);
    if (isCategory) {
      firebase
        .firestore()
        .collection("books")
        .doc(bookTitle)
        .update({
          categories: firebase.firestore.FieldValue.arrayRemove(
            `${e.target.textContent}`
          ),
        });
    } else {
      firebase
        .firestore()
        .collection("books")
        .doc(bookTitle)
        .update({
          categories: firebase.firestore.FieldValue.arrayUnion(
            `${e.target.textContent}`
          ),
        });
    }
  }
  console.log(book);
  return (
    <Div>
      {Object.keys(bookInfo).length > 0 ? (
        <Content>
          <BookTag>
            <BookImg
              src={
                `https://books.google.com/books/publisher/content/images/frontcover/${bookInfo.id}?fife=w400-h600` ||
                "https://i.pinimg.com/564x/8d/98/54/8d9854ecfd84f4daa1561c7b62c6387f.jpg"
              }
              alt=""
            />
            <BookContent>
              <BookTitle>{bookInfo.volumeInfo.title}</BookTitle>
              <BookDetail>
                <BookInfo>作者：{bookInfo.volumeInfo.authors}</BookInfo>
                <BookInfo>出版社：{bookInfo.volumeInfo.publisher}</BookInfo>
                <BookInfo>
                  出版日期：{bookInfo.volumeInfo.publishedDate}
                </BookInfo>
                <BookInfo>去憂分類：{book.categories}</BookInfo>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  宅在家好發慌？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  錢錢去哪了？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  一個人好孤單？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  想不出好點子？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  如何上火箭？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  心裡總是卡卡的？
                </Category>
              </BookDetail>
              <Btn onClick={linkToBorrow}>圖書館借閱</Btn>
              <Btn onClick={linkToRead}>試閱</Btn>

              <div
                onClick={() => {
                  addToFirebase(bookInfo);
                }}
              >
                {isCollect ? <BookCollection /> : <BookUnCollection />}
              </div>
            </BookContent>
            <BookSummary>{bookInfo.volumeInfo.description}</BookSummary>
            <ReviewTag>
              <EachReview />
              <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
            </ReviewTag>
          </BookTag>
          {open && <NewReview close={setOpen} />}
        </Content>
      ) : (
        ""
      )}
    </Div>
  );
}

export default EachSearchBook;
