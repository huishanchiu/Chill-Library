import React from "react";
import styled from "styled-components";
import Header from "./Header";
import ThemeHeader from "./ThemesHeader";
import theme__1 from "../images/theme__1.png";
import theme__2 from "../images/theme__2.png";
import theme__3 from "../images/theme__3.png";
import theme__4 from "../images/theme__4.png";
import theme__5 from "../images/theme__5.png";
import theme__6 from "../images/theme__6.png";
import logo from "../images/ch.png";
import { IoIosCompass } from "react-icons/io";
import { GiClick } from "react-icons/gi";
import { IoMdBeer } from "react-icons/io";
import { RiBook3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import background from "../images/image.png";
import lightPng from "../images/yellowLight.png";

const ClickIcon = styled(GiClick)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;

const Btn = styled(Link)`
  text-decoration: none;
  text-align: center;
  width: 70px;
  height: 20px;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 50rem;
  padding: 0.3rem 0.3rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 0 #000;
  }
`;

const Div = styled.div`
  background-repeat: repeat;
  /* background-size: contain; */
  /* background-color: #2c213b;
  background-color: #f8f3f2; */
  max-width: 1920px;
`;

const Sections = styled.div`
  width: 140vmin;
  color: white;
  margin: 30px;
  z-index: 1;
`;
const Section = styled.div`
  box-shadow: 1px 1px 1px 0 #feae29;
  z-index: 1;
  border-radius: 20px;
  position: relative;
  /* background-color: rgba(50, 55, 65, 0.6); */
  background-color: rgba(44, 33, 59, 0.4);
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 30px;
`;
const BookAndTitle = styled.div`
  /* background-color: rgba(255, 255, 255, 0.5); */
  margin: 20px;
`;
const Book = styled.div`
  display: flex;
  margin: 0 10px;
`;
const BookTag = styled.div``;
const ThemeTag = styled.div`
  display: flex;
`;
const BookImg = styled.img`
  height: 180px;
  box-shadow: 2px 4px 8px 2px #323741;
  margin: 20px;
`;
const Img = styled.img`
  width: 40vmin;
  height: 100%;
`;
const ContentDiv = styled.div`
  color: rgba(254, 239, 222, 0.9);
  font-size: 18px;
  line-height: 26px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: rgb(254, 239, 222);
`;

const Themes = () => {
  const [bookList1, setBookList1] = useState([]);
  const [bookList2, setBookList2] = useState([]);
  const [bookList3, setBookList3] = useState([]);
  const [bookList4, setBookList4] = useState([]);
  const [bookList5, setBookList5] = useState([]);
  const [bookList6, setBookList6] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `宅在家好發慌？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList1(list);
      });
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `錢錢去哪了？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList2(list);
      });
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `一個人好孤單？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList3(list);
      });
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `想不出好點子？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList4(list);
      });
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `如何上火箭？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList5(list);
      });
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("categories", "array-contains", `心裡總是卡卡的？`)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setBookList6(list);
      });
  }, []);

  let { path, url } = useRouteMatch();
  return (
    <Div>
      <ThemeHeader />

      <Sections>
        <Section>
          <ThemeTag>
            <Img src={theme__1} alt="" />
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。
            </ContentDiv>
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長解悶推薦】</Title>
            <Book>
              {bookList1.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Btn to="/宅在家好發慌？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。
            </ContentDiv>
            <Img src={theme__2} alt="" />
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長徹夜未眠】</Title>
            <Book>
              {bookList2.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Btn to="/錢錢去哪了？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <Img src={theme__3} alt="" />
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。
            </ContentDiv>
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長獨閱樂】</Title>
            <Book>
              {bookList3.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Btn to="/一個人好孤單？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。
            </ContentDiv>
            <Img src={theme__4} alt="" />
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長靈感奔馳】</Title>
            <Book>
              {bookList4.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Btn to="/想不出好點子？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <Img src={theme__5} alt="" />
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。{" "}
            </ContentDiv>
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長衝破天際】</Title>
            <Book>
              {bookList5.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Btn to="/如何上火箭？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              123場生設系大品師處國要起形始名其朋，本育神自媽，而才而的量不由，機曾把部的當心。
              全黨二金光不明，才具語天細資過……心告行裡是源，們系解兒世要回易十政，的甚比媽：沒風角月正來問度比汽方加地更火來設數單只及這低當想長身光輪能氣可得什，自未汽一和這讀的爭從多，能平流，有起有：灣改生國起為師、安共康會體就治，分要美林而是看境起在苦時他主外，成著一不定活我沒而格並後什器環標一：類心好眾治夜林的急展來題你成制實大麼的歡動已來家提是叫拿間年居為飯。
              頭國個時媽，特始人獎當上緊完而，要政良院星原，們研能……性想獨濟式有量地二出，有例那制著找得一人市日工濟特我文導起汽果史之。
              心因色受十去常，信之術，解得他已心。
            </ContentDiv>
          </ThemeTag>
          <BookAndTitle>
            <Title>【館長去憂推薦】</Title>
            <Book>
              {bookList6.map((item) => {
                return (
                  <BookImg
                    key={item.id}
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                    alt=""
                  />
                );
              })}
            </Book>
          </BookAndTitle>

          <Img src={theme__6} alt="" />
          <Btn to="/心裡總是卡卡的？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
      </Sections>
    </Div>
  );
};

export default Themes;
