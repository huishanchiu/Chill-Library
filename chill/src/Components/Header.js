import React from "react";
import styled from "styled-components";
import search from "../images/search.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import algolia from "../utils/algolia";
import "../header.css";
import Search from "search-react-input";
import Searching from "../Components/Searching";

const SearchBar = styled.div`
  background-color: #f7f7f7;
  border: #0d6663 1px solid;
  border-radius: 30px;
  height: 40px;
  width: 250px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  text-decoration: none;
  width: 200px;
  font-size: 16px;
  padding: 8px;
  background-color: transparent;
  border-radius: 30px;
  /* border-top-left-radius: 20px;
  border-bottom-left-radius: 20px; */
`;

const SearchBtn = styled(Link)`
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 10px;
  background-color: #f7f7f7;
  width: 25px;
  height: 20px;
  padding: 8px;
  outline: none;
  text-decoration: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const ResultContainer = styled.div`
  width: 200px;
  margin: 10px;
`;
const Result = styled.div`
  color: white;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const ResultDiv = styled.div`
  color: white;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const [results, setResults] = useState([]);
  // function onSearchChange(e, input) {
  //   console.log(e.target.value);
  //   setInput(e.target.value);
  //   algolia.search(e.target.value).then((result) => {
  //     console.log(result.hits);
  //     const searschResults = result.hits.map((hit) => {
  //       return {
  //         bookName: hit.bookName,
  //         quote: hit.quote,
  //         hashtag1: hit.hashtag1,
  //         hashtag2: hit.hashtag2,
  //         hashtag3: hit.hashtag3,
  //         id: hit.objectID,
  //       };
  //     });

  //     setResults(searschResults);
  //   });
  //   console.log(results);
  // }

  return (
    <Div>
      <SearchBar>
        {/* firebase///////////////////////////////////////// */}
        {/* <Input
          onFocus={() => setOpen(true)}
          type="text"
          // onChange={(e) => onSearchChange(e.target.value)}
          onChange={(e) => {
            onSearchChange(e, results);
          }}
          onSearchChange={onSearchChange}
          value={input}
          placeholder="你在煩惱什麼？"
        ></Input> */}
        {/* 第三方api///////////////////////////////////////// */}
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="你在煩惱什麼？"
        ></Input>
        <SearchBtn to={`/book/search/${search}`} />
      </SearchBar>

      {open ? (
        <ResultDiv>
          {results.length > 0 ? (
            <ResultContainer>
              {results.map((result) => {
                return (
                  <Link to={`book/${result.bookName}`}>
                    <Result>{result.quote}</Result>
                    {/* <Result>{result.bookName}</Result>
                    <Result>{result.hashtag1}</Result> */}
                  </Link>
                );
              })}
            </ResultContainer>
          ) : (
            "搜尋不到喔"
          )}
        </ResultDiv>
      ) : (
        ""
      )}
    </Div>
  );
};

export default Header;
