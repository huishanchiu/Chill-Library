import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import userEvent from "@testing-library/user-event";
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
  z-index: 2;
  position: fixed;
  background-color: #2c213b;
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  font-style: italic;
  font-weight: 600;
  padding: 1rem;
  font-size: 18px;
  text-decoration: none;
  /* text-shadow: 0 0 5px #ffa500, 0 0 5px #ffa500, 0 0 10px #ffa500,
    0 0 20px #ffa500;
  color: #fff6a9; */
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;

const LandingHeader = () => {
  return (
    <HeaderNav>
      <NavLink to="/news">
        <Btn>
          <FindIcon />
          累積去憂#345
        </Btn>
      </NavLink>
      <NavLink to="/themes">
        <Btn>
          <ThemeIcon />
          去憂主題
        </Btn>
      </NavLink>

      {/* <NavLink to="/mybooks">
        <Btn>
          <BookIcon />
          我的書櫃
        </Btn>
      </NavLink> */}
    </HeaderNav>
  );
};

export default LandingHeader;
