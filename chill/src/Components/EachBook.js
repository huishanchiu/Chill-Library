import React from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import ThemeHeader from "./ThemesHeader";
import styled from "styled-components";
import EachReview from "./EachReview";
import { useState, useEffect } from "react";
import NewReview from "./NewReview";
import firebase from "../utils/firebase";
import { useParams } from "react-router-dom";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoIosPricetags } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsEyeglasses } from "react-icons/bs";
import { HiOutlineLibrary } from "react-icons/hi";
import SlideReviews from "./SlideReviews";
import SlideBooks from "./SlideBooks";

const PlaceIcon = styled(HiOutlineLibrary)`
  width: 20px;
  height: 100%;
`;

const ReadIcon = styled(BsEyeglasses)`
  width: 20px;
  height: 100%;
`;
const Tag = styled(HiOutlineHashtag)`
  color: #484141;
`;
const CategoriesIcon = styled(IoIosPricetags)`
  color: #f3e5d3;
  width: 20px;
  height: 100%;
`;

const BookCollection = styled(BsBookmarkFill)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;
const BookUnCollection = styled(BsBookmark)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;
const Div = styled.div`
  width: 800px;
  max-width: 1920px;
  /* display: flex; */
  /* justify-content: space-between; */
  color: white;
`;
const Content = styled.div`
  /* width: 140vmin; */
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* width: 800px; */
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
  margin-top: 20px;
`;
const BookInfoUp = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 30px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
`;
const BookContent = styled.div`
  width: 40vmin;
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;
const BookImg = styled.img`
  margin-right: 20px;
  height: 300px;
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
`;
const BookTitle = styled.div`
  padding-bottom: 15px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 240, 221, 1);
`;
const BookSummary = styled.div`
  /* white-space: pre-line; */
  word-wrap: break-word;
  color: rgba(255, 240, 221, 1);
  margin: 15px;
`;
const BookDetail = styled.div`
  color: grey;
`;
const BookInfo = styled.div`
  font-size: 16px;
  flex-wrap: 500;
  color: rgba(255, 240, 221, 0.8);
  margin-top: 10px;
`;

const BookCategories = styled(BookInfo)`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 0;
  font-weight: 500;
  width: 100px;
  height: 30px;
  border-radius: 10px;
  padding: 0.3rem 0.6rem;
  color: #feae29;
  border: rgb(254, 239, 222) 1px solid;
  background-color: rgba(15, 101, 98, 0.6);
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.9);
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
  cursor: pointer;
`;
const ReviewTag = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Categories = styled.div`
  background-color: rgba(255, 240, 221, 0.8);
  width: 170px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #484141;
`;
const BtnTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function Book() {
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [book, setBook] = useState({});
  const db = firebase.firestore();
  let bookid = useParams();

  function linkToRead() {
    window.open(
      `https://play.google.com/books/reader?id=${bookInfo.id}&pg=GBS.PP1&hl=zh_TW`,
      "試閱"
    );
  }
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
        id: doc.data().id,
        subtitle: doc.data().subtitle,
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
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("collectedBooks")
      .doc(bookInfo.title)
      .set(
        {
          title: bookInfo.title || "",
          authors: bookInfo.authors || "",
        },
        { merge: true }
      );

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

  const isCollect = firebase.auth().currentUser
    ? book.collectedBy?.includes(firebase.auth().currentUser.uid)
    : "";
  console.log(bookInfo);
  return (
    <>
      {firebase.auth().currentUser ? (
        <Div>
          {/* <ThemeHeader /> */}
          <Content>
            <BookTag>
              <BookInfoUp>
                <BookImg
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${bookInfo.id}?fife=w400-h600`}
                  alt=""
                />
                <BookContent>
                  <BookTitle>{bookInfo.title}</BookTitle>
                  <BookDetail>
                    <BookInfo>作者：{bookInfo.authors}</BookInfo>
                    <BookInfo>出版社：{bookInfo.publisher}</BookInfo>
                    <BookInfo>出版日期：{bookInfo.publishedDate}</BookInfo>
                    <BookInfo>
                      <BookCategories>
                        <CategoriesIcon />
                        去憂分類:
                      </BookCategories>
                    </BookInfo>

                    {bookInfo.categories
                      ? bookInfo.categories.map((category) => {
                          return (
                            <Categories>
                              <Tag />
                              {category}
                            </Categories>
                          );
                        })
                      : ""}
                  </BookDetail>
                </BookContent>
                <BtnTag>
                  <Btn onClick={linkToBorrow}>
                    <PlaceIcon /> 圖書館借閱
                  </Btn>
                  <Btn onClick={linkToRead}>
                    <ReadIcon />
                    試閱
                  </Btn>
                  <Btn onClick={toggleCollected}>
                    {isCollect ? <BookCollection /> : <BookUnCollection />}
                    收藏
                  </Btn>
                </BtnTag>
              </BookInfoUp>
              <div>
                <BookInfo> 其他熱門話題</BookInfo>
                <SlideBooks />
              </div>
              <BookSummary>{bookInfo.description}</BookSummary>
              <ReviewTag>
                <EachReview />
                <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
              </ReviewTag>
            </BookTag>
            {open && <NewReview close={setOpen} />}
          </Content>
        </Div>
      ) : (
        <>
          <Div>
            <Content>
              <BookTag>
                <BookInfoUp>
                  <BookImg
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${bookInfo.id}?fife=w400-h600`}
                    alt=""
                  />
                  <BookContent>
                    <BookTitle>{bookInfo.title}</BookTitle>
                    <BookDetail>
                      <BookInfo>作者：{bookInfo.authors}</BookInfo>
                      <BookInfo>出版社：{bookInfo.publisher}</BookInfo>
                      <BookInfo>出版日期：{bookInfo.publishedDate}</BookInfo>
                      <BookCategories>
                        <CategoriesIcon />
                        去憂分類:
                      </BookCategories>
                      {bookInfo.categories
                        ? bookInfo.categories.map((category) => {
                            return (
                              <Categories>
                                <Tag />
                                {category}
                              </Categories>
                            );
                          })
                        : ""}
                    </BookDetail>
                  </BookContent>
                  <BtnTag>
                    <Btn onClick={linkToBorrow}>
                      <PlaceIcon /> 圖書館借閱
                    </Btn>
                    <Btn onClick={linkToRead}>
                      <ReadIcon />
                      試閱
                    </Btn>
                  </BtnTag>
                </BookInfoUp>
                其他人在討論......
                <BookSummary>{bookInfo.description}</BookSummary>
                <ReviewTag>
                  <EachReview />
                  <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
                </ReviewTag>
              </BookTag>
              {open && <NewReview close={setOpen} />}
            </Content>
          </Div>
        </>
      )}
    </>
  );
}

export default Book;
