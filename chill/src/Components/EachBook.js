import React from "react";
import SideMenu from "./SideMenu";
import Header from "./Header";
import styled from "styled-components";
import EachReview from "./EachReview";
import { useState, useEffect } from "react";
import NewReview from "./NewReview";

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
const BookTag = styled.div`
  padding: 20px;
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  background-color: #fbe192;
  margin-top: 20px;
`;
const BookContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-left: 20px;
`;
const BookImg = styled.img`
  height: 250px;
  width: 150px;
  box-shadow: 3px 3px 6px grey;
`;
const BookTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: grey;
`;
const BookSummary = styled.div`
  color: grey;
  margin: 15px;
`;
const BookDetail = styled.div`
  color: grey;
`;
const BookInfo = styled.h4``;
const Btn = styled.div`
  margin: 15px auto;
  position: relative;
  text-decoration: none;
  border-radius: 50rem;
  padding: 0.3rem 0.6rem;
  color: #2c213b;
  background-color: #f93c10;
  box-shadow: 0px 3px 0 #1abea7;
  transition: all 0.1s ease-in-out;
  &:hover {
    bottom: -7px;
    box-shadow: 0px 0px 0 #000;
  }
  cursor: pointer;
`;

function Book() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [bookTitle, setbookTitle] = useState("怎麼吃");
  const [bookSummary, setBookSummary] = useState(
    "能夠慢下來、好好品嚐食物，就增加了生命的厚度。 【跟一行禪師過日常】怎麼吃 ■ 忙碌的現代人往往忘記日常生活中行、住、坐、臥是什麼滋味。本系列用不囉唆卻發人深省的簡短段落，讓人在紛擾世界中，隨時隨地，念念清明。全套5冊，完整收集，體會一行禪師的日常禪法。 ■ 一行禪師的方法非常直觀，從聆聽、感受下手，講的是一般人都能體會、理解的方法。尤其是被忙碌生活節奏拉著走的都市人，更能在一切回歸簡單的過程中，找到自己，碰觸生命的肌理，實實在在感受生活的喜悅。 ■ 繁體中文版佐以台灣知名插畫家王春子的作品，陪伴你重新體驗「吃」的單純與美好。 本書從禪法的角度重新定義什麼是吃，為什麼吃的時候充分覺察有其必要性。這一本扼要卻全面的吃飯指南，捨棄繁複囉唆的忠告，除了需明確掌握的重點，還啟發我們與飲食的各個層面建立愉快而永續的關係，包括種菜、採買食物、做菜、夾菜，甚至飯後的清理。提醒我們以正念進食不僅對自己有益，也能讓地球受惠。 《怎麼吃》是【跟一行禪師過日常】系列的第二本，提供簡單明瞭的指導，任何想要探索正念禪修的人都能深受啟發。書末的「飲食觀想」列出實際可行的步驟，讓你感受何謂「吃得滿足」。 *** 對一行禪師的禪法有興趣者，請洽： 亞洲應用佛學院（Asian Institute of Applied Buddhism） 以一行禪師及梅村承傳的應用佛學及修習中心 http://pvfhk.org/ 地址：蓮池寺 香港大嶼山昂坪村 電話：(852) 2985-5281"
  );
  const [bookAuthor, setBookAuthor] = useState("一行禪師");
  const [publisher, setPublisher] = useState("大塊文化出版股份有限公司");
  const [publishedDate, setPublishedDate] = useState("2015-10-01");
  const [categories, setCategories] = useState("#心裡總是卡卡的？");
  const [bookImage, setBookImage] = useState(
    "http://books.google.com/books/content?id=hHfHCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  );
  return (
    <Div>
      <SideMenu />
      <Content>
        <BookTag>
          {/* <BookImg> */}
          <BookImg src={bookImage} alt="" />
          {/* </BookImg> */}
          <BookContent>
            <BookTitle>{bookTitle}</BookTitle>
            <BookDetail>
              <BookInfo>作者：{bookAuthor}</BookInfo>
              <BookInfo>出版社：{publisher}</BookInfo>
              <BookInfo>出版日期：{publishedDate}</BookInfo>
              <BookInfo>去憂分類：{categories}</BookInfo>
            </BookDetail>
          </BookContent>
          <BookSummary>{bookSummary}</BookSummary>
          <EachReview />
          <Btn onClick={() => setButtonPopup(true)}>發表一篇去憂</Btn>
        </BookTag>
        <NewReview
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
        ></NewReview>
      </Content>
      <Header />
    </Div>
  );
}

export default Book;
