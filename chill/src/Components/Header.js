import React from "react";
import styled from "styled-components";
import search from "../images/search.png";
import shortLogo from "../images/shortLogo.png";
import { MdMood } from "react-icons/md";

const Avatar = styled(MdMood)`
  width: 30px;
  height: 100%;
  padding: 5px;
  color: #fff6a9;
`;
const HeaderNav = styled.div`
  width: 100%;
  z-index: 2;
  /* position: fixed; */
  background-color: #2c213b;
  display: flex;
  margin: auto;
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  padding: 1em;
`;
const Search = styled.div`
  display: flex;
  /* align-items: center; */
  margin-left: auto !important;
`;

const Input = styled.input`
  width: 200px;
  height: 20px;
  padding: 8px;
  border-radius: 20px;
  background-image: url(${search});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 180px;
`;
// const Logo = styled.img`
//   margin-left: 50px;
//   width: 100px;
// `;

const Header = () => {
  return (
    <HeaderNav>
      <Nav>
        {/* <Logo src={shortLogo} alt="" /> */}
        <Search>
          <Input placeholder="你在煩惱什麼？" />
          <Avatar />
        </Search>
      </Nav>
    </HeaderNav>
  );
};

export default Header;
