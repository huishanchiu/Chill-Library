import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Div = styled.div`
  display: flex;
  background-color: #e5e5e3;
`;
const BookTag = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  background-color: #eeeda7;
`;
const BookImage = styled.img``;
const BookInfo = styled.div`
  margin-left: 20px;
`;
const BookTitle = styled.h4`
  margin: 5px 5px;
  color: #414141;
`;

function Review() {
  const [bookTitle, setbookTitle] = useState("怎麼吃");
  const [bookImage, setBookImage] = useState(
    "http://books.google.com/books/content?id=hHfHCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  );

  return (
    <Div>
      <BookTag>
        <BookImage src={bookImage} alt="" />
        <BookInfo>
          <BookTitle>{bookTitle}</BookTitle>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, illum
          atque? Blanditiis officiis eos nulla aliquid vero tempora adipisci,
          sint corrupti maxime itaque laborum voluptates corporis possimus
          dolores molestiae eveniet.
        </BookInfo>
      </BookTag>
    </Div>
  );
}

export default Review;
