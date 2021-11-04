import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { useState, useEffect } from "react";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

const EditIcon = styled(BsPencilSquare)`
  cursor: pointer;
`;
const DoneIcon = styled(MdFileDownloadDone)`
  cursor: pointer;
  width: 20px;
  height: 100%;
`;
const Edit = styled.div``;
const Quote = styled.input`
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

function QuoteEdit(id) {
  const [readOnly, setReadOnly] = useState(true);
  const [quote, setQuote] = useState("");

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
  return (
    <div>
      <Edit>
        {readOnly ? (
          <EditIcon onClick={onSubmit} />
        ) : (
          <DoneIcon
            onClick={(e) => {
              toggleSave(id);
            }}
          />
        )}
      </Edit>
      <QuoteEdit
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        readOnly={readOnly}
        placeholder={quote}
      />
    </div>
  );
}

export default QuoteEdit;
