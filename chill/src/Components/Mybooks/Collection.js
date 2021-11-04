import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import firebase from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";
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
  top: 10px;
  right: 10px;
`;

const BookCollection = styled(BsBookmarkFill)`
  width: 10px;
  color: tomato;
`;
const BookUnCollection = styled(BsBookmark)`
  width: 20px;
  height: 100%;
  color: tomato;
`;

const AllBook = styled.div``;
const BookTag = styled.div`
  position: relative;
  padding: 20px;
  text-decoration: none;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  background-color: #fbe192;
  margin-top: 20px;
  height: 200px;
  &:hover :first-child {
    display: block;
  }
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookImg = styled.img`
  outline: grey solid 1px;
  height: 150px;
  width: 100px;
`;
const BookName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
`;

function Collection() {
  const [uid, setUid] = useState("");
  let userId = useParams();
  const [bookList, setBookList] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    setUid(firebase.auth().currentUser?.uid);
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("collectedBy", "array-contains", userId.userid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setBookList(data);
      });
  }, []);
  console.log(userId.userid);
  function toggleUncellect(title) {
    firebase
      .firestore()
      .collection("books")
      .doc(title)
      .update({
        collectedBy: firebase.firestore.FieldValue.arrayRemove(userId.userid),
      });
  }

  return (
    <AllBook>
      {bookList.map((item) => {
        let des = item.description.slice(0, 200);
        item.description = des + "......";

        return (
          <BookTag key={item.title}>
            <Close>
              <CloseIcon onClick={(e) => toggleUncellect(item.title)} />
            </Close>
            <Link to={`/book/${item.title}`}>
              <BookImg src={item.image} alt="" />
            </Link>

            <BookContent>
              <BookName>{item.title}</BookName>
              <BookSummary>{item.description}</BookSummary>
            </BookContent>
          </BookTag>
        );
      })}
    </AllBook>
  );
}

export default Collection;
