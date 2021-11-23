import React from "react";
import Swal from "sweetalert2";
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
import SlideBooks from "./SlideBooks";
import Loading from "./Loading";
import hand from "../images/Hands.png";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

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
  width: 50%;
  color: white;
  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 90%;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const BookTag = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const BookInfoUp = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  padding: 30px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BookContent = styled.div`
  width: 40vmin;
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;
const BookImg = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  height: 300px;
  @media (max-width: 600px) {
    width: 300px;
    height: 100%;
  }
`;
const BookTitle = styled.div`
  padding-bottom: 15px;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  font-size: 24px;
  font-weight: 900;
  color: rgba(255, 240, 221, 1);
`;
const BookSummary = styled.div`
  width: 100%;
  white-space: pre-line;
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
const BtnTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 0;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 10px;
  padding: 0.4rem 0.7rem;
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
  @media (max-width: 600px) {
    margin: 0 10px;
  }
`;
const ReviewTag = styled.div`
  width: 100%;
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

function Book() {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [book, setBook] = useState({});
  const [bookArr, setBookArr] = useState({});
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
    bookInfo.id &&
      fetch(`https://www.googleapis.com/books/v1/volumes/${bookInfo.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBookArr(data?.volumeInfo?.description);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [bookInfo.id]);

  useEffect(() => {
    setIsLoading(true);
    const bookRef = db.collection("books").doc(bookid.id);

    bookRef.onSnapshot((doc) => {
      setBookInfo({
        title: doc.data()?.title,
        authors: doc.data()?.authors,
        publisher: doc.data()?.publisher,
        publishedDate: doc.data()?.publishedDate,
        categories: doc.data()?.categories,
        image: doc.data()?.image,
        description: doc.data()?.description,
        ISBN: doc.data()?.ISBN,
        id: doc.data()?.id,
        subtitle: doc.data()?.subtitle,
      });
    });
    setIsLoading(false);
  }, [bookid.id]);

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
    // const uid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
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
          collectedBy: firebase.firestore.FieldValue.arrayRemove(
            currentUser.uid
          ),
        });
      Swal.fire({
        text: "成功移除收藏，我們等你回來～",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    } else {
      firebase
        .firestore()
        .collection("books")
        .doc(bookid.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(
            currentUser.uid
          ),
        });
      Swal.fire({
        title: "收藏成功",
        text: "快去你的書櫃瞧瞧這本書",
        imageUrl: `${hand}`,
        imageWidth: 100,
        imageHeight: 200,
        imageAlt: "Collect image",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    }
  }

  const isCollect = firebase.auth().currentUser
    ? book.collectedBy?.includes(firebase.auth().currentUser.uid)
    : "";
  // console.log(bookInfo.description?.replace(/ /g, "\n"));

  return (
    <>
      {firebase.auth().currentUser ? (
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
                    <PlaceIcon /> 借閱
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
              {/* <BookSummary>{bookInfo.description}</BookSummary> */}
              <BookSummary>{parse(`<p>${bookArr}</p>`)}</BookSummary>
              <ReviewTag>
                <EachReview />
                <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
              </ReviewTag>
            </BookTag>
            {open && <NewReview close={setOpen} />}
          </Content>
          {isLoading ? <Loading /> : ""}
        </Div>
      ) : (
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
                {/* <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn> */}
              </ReviewTag>
            </BookTag>
            {open && <NewReview close={setOpen} />}
          </Content>
          {isLoading ? <Loading /> : ""}
        </Div>
      )}
    </>
  );
}

export default Book;
