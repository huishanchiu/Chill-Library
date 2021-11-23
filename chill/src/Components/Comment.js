import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { IoMdBeer } from "react-icons/io";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { useHistory, useParams } from "react-router-dom";
import toastGrey from "../images/toast_grey.png";
import toastYellow from "../images/toast_gold.png";
import Loading from "./Loading";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Icon = styled.div`
  border-bottom: hsla(0, 0%, 0%, 0.2) 1px solid;
  width: 680px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Btn = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;

const Mask = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(211, 211, 211, 0.1);
  display: flex;
  align-items: center;
`;

const PopupInner = styled.div`
  height: 300px;
  z-index: 3;
  position: relative;
  padding: 15px 0;
  /* width: 70vmin; */
  background-color: #f1faf7;
  border-radius: 1rem;
`;
const CloseIcon = styled(AiOutlineCloseCircle)`
  color: #1abea7;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
`;
const Close = styled.div`
  outline: red solid;
  width: 40px;
  height: 40px;
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

const CommentTag = styled.div`
  position: relative;
`;

const CommentDiv = styled.textarea`
  font-size: 18px;
  ::placeholder {
    color: rgba(211, 211, 211, 0.8);
  }
  border: none;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  width: 100%;
  height: 300px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

function Comment({ review, close }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const [editReview, setEditReview] = useState(undefined);

  // console.log(review);
  useEffect(() => {
    firebase
      .firestore()
      .collection("reviews")
      .doc(review.id)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setComments(data);
        // console.log(data);
      });
  }, []);

  function onSubmit() {
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const reviewRef = firestore.collection("reviews").doc(review.id);
    batch.update(reviewRef, {
      commentCount: firebase.firestore.FieldValue.increment(1),
    });
    const commentRef = reviewRef.collection("comments").doc();
    batch.set(commentRef, {
      docId: review.id,
      content: commentContent,
      createdAt: firebase.firestore.Timestamp.now(),
      author: {
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName || "",
        photoURL: firebase.auth().currentUser.photoURL || "",
      },
    });
    batch.commit().then(() => {
      setCommentContent("");
      setIsLoading(false);
    });
    close(false);
    Swal.fire({
      text: "送出留言",
      confirmButtonColor: "rgba(15, 101, 98, 0.8)",
    });
  }
  function clickEdit(docId) {
    if (editReview === false) {
      setEditReview(docId);
      console.log(editReview);
      console.log(docId);
    } else if (editReview !== docId) {
      setEditReview(docId);
      console.log(editReview);
    } else if (editReview === docId) {
      setEditReview(false);
      console.log(editReview);
    }
  }

  function AddToFirebase(commentId) {
    firebase
      .firestore()
      .collection("reviews")
      .doc(review.id)
      .collection("comments")
      .doc(commentId)
      .update({
        content: `${commentContent}`,
      });
  }

  const toggleSave = (id) => {
    setEditReview(false);
    AddToFirebase(id);
  };

  return (
    <Mask>
      <PopupInner>
        <Icon>
          <Btn onClick={onSubmit}>送出</Btn>
          <CloseIcon onClick={() => close(false)} />
        </Icon>

        <CommentTag>
          <CommentDiv
            placeholder="想說什麼呢？"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
        </CommentTag>
      </PopupInner>
    </Mask>
  );
}

export default Comment;
