import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import ReviewEdit from "./ReviewEdit";

const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Close = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const AllBook = styled.div`
  /* outline: red solid; */
`;
const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
const DoneIcon = styled(MdFileDownloadDone)`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;
const Edit = styled.div`
  width: 50px;
  height: 50px;
`;
const ReviewTag = styled.div`
  position: relative;
  border-radius: 10px 20px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-decoration: none;
  color: grey;
  background-color: #fbe192;
  margin: 20px 0;
  /* &:hover :first-child {
    display: block;
  } */
`;
const Quote = styled.div`
  color: tomato;
  height: 25px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const QuoteEdit = styled.input`
  /* background: none;
  border: none; */
  color: tomato;
  height: 25px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  ::placeholder {
    color: tomato;
  }
`;
const ContentEdit = styled.textarea`
  height: 60px;
  color: tomato;
`;
const BookName = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-top: 0;
`;
const Hashtag = styled.div`
  margin-left: 10px;
  padding: 0.6%;
  background: #f7e8dc center/contain no-repeat;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
  -webkit-animation: animate-face 0.5s steps(2, end) infinite;
  animation: animate-face 0.5s steps(2, end) infinite;
`;
const ReviewTime = styled.h4`
  color: gray;
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
`;

function Review() {
  const [user, setUser] = useState(null);
  const [editReview, setEditReview] = useState(undefined);
  const [content, setContent] = useState([]);
  const [quote, setQuote] = useState("");
  let userId = useParams();

  const [reviews, setReviews] = useState([]);
  const db = firebase.firestore();
  const active = {
    background: "#F1FAF7",
    color: "#0D6663",
    borderRadius: "20px",
    cursor: "pointer",
  };

  function AddToFirebase(id) {
    id &&
      firebase
        .firestore()
        .collection("reviews")
        .doc(id)
        .update({
          quote: `${quote}`,
          content: `${content}`,
        });
  }

  const toggleSave = (id) => {
    setEditReview(false);
    AddToFirebase(id);
  };
  function clickEdit(docId) {
    if (editReview === false) {
      setEditReview(docId);
    } else if (editReview !== docId) {
      setEditReview(docId);
    } else if (editReview === docId) {
      setEditReview(false);
    }
  }
  useEffect(() => {
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        setUser(currentUser);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);

  useEffect(() => {
    if (user !== "") {
      db.collection("reviews")
        .where("author.uid", "==", userId.userid)
        .onSnapshot((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setReviews(data);
        });
    }
  }, []);

  function toggleRemove(reviewId) {
    if (window.confirm("確定要刪除這篇去憂嗎？")) {
      console.log(reviewId);
      firebase.firestore().collection("reviews").doc(reviewId).delete();
    }
  }

  return (
    <AllBook>
      {reviews &&
        reviews.map((review) => {
          return (
            <ReviewTag key={review.id}>
              <Close>
                <CloseIcon onClick={(e) => toggleRemove(review.id)} />
              </Close>
              {userId.userid === firebase.auth().currentUser.uid ? (
                <Edit>
                  <EditIcon
                    onClick={() => {
                      clickEdit(review.id);
                    }}
                  />

                  {editReview === review.id ? (
                    <DoneIcon
                      onClick={() => {
                        toggleSave(review.id);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Edit>
              ) : (
                ""
              )}

              {editReview === review.id ? (
                <>
                  <QuoteEdit
                    onChange={(e) => setQuote(e.target.value)}
                    // value={quote}
                    defaultValue={review.quote}
                  />
                  {quote}
                  <ContentEdit
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={review.content}
                  />
                </>
              ) : (
                <>
                  <Quote>{review.quote}</Quote>
                  <div>{review.content}</div>
                </>
              )}

              <BookName>-{review.bookName}</BookName>

              <HashtagContainer>
                {review.hashtag1 ? <Hashtag>#{review.hashtag1}</Hashtag> : ""}
                {review.hashtag2 ? <Hashtag>#{review.hashtag2}</Hashtag> : ""}
                {review.hashtag3 ? <Hashtag>#{review.hashtag3}</Hashtag> : ""}
              </HashtagContainer>
              <ReviewTime>
                {new Date(review.createdAt.seconds * 1000).toLocaleString()}
              </ReviewTime>
            </ReviewTag>
          );
        })}
    </AllBook>
  );
}

export default Review;
