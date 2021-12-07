import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AnimatedNumbers from "react-animated-numbers";
import { IoIosCompass, IoMdBeer } from "react-icons/io";
import { getAllReviews } from "../../utils/firebaseFunction";

const ThemeIcon = styled(IoMdBeer)`
  width: 30px;
  height: 100%;
`;
const FindIcon = styled(IoIosCompass)`
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
`;
const Btn = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #feae29;
  border: rgb(254, 239, 222) 1px solid;
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.7);
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;

const LandingHeader = () => {
  const [news, setNews] = useState("");
  useEffect(() => {
    getAllReviews(setNews);
  }, []);
  return (
    <HeaderNav>
      <NavLink to="/news">
        <Btn>
          <FindIcon />
          累積去憂#
          <AnimatedNumbers
            animateToNumber={news.length}
            fontStyle={{ fontSize: 24 }}
            configs={(number, index) => {
              return { mass: 2, tension: 200 * (index + 1), friction: 70 };
            }}
          ></AnimatedNumbers>
        </Btn>
      </NavLink>
      <NavLink to="/themes">
        <Btn>
          <ThemeIcon />
          去憂主題
        </Btn>
      </NavLink>
    </HeaderNav>
  );
};

export default LandingHeader;
