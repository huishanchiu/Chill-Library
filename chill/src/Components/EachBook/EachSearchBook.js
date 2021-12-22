import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EachReview from "./EachReview";
import firebase from "../../utils/firebase";
import SlideBooks from "./SlideBooks";
import Loading from "../common/Loading";
import UserCategory from "./UserCategory";
import hand from "../../images/Hands.png";
import parse from "html-react-parser";
import NewReview from "./NewReview";
import { getBookDescription, getEachBook } from "../../utils/api";
import {
  getBookInfo,
  removeCollectedBook,
  addCollectedBook,
  setUserCollectedBooks,
  addNewBookToDB,
} from "../../utils/firebaseFunction";
import {
  collectAlert,
  linkToRead,
  linkToBorrow,
  defaltBookImgSrc,
  bookImgSrc,
  alert,
} from "../../utils/utils";

import {
  PlaceIcon,
  ReadIcon,
  Tag,
  CategoriesIcon,
  BookCollection,
  BookUnCollection,
  Content,
  BookTag,
  BookInfoUp,
  Div,
  BookContent,
  BookImg,
  BookTitle,
  BookSummary,
  BookInfo,
  BookCategories,
  BtnTag,
  Btn,
  ReviewTag,
  Categories,
  BtnTagIcon,
} from "./style";

function EachSearchBook() {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [book, setBook] = useState({});
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const { isbn } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const p1 = getEachBook(isbn).then((datas) => {
      setBookInfo(datas.items[0]);
      setBookTitle(datas.items[0].volumeInfo.title);
    });
    const p2 = getBookDescription(bookInfo.id).then((data) => {
      setBookDescription(data?.volumeInfo?.description);
    });
    const successGroup = Promise.all([p1, p2]);
    successGroup
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isbn, bookInfo.id]);

  useEffect(() => {
    bookTitle && getBookInfo(bookTitle, setBook);
    getBookDescription(bookInfo.id, setBookDescription);
  }, [bookTitle, bookInfo.id]);

  function addToFirebase(bookInfo) {
    addNewBookToDB(bookInfo);
    setUserCollectedBooks(currentUser.uid, bookInfo.volumeInfo);
    if (
      firebase.firestore().collection("books").doc(bookInfo.volumeInfo.title)
    ) {
      toggleCollected(bookInfo.volumeInfo.title);
    }
  }

  function toggleCollected(bookName) {
    if (isCollect) {
      removeCollectedBook(currentUser.uid, bookName);
      alert("成功移除收藏，我們等你回來～");
    } else {
      addCollectedBook(currentUser.uid, bookName);
      Swal.fire({
        title: "收藏成功",
        text: "可以為書新增標籤以及發表去憂囉",
        imageUrl: `${hand}`,
        imageWidth: 100,
        imageHeight: 200,
        imageAlt: "Collect image",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    }
  }
  const isCollect = currentUser
    ? book?.collectedBy?.includes(currentUser.uid) || ""
    : "";

  return (
    <Div>
      {isLoading && <Loading />}
      {Object.keys(bookInfo).length > 0 && (
        <Content>
          <BookTag>
            <BookInfoUp>
              <BookImg
                src={bookImgSrc(bookInfo.id) || defaltBookImgSrc()}
                alt=""
              />
              <BookContent>
                <BookTitle>{bookInfo.volumeInfo.title}</BookTitle>
                <BookInfo>作者：{bookInfo.volumeInfo.authors}</BookInfo>
                <BookInfo>出版社：{bookInfo.volumeInfo.publisher}</BookInfo>
                <BookInfo>
                  出版日期：{bookInfo.volumeInfo.publishedDate}
                </BookInfo>
                <BookInfo>
                  <BookCategories>
                    <CategoriesIcon />
                    去憂分類:
                  </BookCategories>
                </BookInfo>
                {book?.categories &&
                  book.categories.map((category) => {
                    return (
                      <Categories key={category}>
                        <Tag />
                        {category}
                      </Categories>
                    );
                  })}
              </BookContent>
              <BtnTag>
                <Btn onClick={() => linkToBorrow(isbn)}>
                  <PlaceIcon /> 借閱
                </Btn>
                <Btn onClick={() => linkToRead(bookInfo.id)}>
                  <ReadIcon />
                  試閱
                </Btn>
                {currentUser && (
                  <>
                    <Btn
                      onClick={() => {
                        addToFirebase(bookInfo);
                      }}
                    >
                      {isCollect ? <BookCollection /> : <BookUnCollection />}
                      收藏
                    </Btn>
                    {book?.categories === undefined ||
                    book?.categories.length === 0 ? (
                      <Btn
                        onClick={() =>
                          collectAlert(isCollect, setPopup, "請先收藏此書！")
                        }
                      >
                        <BtnTagIcon />
                        分類
                      </Btn>
                    ) : (
                      ""
                    )}
                    {popup && <UserCategory setPopup={setPopup} book={book} />}
                  </>
                )}
              </BtnTag>
            </BookInfoUp>
            <div>
              <BookInfo> 其他熱門話題</BookInfo>
              <SlideBooks />
            </div>
            <BookSummary>{parse(`<p>${bookDescription}</p>`)}</BookSummary>
            <ReviewTag>
              <EachReview bookName={bookInfo.volumeInfo.title} />
              {currentUser && (
                <Btn
                  onClick={() => {
                    collectAlert(isCollect, setOpen, "請先收藏此書！");
                  }}
                >
                  發表一篇去憂
                </Btn>
              )}
            </ReviewTag>
          </BookTag>
          {open && (
            <NewReview bookName={bookInfo.volumeInfo.title} close={setOpen} />
          )}
        </Content>
      )}
    </Div>
  );
}

export default EachSearchBook;
