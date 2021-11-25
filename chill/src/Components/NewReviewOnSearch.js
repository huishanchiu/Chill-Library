import React from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../utils/firebase";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupInner = styled.div`
  width: 50%;
  position: relative;
  padding: 30px;
  background-color: #f1faf7;
  border-radius: 1rem;
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
  width: 30px;
  height: 30px;
  border-radius: 20px;
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

function NewReviewOnSearch({ close }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [selection, setSelection] = useState(0);
  const [rating, setRating] = useState(0);
  const history = useHistory();
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
  console.log(bookName);
  console.log(bookId);
  function onSubmit() {
    if (
      content !== "" &&
      quote !== "" &&
      (hashtag1 !== "" || hashtag2 !== "" || hashtag3 !== "")
    ) {
      const documentRef = firebase.firestore().collection("reviews").doc();
      console.log(documentRef);
      documentRef.set({
        bookName: bookName,
        bookId: bookId,
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
      });
      db.collection("users")
        .doc(currentUser.uid)
        .update({
          reviewCount: firebase.firestore.FieldValue.increment(1),
        });
      close(false);
      Swal.fire({
        text: "成功發表一篇去憂",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    } else {
      Swal.fire({
        text: "請填入Quote、去憂內容以及至少一個hashtag喔！",
        confirmButtonColor: "rgba(15, 101, 98, 0.8)",
      });
    }
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
