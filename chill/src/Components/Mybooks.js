import React from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import Header from "./Header";
import { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Collection from "./Mybooks/Collection";
import Review from "./Mybooks/Review";
import Quote from "./Mybooks/Quote";
import Follow from "./Mybooks/Follow";

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
  /* position: relative; */
  /* display: flex; */
`;
const Quotes = styled.div`
  font-size: 44px;
  font-weight: 900;
`;
const QuoteProvenance = styled.p`
  font-size: 20px;
  margin: auto;
  /* position: absolute;
  right: 0; */
`;
const MyInfo = styled.div`
  display: flex;
  margin: 100px 0 50px 0;
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
const TabTag = styled.div`
  display: flex;
`;
const Tab = styled(Link)`
  background-color: #e1e1de;
  width: 70px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #909090;
  margin: 0 20px 20px 0;
  cursor: pointer;
  text-decoration: none;
`;

const Mybooks = () => {
  const [user, setUser] = useState(null);

  const [quote, setQuote] = useState(
    "錢錢沒有變成你喜歡的樣子，是真的不見惹！"
  );
  const [quoteProvenance, setQuoteProvenance] = useState("每天來點負能量");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  console.log(user);
  let { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      <Div>
        <SideMenu />
        {user ? (
          <Content>
            <QuoteTag>
              <Quotes>"{quote}"</Quotes>
              <QuoteProvenance>{quoteProvenance}</QuoteProvenance>
            </QuoteTag>
            <MyInfo>
              <MyImage src={user.photoURL} alt="" />
              <MyName>{user.displayName}</MyName>
              的去憂書櫃
            </MyInfo>

            <TabTag>
              <Tab to={`${url}/collection`}>收藏</Tab>
              <Tab to={`${url}/review`}>去憂</Tab>
              <Tab to={`${url}/follow`}>追蹤</Tab>
              <Tab to={`${url}/quote`}>Quote</Tab>
            </TabTag>

            <Switch>
              <Route exact path={`${path}/collection`} component={Collection} />
              <Route exact path={`${path}/review`} component={Review} />
              <Route exact path={`${path}/follow`} component={Follow} />
              <Route exact path={`${path}/quote`} component={Quote} />
            </Switch>
          </Content>
        ) : (
          <MyInfo>尚未登入喔！</MyInfo>
        )}

        <Header />
      </Div>
    </BrowserRouter>
  );
};

export default Mybooks;
