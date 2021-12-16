import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { addCategory, removeCategory } from "../../utils/firebaseFunction";

const Mask = styled.div`
  z-index: 1;
  color: #1abea7;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100p;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupInner = styled.div`
  width: 20%;
  color: #484141;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: fixed;
  padding: 15px 0;
  background-color: rgba(241, 250, 247, 0.9);
  border-radius: 1rem;
`;
const Category = styled.div`
  background-color: rgba(255, 240, 221, 0.8);
  width: 170px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #484141;
  cursor: pointer;
`;
const Btn = styled.div`
  margin: 20px auto;
  text-align: center;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: #0d6662;
  color: #f1faf7;
  font-size: 16px;
  font-weight: 500;
`;

function UserCategory({ setPopup, book }) {
  function toggleAddCategory(e) {
    const isCategory =
      Object.keys(book).length > 0
        ? book.categories?.includes(e.target.textContent)
        : "";
    if (isCategory) {
      addCategory(e, book.title);
    } else {
      removeCategory(e, book.title);
    }
  }
  function closeAddTag() {
    setPopup(false);
  }

  return (
    <>
      {firebase.auth().currentUser ? (
        <Mask>
          <PopupInner>
            幫這本書新增兩個分類吧
            {book?.categories === undefined || book?.categories?.length < 2 ? (
              <>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  宅在家好發慌？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  錢錢去哪了？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  一個人好孤單？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  想不出好點子？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  如何上火箭？
                </Category>
                <Category
                  onClick={(e) => {
                    toggleAddCategory(e);
                  }}
                >
                  心裡總是卡卡的？
                </Category>
                <Btn onClick={closeAddTag}>稍後再說</Btn>
              </>
            ) : (
              <>{setPopup(false)}</>
            )}
          </PopupInner>
        </Mask>
      ) : (
        ""
      )}
    </>
  );
}

export default UserCategory;
