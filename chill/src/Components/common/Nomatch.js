import React from "react";
import styled from "styled-components";
import { IoMdBeer } from "react-icons/io";
import { Link } from "react-router-dom";

const Div = styled.div`
  outline: red solid;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  font-style: italic;
  font-weight: 600;
  padding: 0.5rem;
  font-size: 20px;
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
  /* background-color: #f93c10; */
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.7);
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
`;
const ThemeIcon = styled(IoMdBeer)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;

function Nomatch() {
  return (
    <Div>
      <lottie-player
        src="https://assets4.lottiefiles.com/packages/lf20_j3gumpgp.json"
        background="transparent"
        speed="1"
        style={{ maxWidth: "40%", maxHeight: "40%" }}
        loop
        autoplay
      />
      <NavLink to="/themes">
        <Btn>
          <ThemeIcon />
          回到去憂主題
        </Btn>
      </NavLink>
    </Div>
  );
}

export default Nomatch;
