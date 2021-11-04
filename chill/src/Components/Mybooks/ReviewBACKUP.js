import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
`;
const Close = styled.div`
  display: none;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const AllBook = styled.div`
  /* outline: red solid; */
`;
const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
`;
const DoneIcon = styled(MdFileDownloadDone)`
  cursor: pointer;
  width: 20px;
  height: 100%;
`;
const Edit = styled.div``;
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
  &:hover :first-child {
    display: block;
  }
`;

const QuoteEdit = styled.input`
  background: none;
  border: none;
  color: tomato;
  height: 25px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  ::placeholder {
    color: tomato;
  }
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
  const [readOnly, setReadOnly] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const [quote, setQuote] = useState("");
  let userId = useParams();
  console.log(userId);
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
        });
  }
  const onSubmit = (e) => {
    setReadOnly(false);
  };

  const toggleSave = (e, id) => {
    console.log(id);
    if (!readOnly) {
      setReadOnly(true);
      AddToFirebase(id);
    }
  };
  useEffect(() => {
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        console.log(currentUser);
        setUser(currentUser);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);
  console.log(user);
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
    console.log(reviewId);
    firebase.firestore().collection("reviews").doc(reviewId).delete();
  }
  console.log(reviews);
  return (
    <AllBook>
      {reviews &&
        reviews.map((review) => {
          return (
            <ReviewTag key={review.id}>
              <Close>
                <CloseIcon onClick={(e) => toggleRemove(review.id)} />
              </Close>

              <Edit>
                {readOnly ? (
                  <EditIcon onClick={onSubmit} />
                ) : (
                  <DoneIcon
                    onClick={(e) => {
                      toggleSave(e, review.id);
                    }}
                  />
                )}
              </Edit>
              <QuoteEdit
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                readOnly={readOnly}
                placeholder={review.quote}
              />
              {/* {readOnly ? (
                <Quote readOnly={readOnly} defaultValue={review.quote} />
              ) : (
                <QuoteEdit
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  readOnly={readOnly}
                  defaultValue={review.quote}
                />
              )} */}

              <BookName>-{review.bookName}</BookName>
              {review.content}

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
