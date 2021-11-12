import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import algolia from "../utils/algolia";
import { IoMdBeer } from "react-icons/io";

const BeerIcon = styled(IoMdBeer)`
  color: #f7db15;
  width: 25px;
  height: 100%;
  padding-left: 10px;
  transform: rotate(-20deg);
`;

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
const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ReviewTag = styled.div`
  width: 600px;
  padding: 10px;
  margin: 20px 10px;
  color: #0d6663;
  background-color: #f1faf7;
  border-radius: 20px;
`;

const ReviewBookName = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  border-radius: 20px;
  display: flex;
  margin-top: 10px;
  padding: 5px;
  color: #f1faf7;
  background-color: #0d6663;
  font-size: 16px;
  font-weight: 500;
`;
const ReviewQuote = styled.div`
  white-space: nowrap;
  font-size: 16px;
  line-height: 25px;
  font-weight: 900;
`;
const Hashtag = styled(ReviewQuote)`
  margin: 10px 10px 10px 0;
  color: #f83b10;
  margin-left: 10px;
  padding: 0.6%;
  background: #f7e8dc center/contain no-repeat;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;

const Div = styled.div`
  margin-right: 30px;
  display: flex;
`;
const HashtagContainer = styled.div`
  display: flex;
`;
const ResultLength = styled.div`
  margin: 20px;
`;

function Searching() {
  const [bookResult, setBookResult] = useState([]);
  const [results, setResults] = useState([]);
  const search = useParams();
  console.log(search);

  useEffect(() => {
    algolia.search(search.search).then((result) => {
      console.log(result.hits);
      const searschResults = result.hits.map((hit) => {
        return {
          bookName: hit.bookName,
          quote: hit.quote,
          hashtag1: hit.hashtag1,
          hashtag2: hit.hashtag2,
          hashtag3: hit.hashtag3,
          id: hit.objectID,
        };
      });
      setResults(searschResults);
    });
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
  console.log(results);
  console.log(bookResult);
  // const All = [...results, ...bookResult];
  // console
  return (
    <div>
      <AllBook>
        <ResultLength>
          搜尋結果共{bookResult.length + results.length}筆
        </ResultLength>
        <ReviewContainer>
          {results.map((item) => {
            return (
              <Div>
                <ReviewTag>
                  <ReviewQuote>#{item.quote}</ReviewQuote>
                  <HashtagContainer>
                    {item.hashtag1 ? <Hashtag>#{item.hashtag1}</Hashtag> : ""}
                    {item.hashtag2 ? <Hashtag>#{item.hashtag2}</Hashtag> : ""}
                    {item.hashtag3 ? <Hashtag>#{item.hashtag3}</Hashtag> : ""}
                  </HashtagContainer>
                  <ReviewBookName to={`/book/${item.bookName}`}>
                    <BeerIcon />《{item.bookName}》點擊看看這本書！
                  </ReviewBookName>
                </ReviewTag>
              </Div>
            );
          })}
        </ReviewContainer>
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
                    ? `https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`
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
      </AllBook>
    </div>
  );
}

export default Searching;
