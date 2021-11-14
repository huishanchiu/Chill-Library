import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { AiFillPlayCircle } from "react-icons/ai";

const PlayIcon = styled(AiFillPlayCircle)``;
const AllBook = styled.div``;
const BookTag = styled.div`
  border-top: rgba(254, 174, 32, 0.3) 1px solid;
  padding: 40px;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  /* margin-top: 20px; */
  height: 200px;
  &:hover {
    background-color: rgba(213, 219, 219, 0.1);
  }
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookImg = styled.img`
  height: 200px;
  -webkit-box-shadow: 10px 10px 0px 0px #cd7f32,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 0px 0px #cd7f32, 10px 10px 0px 0px #99a3a4,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  &:hover {
    height: 210px;
  }
`;
const BookName = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  font-weight: 900;
  color: rgba(255, 240, 221, 1);
  padding-bottom: 8px;
  &:hover {
    color: #cd7f32;
  }
`;
const BookSummary = styled.div`
  color: rgba(255, 240, 221, 0.8);
`;
const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: rgba(254, 157, 104);
`;
const Author = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(204, 209, 209, 0.6);
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;
const More = styled(Link)`
  /* background-color: rgba(255, 240, 221, 0.8); */
  text-align: center;
  text-decoration: none;
  color: #cd7f32;
`;

function AllBooks({ theme }) {
  const [bookList, setBookList] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `${theme}`)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList(list);
      });
  }, []);
  console.log(bookList);
  return (
    <div>
      <AllBook>
        {bookList.map((item) => {
          console.log(item);
          let des = item.description.slice(0, 150);
          item.description = des + "......";

          return (
            <BookTag key={item.title}>
              <Link to={`/book/${item.title}`}>
                <BookImg
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                  alt=""
                />
              </Link>
              <BookContent>
                <BookName to={`/book/${item.title}`}>{item.title}</BookName>
                <Info>
                  <Author>作者：{item.authors}</Author>
                  <Author>
                    出版日期：
                    {item.publishedDate}
                  </Author>
                </Info>
                <SubTitle>{item?.subtitle}</SubTitle>
                <BookSummary>
                  {item.description}
                  <More to={`/book/${item.title}`}>
                    <PlayIcon />
                    more
                  </More>
                </BookSummary>
              </BookContent>
            </BookTag>
          );
        })}
      </AllBook>
    </div>
  );
}

export default AllBooks;
