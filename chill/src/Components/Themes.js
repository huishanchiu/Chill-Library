import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SideMenu from "./SideMenu";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import logo from "../images/ch.png";
import { IoIosCompass } from "react-icons/io";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
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
const Btn = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  position: relative;
  /* text-decoration: none; */
  border-radius: 50rem;
  padding: 0.3rem 0.3rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
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
const LinkTag = styled.div`
  display: flex;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* width: 100%;
  height: 100%; */
  background-color: #2c213b;
  max-width: 1440px;
`;

const ThemesContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 350px 350px;
  grid-template-rows: 33vh 33vh 33vh;

  @media (max-width: 1200px) {
    grid-template-columns: 300px 300px 300px;
    grid-template-rows: 300px 300px 300px;
  }
  @media (max-width: 900px) {
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 250px 250px 250px;
  }
`;

const ThemesItem = styled(Link)`
  /* background-size: contain; */
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
`;
const Theme1 = styled(ThemesItem)`
  background-image: url(${theme__1});
  left: -80px;
`;
const Theme2 = styled(ThemesItem)`
  background-image: url(${theme__2});
  bottom: 30px;
`;
const Theme3 = styled(ThemesItem)`
  background-image: url(${theme__3});
  top: 30px;
  right: -80px;
`;
const Theme4 = styled(ThemesItem)`
  background-image: url(${theme__4});
  top: 100px;
`;
const Theme5 = styled(ThemesItem)`
  background-image: url(${theme__5});
  top: 250px;
`;
const Theme6 = styled(ThemesItem)`
  background-image: url(${theme__6});
  top: 80px;
  right: -100px;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 250px;
  width: 300px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
`;
const Logo = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  height: 100px;
  width: 300px;
  background-image: url(${logo});
  /* background-size: 350px; */
  /* display: block; */
  /* margin: 0; */
`;
const LogoOrange = styled.div`
  @font-face {
    font-family: "Nunito";
    src: url("../src/utils/Nunito-Italic.ttf");
  }
  font-family: "Nunito";
  white-space: nowrap;
  position: relative;
  bottom: 15px;
  /* display: block; */
  margin: 0 auto;
  font-size: 7vmin;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
`;

const Themes = () => {
  let { path, url } = useRouteMatch();
  return (
    <Div>
      <Header />

      <ThemesContainer>
        <Theme1 to={`${url}/theme1`} />
        <Theme2 to={`${url}/theme2`} />
        <Theme3 to={`${url}/theme3`} />
        <Theme4 to={`${url}/theme4`} />
        <Theme5 to={`${url}/theme5`} />
        <Theme6 to={`${url}/theme6`} />
      </ThemesContainer>
      <LogoContainer>
        {/* <Logo /> */}
        <LogoOrange>Chill Library</LogoOrange>
        <LinkTag>
          <NavLink to="/">
            <Btn>
              <HomeIcon />
            </Btn>
          </NavLink>
          <NavLink to="/news">
            <Btn>
              <FindIcon />
            </Btn>
          </NavLink>
          <NavLink to="/themes">
            <Btn>
              <ThemeIcon />
            </Btn>
          </NavLink>
          <NavLink to="/mybooks">
            <Btn>
              <BookIcon />
            </Btn>
          </NavLink>
        </LinkTag>
      </LogoContainer>
    </Div>
  );
};

export default Themes;
