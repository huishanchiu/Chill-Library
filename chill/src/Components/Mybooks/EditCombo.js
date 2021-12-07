import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import Swal from "sweetalert2";
import { HiDotsVertical } from "react-icons/hi";
import { editReviewToDB } from "../../utils/firebaseFunction";

const Div = styled.div`
  position: relative;
`;
const EditMenuIcon = styled(HiDotsVertical)`
  width: 20px;
  height: 100%;
  cursor: pointer;
`;
const Edit = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
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
  border: none;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
`;
const Content = styled.div`
  margin: 20px;
`;
const EditIcons = styled.div`
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  margin-right: 5px;
  background-color: rgba(255, 240, 221, 0.2);
`;
const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;
const Btn = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #0d6663;
  color: #f1faf7;
  text-align: center;
  margin: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

function EditCombo({ review }) {
  const [content, setContent] = useState([]);
  const [quote, setQuote] = useState("");
  const [open, setOpen] = useState(false);
  const [editReview, setEditReview] = useState(undefined);
  function AddToFirebase(docId) {
    editReviewToDB(docId, quote, content);
  }
  const toggleSave = (docId) => {
    setEditReview(false);
    AddToFirebase(docId);
    setOpen(false);
  };

  function toggleRemove(reviewId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn",
        cancelButton: "btn",
      },
      buttonsStyling: true,
      confirmButtonColor: "rgba(15, 101, 98, 0.8)",
    });

    swalWithBootstrapButtons
      .fire({
        text: "確定要刪除留言嗎？",
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
  function clickEdit(docId) {
    if (editReview === false) {
      setEditReview(docId);
    } else if (editReview !== docId) {
      setEditReview(docId);
    } else if (editReview === docId) {
      setEditReview(false);
    }
  }
  function toggleEdit() {
    open ? setOpen(false) : setOpen(true);
  }
  return (
    <Div>
      <Edit>
        {open ? (
          <>
            <EditIcons
              onClick={() => {
                clickEdit(review.id);
              }}
            >
              編輯
            </EditIcons>
            {editReview === review.id ? (
              <EditIcons
                onClick={() => {
                  toggleSave(review.id);
                }}
              >
                儲存
              </EditIcons>
            ) : (
              ""
            )}

            <EditIcons onClick={(e) => toggleRemove(review.id)}>刪除</EditIcons>
          </>
        ) : (
          ""
        )}
        <EditMenuIcon
          onClick={(e) => {
            toggleEdit(e);
          }}
        />
      </Edit>
      {editReview === review.id ? (
        <InputContainer>
          <QuoteEdit
            onChange={(e) => setQuote(e.target.value)}
            defaultValue={review.quote}
          />

          <ContentEdit
            onChange={(e) => setContent(e.target.value)}
            defaultValue={review.content}
          />
        </InputContainer>
      ) : (
        <>
          <Quote>{review.quote}</Quote>
          <Content>{review.content}</Content>
        </>
      )}
    </Div>
  );
}

export default EditCombo;
