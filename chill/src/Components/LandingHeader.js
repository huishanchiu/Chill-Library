import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
const HomeIcon = styled(RiHome5Line)`
  width: 30px;
  height: 100%;
`;
const ThemeIcon = styled(IoMdBeer)`
  width: 30px;
  height: 100%;
`;
const FindIcon = styled(IoIosCompass)`
  width: 30px;
  height: 100%;
`;
const BookIcon = styled(RiBook3Fill)`
  width: 30px;
  height: 100%;
`;
const HeaderNav = styled.div`
  width: 100%;
  z-index: 2;
  position: fixed;
  background-color: #2c213b;
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  font-style: italic;
  font-weight: 600;
  /* color: #ff8400; */
  padding: 1rem;
  font-size: 20px;
  text-decoration: none;
  text-shadow: 0 0 5px #ffa500, 0 0 5px #ffa500, 0 0 10px #ffa500,
    0 0 20px #ffa500;
  color: #fff6a9;
`;

const LandingHeader = () => {
  return (
    <HeaderNav>
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <NavLink to="/themes">
        <ThemeIcon />
        去憂主題
      </NavLink>
      <NavLink to="/news">
        <FindIcon />
        累積去憂#345
      </NavLink>
      <NavLink to="/mybooks">
        <BookIcon />
        我的書櫃
      </NavLink>
    </HeaderNav>
  );
};

export default LandingHeader;
