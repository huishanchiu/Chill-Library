import React from "react";
import styled from "styled-components";
import search from "../images/search.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import algolia from "../utils/algolia";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

const Search = styled.div`
  height: 50px;
  width: 250px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  border: 1 px solid rgb(247, 247, 247);
  text-decoration: none;
  width: 200px;
  height: 20px;
  padding: 8px;
  background-color: #f7f7f7;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
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
  /* background-color: white; */
  width: 200px;
  margin: 10px;
`;
const Result = styled.div`
  color: gery;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Header = () => {
  const getSelectedVal = (value) => {
    console.log(value);
  };

  const getChanges = (value) => {
    console.log(value);
  };

  const [book, setBook] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  function onSearchChange(e, input) {
    console.log(e.target.value);
    setInput(e.target.value);

    algolia.search(e.target.value).then((result) => {
      console.log(result.hits);
      const searschResults = result.hits.map((hit) => {
        return {
          quote: hit.quote,
          hashtag1: hit.hashtag1,
          hashtag2: hit.hashtag2,
          hashtag3: hit.hashtag3,
          id: hit.objectID,
        };
      });

      setResults(searschResults);
    });
  }

  return (
    <Div>
      <Search>
        {/* <SearchField
          placeholder="Search item"
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        /> */}
        {/* firebase///////////////////////////////////////// */}

        <Input
          id="autocomplete"
          // onChange={(e) => onSearchChange(e.target.value)}
          onChange={onSearchChange}
          value={input}
          placeholder="你在煩惱什麼？"
        ></Input>

        {/* 第三方api///////////////////////////////////////// */}
        {/* <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="你在煩惱什麼？"
        ></Input> */}

        <SearchBtn to={`/book/search/${search}`} />
      </Search>

      {results ? (
        <ResultContainer>
          {results.map((result) => {
            console.log(result.quote);
            return <Result>{result.quote}</Result>;
          })}
        </ResultContainer>
      ) : (
        "搜尋不到喔"
      )}
    </Div>
  );
};

export default Header;
