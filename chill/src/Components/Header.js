import React from "react";
import styled from "styled-components";
import search from "../images/search.png";

const Search = styled.div`
  width: 300px;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.input`
  /* position: fixed; */
  width: 200px;
  height: 20px;
  padding: 8px;
  margin-right: 20px;
  border-radius: 20px;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 180px;
  /* background-color: #f83b10; */
  /* color: #f6e7db; */
  color: red;
`;

const Header = () => {
  return (
    <Search>
      <Input placeholder="你在煩惱什麼？" />
    </Search>
  );
};

export default Header;
