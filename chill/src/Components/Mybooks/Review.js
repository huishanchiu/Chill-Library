import React from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Div = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 240, 221, 0.8);
  font-size: 22px;
  width: 100%;
  padding: 20px;
  background-color: rgba(213, 219, 219, 0.1);
`;
const DivContainer = styled(Div)`
  font-size: 16px;
`;
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
  width: 100%;
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
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 30px;
  text-decoration: none;
  color: rgba(255, 240, 221, 0.8);
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  margin: 20px 0;
`;
const Quote = styled.div`
  color: tomato;
  height: 25px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const QuoteEdit = styled.input`
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
  color: #f83b10;
  margin-left: 10px;
  padding: 3px 5px;
  background-color: rgba(254, 239, 222, 0.7);
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;
const ReviewTime = styled.div`
  margin-top: 20px;
  color: rgba(254, 239, 222, 0.7);
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
`;
const BookImg = styled.img`
  margin-right: 20px;
  width: 25%;
  @media (max-width: 1250px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (max-width: 425px) {
    width: 60%;
  }
`;
const BookImgTag = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

function Review({ setActiveItem }) {
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
        .orderBy("createdAt", "desc")
        .onSnapshot((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const reviewId = docSnapshot.id;
            return { ...docSnapshot.data(), reviewId };
          });
          setReviews(data);
          setActiveItem("review");
        });
    }
  }, []);

  function toggleRemove(reviewId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn ",
        cancelButton: "btn ",
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
          firebase.firestore().collection("reviews").doc(reviewId).delete();
        }
      });
  }
  console.log(reviews);
  return (
    <>
      {reviews.length > 0 ? (
        <DivContainer>
          <AllBook>
            {reviews &&
              reviews.map((review) => {
                return (
                  <ReviewTag key={review.id}>
                    {userId.userid === firebase.auth().currentUser.uid ? (
                      <>
                        <Close>
                          <CloseIcon
                            onClick={(e) => toggleRemove(review.reviewId)}
                          />
                        </Close>
                        <Edit>
                          <EditIcon
                            onClick={() => {
                              clickEdit(review.reviewId);
                            }}
                          />

                          {editReview === review.reviewId ? (
                            <DoneIcon
                              onClick={() => {
                                toggleSave(review.reviewId);
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

                    {editReview === review.reviewId ? (
                      <>
                        <QuoteEdit
                          onChange={(e) => setQuote(e.target.value)}
                          // value={review.quote}
                          defaultValue={quote}
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
                    <BookImgTag>
                      <HashtagContainer>
                        {review.hashtag1 ? (
                          <Hashtag>#{review.hashtag1}</Hashtag>
                        ) : (
                          ""
                        )}
                        {review.hashtag2 ? (
                          <Hashtag>#{review.hashtag2}</Hashtag>
                        ) : (
                          ""
                        )}
                        {review.hashtag3 ? (
                          <Hashtag>#{review.hashtag3}</Hashtag>
                        ) : (
                          ""
                        )}
                      </HashtagContainer>
                      <BookImg
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${
                          review.id || review.bookId
                        }?fife=w400-h600`}
                        alt=""
                      />
                    </BookImgTag>
                    <ReviewTime>
                      {new Date(
                        review.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </ReviewTime>
                  </ReviewTag>
                );
              })}
          </AllBook>
        </DivContainer>
      ) : (
        <Div>目前還沒發表去憂唷</Div>
      )}
    </>
  );
}

export default Review;
