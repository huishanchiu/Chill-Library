import React from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import Header from "./Header";
import { useState, useEffect } from "react";
import firebase from "../utils/firebase";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #2c213b;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 650px;
  @media (max-width: 1200px) {
    max-width: 650px;
  }
  @media (max-width: 900px) {
  }
`;
const QuoteTag = styled.div`
  position: relative;
  /* display: flex; */
`;
const Quote = styled.div`
  font-size: 44px;
  font-weight: 900;
`;
const QuoteProvenance = styled.p`
  font-size: 20px;
  margin: auto;
  position: absolute;
  right: 0;
`;
const MyInfo = styled.div`
  display: flex;
  margin: 100px 0;
  font-size: 30px;
  align-items: center;
`;
const MyName = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: tomato;
  margin: 0 10px;
`;
const MyImage = styled.img`
  width: 70px;
  background-color: white;
  border-radius: 50px;
  margin-right: 10px;
`;

const Mybooks = () => {
  const [quote, setQuote] = useState(
    "錢錢沒有變成你喜歡的樣子，是真的不見惹！"
  );
  const [quoteProvenance, setQuoteProvenance] = useState("每天來點負能量");
  const user = firebase.auth().currentUser;

  return (
    <Div>
      <SideMenu />
      <Content>
        <QuoteTag>
          <Quote>"{quote}"</Quote>
          <QuoteProvenance>{quoteProvenance}</QuoteProvenance>
        </QuoteTag>
        {user ? (
          <MyInfo>
            <MyImage src={user.photoURL} alt="" />
            <MyName>{user.displayName}</MyName>
            的去憂書櫃
          </MyInfo>
        ) : (
          ""
        )}
      </Content>
      <Header />
    </Div>
  );
};

export default Mybooks;
