import React from "react";
import styled from "styled-components";
import search from "../images/search.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = styled.div`
  height: 50px;
  width: 300px;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
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

const Header = () => {
  const [book, setBook] = useState("");

  const [search, setSearch] = useState("");

  return (
    <Search>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="你在煩惱什麼？"
      ></Input>
      <SearchBtn to={`/book/search/${search}`} />
    </Search>
  );
};

export default Header;
