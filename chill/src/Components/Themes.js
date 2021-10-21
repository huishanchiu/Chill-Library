import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SideMenu from "./SideMenu";
import theme__1 from "../images/lonley.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import logo from "../images/ch.png";

const ThemesContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-template-rows: 200px 200px 200px;
  background-color: #2c213b;
`;

const ThemesItem = styled.div`
  /* background-color: #2c213b; */
  outline: red solid 2px;
  background-repeat: no-repeat;
  position: relative;
`;
const Theme1 = styled(ThemesItem)`
  background-image: url(${theme__1});
  background-size: 350px;
`;
const Theme2 = styled(ThemesItem)`
  background-image: url(${theme__2});
  background-size: 350px;
`;
const Theme3 = styled(ThemesItem)`
  background-image: url(${theme__3});
  background-size: 350px;
`;
const Theme4 = styled(ThemesItem)`
  background-image: url(${theme__4});
  background-size: 350px;
`;
const Theme5 = styled(ThemesItem)`
  background-image: url(${theme__5});
  background-size: 350px;
`;
const Theme6 = styled(ThemesItem)`
  background-image: url(${theme__6});
  background-size: 350px;
`;
const Logo = styled(ThemesItem)`
  background-image: url(${logo});
  background-size: 350px;
`;
const LogoOrange = styled.div`
  font-size: 40px;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
`;

const Themes = () => {
  return (
    <div>
      <Header />

      <ThemesContainer>
        <Theme1 />
        <Theme2 />
        <Theme3 />
        <Theme4 />
        <Logo>
          <LogoOrange className="logo__orange">Chill Library</LogoOrange>
        </Logo>
        <Theme5 />
        <Theme6 />
      </ThemesContainer>
    </div>
  );
};

export default Themes;
