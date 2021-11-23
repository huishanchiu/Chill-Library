import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import algolia from "../utils/algolia";
import { IoMdBeer } from "react-icons/io";
import { AiFillPlayCircle } from "react-icons/ai";
import Loading from "./Loading";

const PlayIcon = styled(AiFillPlayCircle)``;
const BeerIcon = styled(IoMdBeer)`
  color: #f7db15;
  width: 25px;
  height: 100%;
  padding-left: 10px;
  transform: rotate(-20deg);
`;

const AllBook = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 90%;
  }
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
    align-items: center;
  }
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const BookImg = styled.img`
  align-self: flex-start;
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

const BookLink = styled(Link)`
  display: flex;
  height: 100%;
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
const Hot = styled.div`
  font-size: 18px;
  font-weight: 500;
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
`;
const ReviewContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const ReviewTag = styled(Link)`
  color: white;
  text-decoration: none;
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
  border-bottom: rgba(254, 174, 32, 0.3) 1px dashed;
  align-items: center;
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  line-height: 25px;
  font-weight: 500;
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
  flex-direction: column;
`;
const HashtagContainer = styled.div`
  display: flex;
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
const ResultLength = styled.div``;
const Keyword = styled.div``;
const KeyInfo = styled.div`
  color: rgba(255, 240, 221, 0.8);
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function Searching() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResult, setBookResult] = useState([]);
  const [results, setResults] = useState([]);
  const search = useParams();
  console.log(search);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [search.search]);
  console.log(results);
  console.log(bookResult);
  // const All = [...results, ...bookResult];
  // console
  return (
    <>
      <AllBook>
        <KeyInfo>
          <Keyword>
            您輸入的關鍵字：
            <span style={{ color: "tomato" }}>{search.search}</span>
          </Keyword>
          <ResultLength>
            搜尋結果共{bookResult.length + results.length}筆
          </ResultLength>
        </KeyInfo>
        <ReviewContainer>
          <Hot>熱門話題</Hot>
          {results.map((item) => {
            return (
              <Div>
                <ReviewTag to={`/book/${item.bookName}`}>
                  <ReviewQuote>
                    #{item.quote}
                    <HashtagContainer>
                      {item.hashtag1 ? <Hashtag>#{item.hashtag1}</Hashtag> : ""}
                      {item.hashtag2 ? <Hashtag>#{item.hashtag2}</Hashtag> : ""}
                      {item.hashtag3 ? <Hashtag>#{item.hashtag3}</Hashtag> : ""}
                    </HashtagContainer>
                  </ReviewQuote>
                </ReviewTag>
              </Div>
            );
          })}
        </ReviewContainer>
        {bookResult.map((item) => {
          return (
            <BookTag key={item.volumeInfo.title}>
              <BookLink
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
              </BookLink>
              <BookContent>
                <BookName
                  to={
                    item.volumeInfo.industryIdentifiers
                      ? `/book/searching/${item.volumeInfo.industryIdentifiers[0].identifier}`
                      : ""
                  }
                >
                  {item.volumeInfo.title}
                </BookName>
                <BookSummary>
                  <Info>
                    <Author>作者：{item.volumeInfo.authors}</Author>
                    <Author>
                      出版日期：
                      {item.volumeInfo.publishedDate}
                    </Author>
                  </Info>
                  {item.volumeInfo.description &&
                    `${item.volumeInfo.description.slice(0, 200)}......`}
                  <More
                    to={
                      item.volumeInfo.industryIdentifiers
                        ? `/book/searching/${item.volumeInfo.industryIdentifiers[0].identifier}`
                        : ""
                    }
                  >
                    <PlayIcon />
                    more
                  </More>
                </BookSummary>
              </BookContent>
            </BookTag>
          );
        })}
      </AllBook>
      {isLoading ? <Loading /> : ""}
    </>
  );
}

export default Searching;
