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
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 8px;
`;
const Close = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
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
  color: rgba(255, 240, 221, 0.6);
  padding-bottom: 20px;
  width: 100vmin;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
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
  width: 99%;
  height: 300px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
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
const CommentAuthorName = styled.div`
  margin-left: 10px;
`;
const CommentContent = styled.div`
  position: relative;
  &:hover :first-child {
    display: block;
  }
`;
const ContentEdit = styled.textarea``;
const AuthorDiv = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  margin: 20px;
`;

function Comments({ review }) {
  const [comments, setComments] = useState([]);
  const [editReview, setEditReview] = useState(undefined);
  const [commentContent, setCommentContent] = useState("");
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
  const toggleSave = (id) => {
    setEditReview(false);
    AddToFirebase(id);
  };
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
  return (
    <div>
      <CommentTag>
        <CommentCount>共{comments.length || 0}則留言</CommentCount>
        {comments.map((comment) => {
          return (
            <>
              <CommentContent key={comment.id}>
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
                <AuthorDiv>
                  <CommentAuthorPhoto src={comment.author.photoURL} alt="" />
                  <CommentAuthorName>
                    {comment.author.displayName || "使用者"}
                  </CommentAuthorName>
                </AuthorDiv>

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
                  <Text>{comment.content}</Text>
                )}

                {comment.createdAt.toDate().toLocaleString()}
              </CommentContent>
            </>
          );
        })}
      </CommentTag>
    </div>
  );
}

export default Comments;
