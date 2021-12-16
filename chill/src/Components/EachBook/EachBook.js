import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsBookmarkFill, BsBookmark, BsEyeglasses } from "react-icons/bs";
import { IoIosPricetags } from "react-icons/io";
import { HiOutlineHashtag, HiOutlineLibrary } from "react-icons/hi";
import EachReview from "./EachReview";
import NewReview from "./NewReview";
import SlideBooks from "./SlideBooks";
import Loading from "../common/Loading";
import hand from "../../images/Hands.png";
import parse from "html-react-parser";
import UserCategory from "./UserCategory";
import {
  getBookInfo,
  setUserCollectedBooks,
  removeCollectedBook,
  addCollectedBook,
} from "../../utils/firebaseFunction";
import { getBookDescription } from "../../utils/api";
import {
  collectAlert,
  linkToRead,
  linkToBorrow,
  bookImgSrc,
  defaltBookImgSrc,
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

const BookInfo = styled.div`
  margin-right: auto;
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
  cursor: pointer;
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
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
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
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.3);
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #484141;
`;
const BtnTagIcon = styled(IoIosPricetags)`
  cursor: pointer;
  width: 20px;
  height: 100%;
  color: #feae29;
`;

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
        text: "成功移除收藏，我們等你回來～",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    } else {
      addCollectedBook(currentUser.uid, bookName);
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
              <BookInfo>作者：{book.authors}</BookInfo>
              <BookInfo>出版社：{book.publisher}</BookInfo>
              <BookInfo>出版日期：{book.publishedDate}</BookInfo>
              <BookInfo>
                <BookCategories>
                  <CategoriesIcon />
                  去憂分類:
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
                <PlaceIcon /> 借閱
              </Btn>
              <Btn
                onClick={() => {
                  linkToRead(book.id);
                }}
              >
                <ReadIcon />
                試閱
              </Btn>
              {currentUser && (
                <>
                  <Btn onClick={toggleCollected}>
                    {isCollect ? <BookCollection /> : <BookUnCollection />}
                    收藏
                  </Btn>
                  {book?.categories?.length === 0 && (
                    <Btn
                      onClick={() =>
                        collectAlert(isCollect, setPopup, "請先收藏此書！")
                      }
                    >
                      <BtnTagIcon />
                      分類
                    </Btn>
                  )}
                  {popup && <UserCategory setPopup={setPopup} book={book} />}
                </>
              )}
            </BtnTag>
          </BookInfoUp>
          <BookInfo> 其他熱門話題</BookInfo>
          <SlideBooks />
          <BookSummary>{parse(`<p>${bookDescription}</p>`)}</BookSummary>
          <ReviewTag>
            <EachReview bookName={bookName} />
            {currentUser && (
              <Btn onClick={() => setOpen(true)}>發表一篇去憂</Btn>
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
