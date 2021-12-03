import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useSelector } from "react-redux";
import EachReview from "./EachReview";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { BsBookmarkFill, BsBookmark, BsEyeglasses } from "react-icons/bs";
import { IoIosPricetags } from "react-icons/io";
import { HiOutlineHashtag, HiOutlineLibrary } from "react-icons/hi";
import SlideBooks from "./SlideBooks";
import Loading from "../common/Loading";
import UserCategory from "./UserCategory";
import hand from "../../images/Hands.png";
import parse from "html-react-parser";
import NewReview from "./NewReview";
import {
  getBookInfo,
  removeCollectedBook,
  addCollectedBook,
  setUserCollectedBooks,
  addNewBookToDB,
} from "../../utils/firebaseFunction";
import { getBookDescription, getEachBook } from "../../utils/api";
import {
  collectAlert,
  linkToRead,
  linkToBorrow,
  defaltBookImgSrc,
  bookImgSrc,
  alert,
} from "../../utils/utils";
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
const BtnTagIcon = styled(IoIosPricetags)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
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
const Btn = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 0;
  font-weight: 500;
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
const Category = styled.div`
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
  cursor: pointer;
`;
const BtnTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: auto;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;
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
    getEachBook(isbn)
      .then((datas) => {
        setBookInfo(datas.items[0]);
        setBookTitle(datas.items[0].volumeInfo.title);
        setIsLoading(false);
      })
      .catch((error) => {
        return error;
      });
  }, []);
  useEffect(() => {
    bookTitle && getBookInfo(bookTitle, setBook);
    getBookDescription(bookInfo.id, setBookDescription);
  }, [bookTitle, bookInfo.id]);
  console.log(book);
  function addToFirebase(bookInfo) {
    addNewBookToDB(bookInfo);
    setUserCollectedBooks(currentUser.uid, bookInfo.volumeInfo.title);
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
      // Swal.fire({
      //   text: "成功移除收藏，我們等你回來～",
      //   confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      // });
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
      {isLoading ? <Loading /> : ""}
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
                <BookDetail>
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
                  {book?.categories
                    ? book.categories.map((category) => {
                        return (
                          <Category key={category}>
                            <Tag />
                            {category}
                          </Category>
                        );
                      })
                    : ""}
                </BookDetail>
              </BookContent>
              <BtnTag>
                <Btn onClick={() => linkToBorrow(isbn)}>
                  <PlaceIcon /> 借閱
                </Btn>
                <Btn onClick={() => linkToRead(bookInfo.id)}>
                  <ReadIcon />
                  試閱
                </Btn>
                {currentUser ? (
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
                ) : (
                  ""
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
              {currentUser ? (
                <Btn
                  onClick={() => {
                    collectAlert(isCollect, setOpen, "請先收藏此書！");
                  }}
                >
                  發表一篇去憂
                </Btn>
              ) : (
                ""
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
