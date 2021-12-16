import React, { useState, useEffect } from "react";
import styled from "styled-components";
import search from "../../images/search.png";
import { useHistory } from "react-router";
import { getHeaderHashtags } from "../../utils/firebaseFunction";
import { searchKeyWord } from "../../utils/utils";

const SearchBar = styled.div`
  cursor: pointer;
  background-color: #f7f7f7;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 30px;
  height: 40px;
  width: 200px;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 500px) {
    height: 30px;
    width: 150px;
  }
`;

const Input = styled.input`
  margin-right: auto;
  outline: none;
  border: none;
  text-decoration: none;
  width: 190px;
  font-size: 16px;
  padding: 8px 5px;
  background-color: transparent;
  border-radius: 30px;
  @media (max-width: 500px) {
    width: 100px;
    font-size: 12px;
  }
`;

const SearchBtn = styled.div`
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  width: 25px;
  height: 20px;
  outline: none;
  text-decoration: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const Div = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const HashtagDiv = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
`;
const Hashtag = styled.div`
  border-radius: 5px;
  padding: 3px;
  font-size: 15px;
  background-color: #0d6663;
  color: #f7f7f7;
  margin: 5px;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 8px;
  }
`;
const Header = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  function onsubmit(e) {
    setSearch(e.target.textContent);
  }
  useEffect(() => {
    getHeaderHashtags(setReviews);
  }, []);

  return (
    <Div>
      <SearchBar>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="你在煩惱什麼？"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (search === "") {
                searchKeyWord(search, setSearch, history, "請輸入關鍵字");
              } else {
                history.push(`/book/search/${search}`);
              }
            }
          }}
        ></Input>
        <SearchBtn
          onClick={() =>
            searchKeyWord(search, setSearch, history, "請輸入關鍵字")
          }
        />
      </SearchBar>
      <HashtagDiv>
        {reviews.map((review) => {
          return (
            <Hashtag
              key={review.id}
              onClick={(e) => {
                onsubmit(e);
              }}
            >
              {review.hashtag1}
            </Hashtag>
          );
        })}
      </HashtagDiv>
    </Div>
  );
};

export default Header;
