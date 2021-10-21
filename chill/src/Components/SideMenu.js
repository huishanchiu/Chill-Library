import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import shortLogo from "../images/shortLogo.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";

const SideNav = styled.div`
  color: white;
  width: 300px;
  height: 100vh;
  background-color: #2c213b;
`;
const Logo = styled.img`
  display: block;
  margin: auto;
  padding: 20px 0;
  width: 100px;
`;
const HomeIcon = styled(RiHome5Line)`
  padding-right: 10px;

  width: 30px;
  height: 100%;
`;
const ThemeIcon = styled(IoMdBeer)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const FindIcon = styled(IoIosCompass)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;
const BookIcon = styled(RiBook3Fill)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;

const NavLink = styled(Link)`
  display: flex;
  margin-left: 50px;
  font-style: italic;
  font-weight: 600;
  padding: 1rem;
  font-size: 20px;
  text-decoration: none;
  text-shadow: 0 0 5px #ffa500, 0 0 5px #ffa500, 0 0 10px #ffa500,
    0 0 20px #ffa500;
  color: #fff6a9;
`;

const SideMenu = () => {
  return (
    <SideNav>
      <Logo src={shortLogo} alt="" />
      <NavLink to="/">
        <HomeIcon />
      </NavLink>
      <NavLink to="/news">
        <FindIcon />
        累積去憂#345
      </NavLink>
      <NavLink to="/themes">
        <ThemeIcon />
        去憂主題
      </NavLink>

      <NavLink to="/mybooks">
        <BookIcon />
        我的書櫃
      </NavLink>
    </SideNav>
  );
};

export default SideMenu;
