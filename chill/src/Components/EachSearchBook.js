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
  width: 10px;
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

function EachSearchBook() {
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState([]);
  const search = useParams();
  function linkToBorrow() {
    window.open(
      `https://webpac.tphcc.gov.tw/webpac/search.cfm?m=ss&k0=${search.id}&t0=k&c0=and`,
      "新視窗的名稱"
    );
  }
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${search.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas.items);
        setBookInfo(datas.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search.id]);
  console.log(bookInfo);

  function addToFirebase(bookInfo) {
    const documentRef = firebase
      .firestore()
      .collection("books")
      .doc(bookInfo.volumeInfo.title);
    documentRef.set({
      title: bookInfo.volumeInfo.title,
      subtitle: bookInfo.volumeInfo.subtitle,
      authors: bookInfo.volumeInfo.authors,
      publisher: bookInfo.volumeInfo.publisher,
      publishedDate: bookInfo.volumeInfo.publishedDate,
      ISBN: bookInfo.volumeInfo.industryIdentifiers[0].identifier,
      description: bookInfo.volumeInfo.description,
      image: bookInfo.volumeInfo.imageLinks.smallThumbnail,
    });
  }

  // function onSubmit(bookInfo) {
  //   const documentRef = firebase.firestore().collection("reviews").doc();
  //   documentRef
  //     .set({
  //       title: bookInfo.volumeInfo.title,
  //     })
  //     .then(() => {
  //       // history.push(`/book/${bookid.id}`);
  //     });

  // }

  // function toggleCollected() {
  //   const uid = firebase.auth().currentUser.uid;
  //   if (isCollect) {
  //     firebase
  //       .firestore()
  //       .collection("books")
  //       .doc(bookid.id)
  //       .update({
  //         collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
  //       });
  //   } else {
  //     firebase
  //       .firestore()
  //       .collection("books")
  //       .doc(bookid.id)
  //       .update({
  //         collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
  //       });
  //   }
  // }
  // const isCollect = books.collectedBy?.includes(
  //   firebase.auth().currentUser.uid
  // );

  return (
    // <div>12</div>

    <Div>
      <SideMenu />
      {bookInfo.map((bookInfo) => {
        return (
          <Content>
            <BookTag>
              <BookImg
                src={
                  bookInfo.volumeInfo.imageLinks
                    ? bookInfo.volumeInfo.imageLinks.smallThumbnail
                    : "https://i.pinimg.com/564x/8d/98/54/8d9854ecfd84f4daa1561c7b62c6387f.jpg"
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
                  <BookInfo>
                    去憂分類：{bookInfo.volumeInfo.categories}
                  </BookInfo>
                </BookDetail>
                <Btn onClick={linkToBorrow}>圖書館借閱</Btn>
                <BookUnCollection
                  onClick={() => {
                    addToFirebase(bookInfo);
                  }}
                />
              </BookContent>
              <BookSummary>{bookInfo.volumeInfo.description}</BookSummary>
              <ReviewTag>
                <EachReview />
                <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
              </ReviewTag>
            </BookTag>
            {open && <NewReview close={setOpen} />}
          </Content>
        );
      })}
      );
      <Header />
    </Div>
  );
}

export default EachSearchBook;
