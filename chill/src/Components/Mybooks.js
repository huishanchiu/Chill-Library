import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
// import firebase from "../utils/firebase";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Collection from "./Mybooks/Collection";
import Review from "./Mybooks/Review";
import Quote from "./Mybooks/Quote";
import Follow from "./Mybooks/Follow";

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
  width: 70px;
  height: 40px;
  border-radius: 5rem;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #909090;
  margin: 0 20px 20px 0;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #e1e1de;
  }
`;

const Mybooks = () => {
  const [activeItem, setActiveItem] = useState("collection");
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState(
    "錢錢沒有變成你喜歡的樣子，是真的不見惹！"
  );
  // function getRandom(x) {
  //   return Math.floor(Math.random() * x);
  // }
  // getRandom(3); //會回傳0~2之間的隨機數字
  // getRandom(5); //會回傳0~4之間的隨機數字
  const [quoteProvenance, setQuoteProvenance] = useState("每天來點負能量");
  const active = {
    background: "#F1FAF7",
    color: "#0D6663",
    borderRadius: "20px",
    cursor: "pointer",
  };
  console.log(firebase.auth().currentUser.displayName);
  useEffect(() => {
    let isUnmount = false;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!isUnmount) {
        setUser(currentUser);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);
  // useEffect(() => {
  //   let isUnmount = false;
  //   firebase
  //     .firestore()
  //     .collection("reviews")
  //     .where("author.uid", "==", firebase.auth().currentUser.uid)
  //     .get()
  //     .then((collectionSnapshot) => {
  //       if (!isUnmount) {
  //         const list = [];
  //         collectionSnapshot.forEach((doc) => {
  //           list.push(doc.data());
  //           setQuotes(list);
  //         });
  //       }

  //       // setQuotes("");
  //     });
  //   return () => {
  //     isUnmount = true;
  //   };
  // }, []);

  console.log(quotes);
  let { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      {user ? (
        <Content>
          <QuoteTag>
            <Quotes>"{quote}"</Quotes>
            {/* <QuoteProvenance>{bookName}</QuoteProvenance> */}
          </QuoteTag>

          <MyInfo>
            <MyImage src={user.photoURL} alt="" />
            <MyName>{user.displayName}</MyName>
            的去憂書櫃
          </MyInfo>
          <TabTag>
            <Tab
              // active={activeItem === "collection"}
              onClick={() => {
                setActiveItem("collection");
              }}
              style={activeItem === "collection" ? active : []}
              to={`${url}/collection`}
            >
              收藏
            </Tab>
            <Tab
              // active={activeItem === "review"}
              onClick={() => {
                setActiveItem("review");
              }}
              style={activeItem === "review" ? active : []}
              to={`${url}/review`}
            >
              去憂
            </Tab>
            <Tab
              // active={activeItem === ""}
              onClick={() => {
                setActiveItem("follow");
              }}
              style={activeItem === "follow" ? active : []}
              to={`${url}/follow`}
            >
              追蹤
            </Tab>
            <Tab
              onClick={() => {
                setActiveItem("quote");
              }}
              style={activeItem === "quote" ? active : []}
              to={`${url}/quote`}
            >
              Quote
            </Tab>
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
    </BrowserRouter>
  );
};

export default Mybooks;
