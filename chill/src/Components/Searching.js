import React, { Component } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EachSearchBook from "./EachSearchBook";

const AllBook = styled.div`
  width: 700px;
`;
const BookTag = styled(Link)`
  padding: 20px;
  text-decoration: none;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  background-color: #fbe192;
  margin-top: 20px;
  height: 200px;
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookImg = styled.img`
  outline: grey solid 1px;
  height: 150px;
  width: 100px;
`;
const BookName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
`;
function Searching() {
  const [bookResult, setBookResult] = useState([]);
  const search = useParams();
  console.log(search);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.search}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datas) => {
        const data = datas.items;
        console.log(datas);
        setBookResult(data);
      });
  }, [search.search]);
  console.log(bookResult);

  return (
    <div>
      <AllBook>
        搜尋結果共{bookResult.length}筆
        {bookResult.map((item) => {
          return (
            <BookTag
              key={item.volumeInfo.title}
              to={
                item.volumeInfo.industryIdentifiers
                  ? `/book/searching/${item.volumeInfo.industryIdentifiers[0].identifier}`
                  : ""
              }
            >
              <BookImg
                src={
                  item.volumeInfo.imageLinks
                    ? item.volumeInfo.imageLinks.smallThumbnail
                    : "https://i.pinimg.com/564x/8d/98/54/8d9854ecfd84f4daa1561c7b62c6387f.jpg"
                }
                alt="book_image"
              />
              <BookContent>
                <BookName>{item.volumeInfo.title}</BookName>
                <BookSummary>
                  {item.volumeInfo.description &&
                    `${item.volumeInfo.description.slice(0, 200)}......`}
                </BookSummary>
              </BookContent>
            </BookTag>
          );
        })}
        );
      </AllBook>
      ;
    </div>
  );
}

export default Searching;
