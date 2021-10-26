import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import c__3 from "../images/c3.png";

import { useRouteMatch } from "react-router-dom";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #2c213b;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* outline: blue solid 3px; */
  padding: 20px;
  width: 650px;
  @media (max-width: 1200px) {
    max-width: 650px;
  }
  @media (max-width: 900px) {
  }
`;
const Themes = styled(Link)`
  display: flex;
`;
const Img = styled.img`
  margin: 20px auto;
  border-radius: 15px;
  width: 600px;
`;
const ImgTheme = styled(Img)`
  width: 500px;
`;
const BookTag = styled(Link)`
  padding: 20px;
  text-decoration: none;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100% 100%;
  background-color: #fbe192;
  margin-top: 20px;
  height: 200px;
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookImg = styled.img`
  outline: grey solid 1px;
  /* margin: auto 30px; */
  height: 150px;
  width: 100px;
`;
const BookName = styled.div`
  /* margin: 10px 20px; */
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
`;
const Side = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #f6e7db; */
`;
const SideBook = styled.div`
  color: white;
  /* width: 100%; */
  padding: 20px;
`;

const SideBookTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  width: 250px;
  height: 280px;
`;
const SideBookImg = styled.img`
  outline: grey solid 1px;
  margin-top: 30px;
  height: 150px;
  width: 100px;
`;
const SideBookName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: grey;
`;

const EachTheme = () => {
  let { path, url } = useRouteMatch();
  return (
    <Div>
      <Main>
        <SideMenu />
        <Content>
          <Themes to={`${url}/theme1`}>
            <Img src={c__3} alt="" />
          </Themes>
          <ImgTheme src={theme__1} alt="" />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
          reiciendis recusandae ipsa, cum magnam impedit! Assumenda totam aut id
          suscipit autem temporibus doloremque commodi, corporis aperiam
          cupiditate tenetur sint adipisci. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Provident reiciendis recusandae ipsa,
          cum magnam impedit! Assumenda totam aut id suscipit autem temporibus
          doloremque commodi, corporis aperiam cupiditate tenetur sint adipisci.
          <BookTag to={`/bookid`}>
            <BookImg />
            <BookContent>
              <BookName>第一次當工程師就上手！</BookName>
              <BookSummary>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Provident reiciendis recusandae ipsa, cum magnam impedit!
                Assumenda totam aut id suscipit autem te
              </BookSummary>
            </BookContent>
          </BookTag>
        </Content>
        <Side>
          <Header />
          <SideBook>
            #來看看其他去憂
            <SideBookTag>
              <SideBookImg />
              <SideBookName>第一次當工程師就上手！</SideBookName>
            </SideBookTag>
          </SideBook>
        </Side>
      </Main>
    </Div>
  );
};

export default EachTheme;
