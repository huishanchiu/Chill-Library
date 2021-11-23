import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toastGrey from "../images/toast_grey.png";
import toastYellow from "../images/toast_gold.png";
import { BsFillChatTextFill } from "react-icons/bs";
import Comment from "../Components/Comment";
import { useSelector } from "react-redux";

const TextIcon = styled(BsFillChatTextFill)`
  cursor: pointer;
  position: absolute;
  color: #bdbcbc;
  width: 26px;
  height: 100%;
`;

const Beer = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  padding: 5px;
`;

const BeerIcon = styled.img`
  cursor: pointer;
  width: 35px;
  margin-left: 30px;
`;

const BeerYellow = styled.img`
  cursor: pointer;
  width: 35px;
  /* padding: 5px; */
  margin-left: 30px;
`;

const BeerText = styled.p``;
const LikeCount = styled.div`
  color: orange;
  font-weight: 500;
  font-size: 13px;
  /* color: white; */
  width: 15px;
  height: 15px;
  border-radius: 10px;
  text-align: center;
`;
const Quote = styled.h3`
  margin-right: 20px;
  color: tomato;
`;
const LikeDiv = styled.div`
  position: relative;
  display: flex;
`;

const CloseIcon = styled(AiOutlineCloseCircle)`
  display: none;
  color: rgba(211, 211, 211, 0.8);
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
  width: 30px;
  height: 30px;
`;

const CommentTag = styled.div`
  width: 100%;
  color: rgba(255, 240, 221, 0.6);
  padding-bottom: 20px;

  position: relative;
`;

const CommentCount = styled.div`
  cursor: pointer;
  width: 100%;
  color: rgba(255, 240, 221, 0.8);
  padding: 10px 0;
`;
const CommentAuthorPhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const CommentAuthorName = styled.div`
  margin-left: 10px;
`;
const CommentContent = styled.div`
  padding: 20px 0;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  position: relative;
  /* &:hover :first-child {
    display: block;
  } */
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
  const currentUser = useSelector((state) => state.currentUser);
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
  const toggleSave = (reviewId, commentId) => {
    setEditReview(false);
    AddToFirebase(reviewId, commentId);
  };

  function AddToFirebase(reviewId, commentId) {
    firebase
      .firestore()
      .collection("reviews")
      .doc(reviewId)
      .collection("comments")
      .doc(commentId)
      .update({
        content: `${commentContent}`,
      });
  }
  const toggleLiked = (e, isLiked) => {
    const uid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("reviews")
      .doc(e.target.dataset.id)
      .update({
        likedCount: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
      });
  };

  function toggleRemove(commentId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "確定要刪除留言嗎？",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確認",
        cancelButtonText: "再想想",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            text: "刪除成功",
          });
          firebase
            .firestore()
            .collection("reviews")
            .doc(review.id)
            .collection("comments")
            .doc(commentId)
            .delete();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
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
      });
  }, []);

  const isLiked = review.likedBy?.includes(currentUser?.uid);
  function showComment() {
    if (commentOpen) {
      setCommentOpen(false);
    } else {
      setCommentOpen(true);
    }
  }
  return (
    <>
      {currentUser ? (
        <CommentTag>
          <LikeDiv>
            <TextIcon onClick={() => setOpen(true)} />
            <Beer>
              {isLiked ? (
                <BeerYellow
                  onClick={(e) => toggleLiked(e, isLiked)}
                  data-id={review.id}
                  src={toastYellow}
                />
              ) : (
                <BeerIcon
                  onClick={(e) => toggleLiked(e, isLiked)}
                  data-id={review.id}
                  src={toastGrey}
                />
              )}
              {/* <LikeCount>{review.likedBy && review.likedBy.length}</LikeCount> */}
              {review.likedCount >= 1 ? (
                <LikeCount>{review.likedCount && review.likedCount}</LikeCount>
              ) : (
                ""
              )}
            </Beer>
            {/* <BeerText>覺得很讚，賞作者一杯啤酒!</BeerText> */}
          </LikeDiv>
          <CommentCount onClick={showComment}>
            共{comments.length || 0}則留言
          </CommentCount>
          {open && <Comment review={review} close={setOpen} />}
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                {commentOpen && (
                  <CommentContent>
                    {comment.author.uid === firebase.auth().currentUser.uid ? (
                      <>
                        <Close>
                          <CloseIcon
                            onClick={(e) => toggleRemove(comment.id)}
                          />
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
                                toggleSave(comment.docId, comment.id);
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
                      <CommentAuthorPhoto
                        src={comment.author.photoURL}
                        alt=""
                      />
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
                )}
              </div>
            );
          })}
        </CommentTag>
      ) : (
        ""
      )}
    </>
  );
}

export default Comments;
