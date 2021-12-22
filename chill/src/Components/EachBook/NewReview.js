import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import { getAuthorInfo, getBookInfo } from "../../utils/firebaseFunction";
import { addNewReview } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer" }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};
const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Mask = styled.div`
  z-index: 5;
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupInner = styled.div`
  z-index: 6;
  width: 50%;
  position: fixed;
  padding: 30px;
  background-color: #f1faf7;
  border-radius: 1rem;
  color: #0d6662;
`;
const Close = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const Btn = styled.div`
  margin: 20px auto;
  width: 80px;
  text-align: center;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;

const ReviewAuthor = styled.div`
  color: #2c213b;
  display: flex;
  margin: 10px;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const Question = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteInput = styled.input`
  margin: auto;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  outline: none;
  border: none;
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
`;
const ReviewContent = styled.textarea`
  margin: 20px auto;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  width: 100%;
  height: 200px;
  padding: 8px;
  border-radius: 10px;
  border: none;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
`;
const HashtagInput = styled.input`
  margin: 10px;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  outline: none;
  border: none;
  width: 40%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function NewReview({ close, bookName }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [selection, setSelection] = useState(0);
  const [rating, setRating] = useState(0);
  const [book, setBook] = useState({});
  const [quote, setQuote] = useState("");
  const [content, setContent] = useState("");
  const [hashtag1, setHashtag1] = useState("");
  const [hashtag2, setHashtag2] = useState("");
  const [hashtag3, setHashtag3] = useState("");
  const [author, setAuthor] = useState({});
  console.log(bookName);

  const commentData = {
    bookName: bookName,
    bookId: book.id,
    content,
    quote,
    hashtag1,
    hashtag2,
    hashtag3,
    rating,
    createdAt: firebase.firestore.Timestamp.now(),
    author: {
      displayName: author?.userName || "",
      photoURL: author?.URL || "",
      uid: author?.uid,
      email: author?.email,
    },
  };

  useEffect(() => {
    getAuthorInfo(currentUser.uid, setAuthor);
    getBookInfo(bookName, setBook);
  }, [bookName]);

  function onSubmit() {
    addNewReview(
      content,
      quote,
      hashtag1,
      hashtag2,
      hashtag3,
      commentData,
      currentUser.uid,
      close
    );
  }
  return (
    <>
      <Mask onClick={() => close(false)} />
      <PopupInner>
        <Close onClick={() => close(false)}>
          <CloseIcon />
        </Close>
        <ReviewAuthor>
          <ReviewAuthorImg src={author.URL} alt="" />
        </ReviewAuthor>
        <QuoteInput
          placeholder="寫下本書你最喜歡的一句Quote吧！"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <div
          onClick={(event) => setRating(event.target.getAttribute("star-id"))}
        >
          {Array.from({ length: 5 }, (v, i) => (
            <Star
              key={uuidv4()}
              starId={i + 1}
              marked={selection ? selection > i : rating > i}
            />
          ))}
        </div>
        <ReviewContent
          placeholder="寫下去憂內容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Question>
          這本書幫我解決了
          <HashtagInput
            placeholder="#Hashtag"
            value={hashtag1}
            onChange={(e) => setHashtag1(e.target.value)}
          />
          <HashtagInput
            placeholder="#Hashtag"
            value={hashtag2}
            onChange={(e) => setHashtag2(e.target.value)}
          />
          <HashtagInput
            placeholder="#Hashtag"
            value={hashtag3}
            onChange={(e) => setHashtag3(e.target.value)}
          />
        </Question>
        <Btn onClick={onSubmit}>送出</Btn>
      </PopupInner>
    </>
  );
}

export default NewReview;
