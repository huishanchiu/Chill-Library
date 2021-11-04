import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

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
function ReviewEdit(props) {
  console.log(props);
  const reviews = props.reviews;
  console.log(reviews);
  const [readOnly, setReadOnly] = useState(true);
  const [quote, setQuote] = useState("");
  const [content, setContent] = useState("");
  const [hashtag1, steHashtag1] = useState("");
  const [hashtag2, steHashtag2] = useState("");
  const [hashtag3, steHashtag3] = useState("");
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
  function toggleRemove(reviewId) {
    console.log(reviewId);
    firebase.firestore().collection("reviews").doc(reviewId).delete();
  }
  return (
    <div>
      123
      {/* <ReviewTag key={review.id}>
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
      </ReviewTag> */}
    </div>
  );
}
export default ReviewEdit;
