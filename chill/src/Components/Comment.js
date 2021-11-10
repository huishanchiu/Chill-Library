import { React, useState, useEffect } from "react";
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

const CloseIcon = styled(AiOutlineCloseCircle)`
  display: none;
  color: #1abea7;
  width: 30px;
  height: 100%;
  cursor: pointer;
  /* &:hover {
    display: block;
  } */
`;
const Close = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 8px;
  right: 8px;
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
  width: 90%;
  height: 100px;
`;
const CommentBtn = styled.div`
  cursor: pointer;
  width: 40px;
  border: grey solid 1px;
  background-color: #f2f2f2;
  color: #0d6663;
`;
const CommentCount = styled.h4``;
const CommentAuthorPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const CommentAuthorName = styled.div``;
const CommentContent = styled.div`
  position: relative;
  &:hover :first-child {
    display: block;
  }
`;
const ContentEdit = styled.textarea``;

function Comment({ review }) {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [reviewid, setReviewid] = useState([]);
  const [editReview, setEditReview] = useState(undefined);

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
        console.log(data);
      });
  }, []);

  function onSubmit() {
    // setReviewid(reviewId);
    console.log(reviewid);
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
  function toggleRemove(commentId) {
    if (window.confirm("確定要刪除這篇留言嗎？")) {
      firebase
        .firestore()
        .collection("reviews")
        .doc(review.id)
        .collection("comments")
        .doc(commentId)
        .delete();
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
    <div>
      <CommentTag>
        <CommentDiv
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
        <CommentBtn
          onClick={(e) => {
            onSubmit();
          }}
        >
          回應
        </CommentBtn>

        <CommentCount>共{review.commentCount || 0}則留言</CommentCount>
        {comments.map((comment) => {
          return (
            <>
              <CommentContent>
                {comment.author.uid === firebase.auth().currentUser.uid ? (
                  <>
                    <Close>
                      <CloseIcon onClick={(e) => toggleRemove(comment.id)} />
                    </Close>

                    <Edit>
                      <EditIcon
                        onClick={() => {
                          clickEdit(comment.id);
                        }}
                      />

                      {editReview === comment.id ? (
                        <DoneIcon
                          onClick={() => {
                            toggleSave(comment.id);
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Edit>
                  </>
                ) : (
                  ""
                )}
                <CommentAuthorPhoto src={comment.author.photoURL} alt="" />
                <CommentAuthorName>
                  {comment.author.displayName || "使用者"}
                </CommentAuthorName>

                {editReview === comment.id ? (
                  <>
                    <ContentEdit
                      defaultValue={comment.content}
                      onChange={(e) => {
                        setCommentContent(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>{comment.content}</>
                )}

                {comment.createdAt.toDate().toLocaleString()}
                <hr />
              </CommentContent>
            </>
          );
        })}
      </CommentTag>
    </div>
  );
}

export default Comment;
