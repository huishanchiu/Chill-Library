import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EachReview from "./EachReview";
import NewReview from "./NewReview";
import SlideBooks from "./SlideBooks";
import Loading from "../common/Loading";
import hand from "../../images/Hands.png";
import parse from "html-react-parser";
import { getBookDescription } from "../../utils/api";
import UserCategory from "./UserCategory";
import {
  getBookInfo,
  setUserCollectedBooks,
  removeCollectedBook,
  addCollectedBook,
} from "../../utils/firebaseFunction";

import {
  collectAlert,
  linkToRead,
  linkToBorrow,
  bookImgSrc,
  defaltBookImgSrc,
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

function Book() {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({});
  const [bookDescription, setBookDescription] = useState({});
  const { bookName } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const p1 = getBookInfo(bookName, setBook);
    const p2 = getBookDescription(book.id).then((data) => {
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
  }, [bookName, book.id]);

  function toggleCollected() {
    setUserCollectedBooks(currentUser.uid, book);
    if (isCollect) {
      removeCollectedBook(currentUser.uid, bookName);
      Swal.fire({
        text: "ๆๅ็งป้คๆถ่๏ผๆๅ็ญไฝ?ๅไพ๏ฝ",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    } else {
      addCollectedBook(currentUser.uid, bookName);
      Swal.fire({
        title: "ๆถ่ๆๅ",
        text: "ๅฟซๅปไฝ?็ๆธๆซ็ง็ง้ๆฌๆธ",
        imageUrl: `${hand}`,
        imageWidth: 100,
        imageHeight: 200,
        imageAlt: "Collect image",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    }
  }
  const isCollect = currentUser && book.collectedBy?.includes(currentUser.uid);
  console.log(book);
  return (
    <Div>
      <Content>
        <BookTag>
          <BookInfoUp>
            <BookImg src={bookImgSrc(book.id) || defaltBookImgSrc()} alt="" />
            <BookContent>
              <BookTitle>{book.title}</BookTitle>
              <BookInfo>ไฝ่๏ผ{book.authors}</BookInfo>
              <BookInfo>ๅบ็็คพ๏ผ{book.publisher}</BookInfo>
              <BookInfo>ๅบ็ๆฅๆ๏ผ{book.publishedDate}</BookInfo>
              <BookInfo>
                <BookCategories>
                  <CategoriesIcon />
                  ๅปๆๅ้ก:
                </BookCategories>
              </BookInfo>
              {book.categories &&
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
              <Btn onClick={() => linkToBorrow(book.ISBN)}>
                <PlaceIcon /> ๅ้ฑ
              </Btn>
              <Btn
                onClick={() => {
                  linkToRead(book.id);
                }}
              >
                <ReadIcon />
                ่ฉฆ้ฑ
              </Btn>
              {currentUser && (
                <>
                  <Btn onClick={toggleCollected}>
                    {isCollect ? <BookCollection /> : <BookUnCollection />}
                    ๆถ่
                  </Btn>
                  {book?.categories?.length === 0 && (
                    <Btn
                      onClick={() =>
                        collectAlert(isCollect, setPopup, "่ซๅๆถ่ๆญคๆธ๏ผ")
                      }
                    >
                      <BtnTagIcon />
                      ๅ้ก
                    </Btn>
                  )}
                  {popup && <UserCategory setPopup={setPopup} book={book} />}
                </>
              )}
            </BtnTag>
          </BookInfoUp>
          <BookInfo> ๅถไป็ฑ้่ฉฑ้ก</BookInfo>
          <SlideBooks />
          <BookSummary>{parse(`<p>${bookDescription}</p>`)}</BookSummary>
          <ReviewTag>
            <EachReview bookName={bookName} />
            {currentUser && (
              <Btn onClick={() => setOpen(true)}>็ผ่กจไธ็ฏๅปๆ</Btn>
            )}
          </ReviewTag>
        </BookTag>
        {open && <NewReview close={setOpen} bookName={bookName} />}
      </Content>
      {isLoading && <Loading />}
    </Div>
  );
}

export default Book;
