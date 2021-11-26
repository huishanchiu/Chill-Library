import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { getThemeBooks } from "../../utils/firebaseFunction";

const PlayIcon = styled(AiFillPlayCircle)``;
const AllBook = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BookTag = styled.div`
  border-top: rgba(254, 174, 32, 0.3) 1px solid;
  padding: 20px;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  &:hover {
    background-color: rgba(213, 219, 219, 0.1);
  }
  @media (max-width: 768px) {
    grid-template-columns: 45% 55%;
    grid-template-rows: 100% 100%;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const BookImg = styled.img`
  width: 80%;
  -webkit-box-shadow: 10px 10px 0px 0px #cd7f32,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 0px 0px #cd7f32, 10px 10px 0px 0px #99a3a4,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  &:hover {
    width: 85%;
  }
  @media (max-width: 700px) {
    width: 60%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`;
const BookName = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  font-weight: 900;
  color: rgba(255, 240, 221, 1);
  padding-bottom: 3px;
  &:hover {
    color: #cd7f32;
  }
  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;
const BookSummary = styled.div`
  color: rgba(255, 240, 221, 0.8);
`;
const SubTitle = styled.span`
  font-size: 16px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;
const More = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: #cd7f32;
`;

function AllBooks({ theme }) {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    getThemeBooks(theme, setBookList);
  }, [theme]);
  return (
    <div>
      <AllBook>
        {bookList.map((item) => {
          let des = item.description.slice(0, 200);
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
                <SubTitle>{item?.subtitle}</SubTitle>
                <Info>
                  <Author>作者：{item.authors}</Author>
                  <Author>
                    出版日期：
                    {item.publishedDate}
                  </Author>
                </Info>
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
