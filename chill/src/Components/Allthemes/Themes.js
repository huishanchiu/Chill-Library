import { useState, useEffect, React } from "react";
import styled from "styled-components";
import Header from "../common/Header";
import Loading from "../common/Loading";
import theme__1 from "../../images/theme__1.png";
import theme__2 from "../../images/theme__2.png";
import theme__3 from "../../images/theme__3.png";
import theme__4 from "../../images/theme__4.png";
import theme__5 from "../../images/theme__5.png";
import theme__6 from "../../images/theme__6.png";
import { GiClick } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  getTheme_1Books,
  getTheme_2Books,
  getTheme_3Books,
  getTheme_4Books,
  getTheme_5Books,
  getTheme_6Books,
} from "../../utils/firebaseFunction";

const ClickIcon = styled(GiClick)`
  padding-right: 10px;
  width: 30px;
  height: 100%;
`;

const Btn = styled(Link)`
  display: flex;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  margin-left: auto;
  border-radius: 50rem;
  padding: 0.6rem 0.6rem;
  color: #feae29;
  border: rgb(254, 239, 222) 1px solid;
  box-shadow: 0px 3px 0 rgb(254, 239, 222, 0.7);
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 0 #000;
  }
`;

const Div = styled.div`
  padding: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 90%;
  }
`;

const Sections = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  color: white;
  z-index: 1;
`;
const Section = styled.div`
  box-shadow: 1px 1px 1px 0 #feae29;
  z-index: 1;
  border-radius: 20px;
  background-color: rgba(44, 33, 59, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const BookAndTitle = styled.div`
  margin: 20px;
`;
const Book = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 640px) {
    justify-content: center;
  }
`;
const ThemeTag = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 1250px) {
    flex-direction: column;
  }
`;
const BookImg = styled.img`
  width: 15%;
  box-shadow: 2px 4px 8px 2px #323741;
  margin: 20px;
  @media (max-width: 1250px) {
    width: 25%;
  }
  @media (max-width: 780px) {
    width: 40%;
  }
  @media (max-width: 640px) {
    width: 70%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Img = styled.img`
  width: 35%;
  @media (max-width: 1250px) {
    width: 60%;
    align-self: center;
  }
  @media (max-width: 780px) {
    width: 80%;
  }
`;
const ContentDiv = styled.div`
  color: rgba(254, 239, 222, 0.9);
  font-size: 20px;
  line-height: 30px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 900;
  color: rgb(254, 239, 222);
`;
const HeaderDiv = styled.div`
  width: 20%;
  @media (max-width: 1250px) {
    display: none;
  }
