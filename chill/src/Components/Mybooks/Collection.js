import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

const BookCollection = styled(BsBookmarkFill)`
  width: 10px;
  color: tomato;
`;
const BookUnCollection = styled(BsBookmark)`
  width: 20px;
  height: 100%;
  color: tomato;
`;
const Shelf = styled.div`
  display: flex;
  background-color: #e5e5e3;
`;
const BookTag = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #eeeda7;
`;
const BookInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BookTitle = styled.h4`
  margin: 5px 5px;
  color: #414141;
`;
const BookImage = styled.img``;

function Collection() {
  const [bookTitle, setbookTitle] = useState("怎麼吃");
  const [bookImage, setBookImage] = useState(
    "http://books.google.com/books/content?id=hHfHCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  );
  const [like, setLike] = useState(false);
  //   function toggleLiked() {

  //   }
  return (
    <Shelf>
      <BookTag>
        <BookImage src={bookImage} alt="" />
        <BookInfo>
          <BookTitle>{bookTitle}</BookTitle>
          {/* <BookUnCollection onClick={()=>{toggleLiked}} /> */}
        </BookInfo>
      </BookTag>
    </Shelf>
  );
}

export default Collection;
