import React from "react";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../utils/firebase";
import { useHistory, useParams } from "react-router-dom";

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
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const PopupInner = styled.div`
  position: relative;
  padding: 30px;
  width: 700px;
  background-color: #f6e7db;
  border-radius: 1rem;
`;
const Close = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const Btn = styled.div`
  margin: 15px auto;
  width: 40px;
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

const ReviewAuthor = styled.div`
  color: #2c213b;
  display: flex;
  margin: 10px;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;

const Question = styled.h3`
  display: flex;
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
  width: 350px;
  height: 20px;
  padding: 8px;
  border-radius: 10px;
  /* box-shadow: 0px 3px 0 #1abea7; */
`;
const ReviewContent = styled.textarea`
  margin: 20px auto;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  outline: none;
  border: none;
  width: 350px;
  height: 200px;
  padding: 8px;
  border-radius: 10px;
`;
const HashtagInput = styled.input`
  margin: 0 10px;
  ::placeholder {
    color: #cdcdcd;
  }
  color: #3f403f;
  font-size: 16px;
  outline: none;
  border: none;
  width: 150px;
  height: 20px;
  padding: 8px;
  border-radius: 10px;
`;

function NewReviewOnSearch({ close }) {
  const [selection, setSelection] = useState(0);
  const [rating, setRating] = useState(0);
  // const [userId, setUserId] = useState("");

  const db = firebase.firestore();
  let bookid = useParams();
  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");

  const [authorName, setAuthorName] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState("");
  const [authoremail, setAuthoremail] = useState("");
  const [authorUid, setAuthorUid] = useState("");
  const [quote, setQuote] = useState("");
  const [content, setContent] = useState("");
  const [hashtag1, setHashtag1] = useState("");
  const [hashtag2, setHashtag2] = useState("");
  const [hashtag3, setHashtag3] = useState("");

  const userId = firebase.auth().currentUser.uid;
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookid.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas.items[0].id);
        setBookId(datas.items[0].id);
        setBookName(datas.items[0].volumeInfo.title);
        //   setBookTitle(datas.items[0].volumeInfo.title);
        //   setBook(datas.items[0]);
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((docSnapshot) => {
        console.log(docSnapshot.data());
        setAuthorPhoto(docSnapshot.data().URL);
        setAuthorName(docSnapshot.data().userName);
        setAuthoremail(docSnapshot.data().email);
        setAuthorUid(docSnapshot.data().uid);
      });
  }, []);

  function onSubmit() {
    const documentRef = firebase.firestore().collection("reviews").doc();
    console.log(documentRef);
    documentRef
      .set({
        bookName: bookName,
        id: bookId,
        content,
        quote,
        hashtag1,
        hashtag2,
        hashtag3,
        rating,
        createdAt: firebase.firestore.Timestamp.now(),
        author: {
          displayName: authorName || "",
          photoURL: authorPhoto || "",
          uid: authorUid,
          email: authoremail,
        },
      })
      .then(() => {
        // history.push(`/book/${bookid.id}`);
      });
    close(false);
  }
  return (
    <Mask>
      <PopupInner>
        <Close onClick={() => close(false)}>
          <CloseIcon />
        </Close>
        <ReviewAuthor>
          <ReviewAuthorImg src={authorPhoto} alt="" />
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
    </Mask>
  );
}

export default NewReviewOnSearch;