`;

const Themes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookList1, setBookList1] = useState([]);
  const [bookList2, setBookList2] = useState([]);
  const [bookList3, setBookList3] = useState([]);
  const [bookList4, setBookList4] = useState([]);
  const [bookList5, setBookList5] = useState([]);
  const [bookList6, setBookList6] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getTheme_1Books(setBookList1);
    getTheme_2Books(setBookList2);
    getTheme_3Books(setBookList3);
    getTheme_4Books(setBookList4);
    getTheme_5Books(setBookList5);
    getTheme_6Books(setBookList6);
    setIsLoading(false);
  }, []);

  return (
    <Div>
      {isLoading ? <Loading /> : ""}
      <HeaderDiv>
        <Header />
      </HeaderDiv>
      <Sections>
        <Section>
          <ThemeTag>
            <Img src={theme__1} alt="" />
            <ContentDiv>
              <strong>
                「慢一點，好讓靈魂跟上來！」安頓自我第一步，啟動心靈連線。疫病時代，一個重新靠近、傾聽自己的最佳契機。
              </strong>
              <br />　
              放下手機，去看本書吧！翻翻自己喜愛的藏書，享受一個人靜靜閱讀的時光，其實是件非常享受的事情。相信你的書架上有幾本尚未打開閱讀的書，為自己泡杯茶或咖啡，打造一個非常悠閒的下午茶閱讀時光。即使是看漫畫、小說這樣的休閒讀物，也比拿著手機滑社群網站更有知識性！而且長時間盯著螢幕追劇、打電動，藍光對眼睛造成的傷害比閱讀來得嚴重。
              可以跟著書中的step by
              step做出令全家人感到幸福的甜點、或是照著王傑老師的溫柔筆觸，將映入眼簾的感動化為一張張的淡彩畫，相信這個提案可以讓你在家也有滿滿的能量！
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

          <Btn to="/theme/宅在家好發慌？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              <strong>
                認真工作的你，為什麼總是為錢所困？只有「讓錢為你工作」，才能實現財富自由！本書將讓你從一位勞動者，轉身成為資本家，透過財富的力量，讓自己擁有選擇的自由。
              </strong>
              <br />
              主動積極投資自己的人生：自己決定時間要如何分配，而不是根據別人的指示。檢視你要的生活與夢想，什麼是對你最重要的，然後決心花時間改變，就能擺脫現狀，成為自己想當的那種人。被動地投資金錢，這種不花腦筋、不花時間的投資法，表現得會比那些要收費替你管理資金的投資專家還好。最棒的是：人人都做得來。聽來簡單，為什麼說這是個祕密？因為大部分人都在做相反的事情：被動的投資人生、積極主動投資金錢。花了大把時間企圖戰勝市場，煩惱該買什麼、什麼時候買，什麼時候賣，隨時處於壓力過大的狀況，獲得得報酬卻不如損失的時間、健康與睡眠……。你一定得賺錢，但人生還有許多事情比股市更重要，要簡單、聰明而安全的投資，為人生而投資。
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

          <Btn to="/theme/錢錢去哪了？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <Img src={theme__3} alt="" />
            <ContentDiv>
              <strong>
                停下腳步，按下暫停鍵，跟久違的自己相遇！
                變動時代的日常喘息，忙碌身心的安頓練習。
                一個重新靠近自己，傾聽內在聲音的最佳時機。
              </strong>
              <br />
              我是誰？我在哪裡？為什麼哭泣？為什麼難過？未來會變得如何？人生也有「暫時卡住」的時候，找一處「解憂角落」，陪伴不順心的自己，讓身心安住。迷茫世代的安定學，獨處時刻的再看見──面對生活各種衝擊，社工與心理專家的觀點，重審視獨處時的安頓之道。於是發現：「原來，我還可以重新選擇！」接納自我是一條漫長的旅程，希望這本書如同置身浩淼大海中的小舟，願能適時給予一些安穩的力量，在波瀾之後，更堅定地前行。
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

          <Btn to="/theme/一個人好孤單？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              <strong>
                筆記抄滿紙，不及畫一張圖！ 秒懂重點 × 找出邏輯 × 瞬間溝通 ×
                引爆創意 沒想法OUT，好點子GET！
              </strong>
              <br />
              資訊爆量、網路社群媒體蓬勃發展的年代，不管你是職場人士、老師、學生、網紅或是實況主，在簡報、教學、報告、影音媒體的應用上，抓到重點並讓訊息視覺化呈現的技巧，是不可或缺的能力。塗鴉筆記術正是做視覺紀錄最佳的起點。麥克‧羅德是塗鴉筆記界教父級的人物，從事塗鴉筆記教學與推廣超過十年，他將自己多年來塗鴉筆記的技巧精華全部集結在本書中，並身體力行以手繪的方式，從零開始一步一步傳授如何使用塗鴉筆記消化龐雜資訊，精準轉化成有重點的圖像紀錄。羅德的技巧簡單、一看就上手，甚至也讓這本書成了當前許多從事視覺化簡報、圖像記錄工作者的啟蒙書。
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

          <Btn to="/theme/想不出好點子？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <Img src={theme__5} alt="" />
            <ContentDiv>
              <strong>
                我們都得了「覺得自己不夠好」這種病！ 你自卑，常覺得自己不完美；
                你沒自信，必須等一切到位再說； 你找藉口，各種理由一大堆……
                請問你還要讓這種負面想法寄生多久？
                否定自己，請到此為止；認識自己，從現在開始！
              </strong>
              <br />
              如果你真的「愛」自己，就應該把自己當成大人看待，停止表現得像個孩子。如果覺得自己不夠幸運，那麼一生至少有四十個機會，你抓住了幾個？如果覺得自己不夠優秀，是否你只是在「找正確答案」，而不是「找自己的路」。如果你是「完美主義者」，你有沒有想過是否「完美」才是痛苦的根源？不是看輕自己，也不必過度自戀。本來只要認識自己，定位自己，任何環境或困難都無法左右你的決心。
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

          <Btn to="/theme/如何上火箭？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
        <Section>
          <ThemeTag>
            <ContentDiv>
              <strong>
                這世界變得愈來愈快， 但總有些文字能撫平內心的皺摺，
                療癒困難的心， 願你能學會「和自己相處」， 從「我」了解「我們」，
                看見自己和別人身上的光。
              </strong>
              <br />
              想要自己更好，你得先疼惜自己。你要充當「慈母」的角色，安撫自己內心焦躁的負面聲音。感受到壓力時，停下來面對這個情緒，不要直接躲入慣性的逃避行為。透過了解你的內在小孩，學會既維持自己的獨特個性，又修正自己不理想的行為，當我們能自處，也能與別人好好相處時，那些原本擋在路上的絆腳石，將會成為向上爬的台階。放慢你的心，打開這本書，你會更好的。「每個人都可以讓自己更好，你需要的不是時間，而是「我要，就能」的信念。這不是狂妄之言，而是透過日常的小勝利累積來的天然自信。」
            </ContentDiv>
            <Img src={theme__6} alt="" />
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

          <Btn to="/theme/心裡總是卡卡的？">
            進入主題
            <ClickIcon />
          </Btn>
        </Section>
      </Sections>
    </Div>
  );
};

export default Themes;
