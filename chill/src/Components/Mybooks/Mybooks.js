import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import "firebase/storage";
import { useParams } from "react-router-dom";
import Collection from "./Collection";
import Review from "./Review";
import Follow from "./Follow";
import BookState from "./BookState";
import { FiSettings } from "react-icons/fi";
import MySetting from "./MySetting";
import banner from "../../images/021.jpeg";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import {
  Link,
  useRouteMatch,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import {
  getAuthorInfo,
  getReviews,
  UnFollowOthers,
  followOthers,
} from "../../utils/firebaseFunction";

const SetIcon = styled(FiSettings)`
  cursor: pointer;
  color: #f1faf7;
  width: 20px;
`;
const Icon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(81, 92, 105, 0.7);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 2px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 50%;
  @media (max-width: 1250px) {
    width: 70%;
  }
  @media (max-width: 875px) {
    width: 100%;
  }
`;
const QuoteTag = styled.div`
  background-size: cover;
  color: #0d6663;
  font-size: 37px;
  font-weight: 900;
  padding: 20px;
  width: 100%;
  height: 20vmin;
  position: relative;
`;

const MyInfo = styled.div`
  z-index: 3;
  display: flex;
  justify-content: space-between;
  margin-top: -30px;
  margin-left: 30px;
  width: 100%;
`;
const MyInfoDiv = styled.div``;
const MyName = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: tomato;
  padding-left: 5px;
`;
const MyImage = styled.img`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 70px;
`;
const MyIntro = styled.div`
  color: #999c9d;
  padding-left: 5px;
  font-size: 18px;
`;
const MyEmail = styled.div`
  color: #999c9d;
  padding-left: 5px;
  font-size: 18px;
`;
const TabTag = styled.div`
  width: 50vmin;
  display: flex;
  justify-content: space-around;
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
const FollowBtn = styled.div`
  align-self: flex-start;
  background-color: #0d6663;
  margin: 20px;
  padding: 10px 20px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

const Mybooks = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [follows, setFollows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [file, setFile] = useState(null);
  const { userId } = useParams();
  const quoteIndex = getRandom(reviews.length);

  useEffect(() => {
    getReviews(userId, setReviews, setActiveItem, setIsLoading);
    getAuthorInfo(userId, setFollows);
  }, [userId]);

  function toggleFollowed() {
    if (userId !== currentUser.uid) {
      if (isFollowed) {
        UnFollowOthers(userId, currentUser.uid);
        Swal.fire({
          text: "已取消追蹤",
          confirmButtonColor: "rgba(15, 101, 98, 0.8)",
        });
      } else {
        followOthers(userId, currentUser.uid);
        Swal.fire({
          text: "已追蹤",
          confirmButtonColor: "rgba(15, 101, 98, 0.8)",
        });
      }
    }
  }

  const isFollowed = follows.followBy?.includes(currentUser.uid);
  const active = {
    background: "#F1FAF7",
    color: "#0D6663",
  };

  let { path, url } = useRouteMatch();
  const perviewUrl = file
    ? URL.createObjectURL(file)
    : "https://store-images.s-microsoft.com/image/apps.30252.13581223868996394.55d0cdc7-62a9-49a1-baad-f12edad03432.c8c1dee1-8fa1-413e-989b-2d27e219fa4b?w=672&h=378&q=80&mode=letterbox&background=%23FFE4E4E4&format=jpg";
  return (
    <>
      {currentUser ? (
        <BrowserRouter>
          {Object.keys(follows) ? (
            <Content>
              {follows.imageUrl ? (
                <QuoteTag
                  style={{
                    backgroundImage:
                      `url(${follows.imageUrl})` || `url(${banner})`,
                  }}
                >
                  {reviews.length > 0 ? reviews[quoteIndex].quote : ""}

                  {userId === currentUser.uid ? (
                    <Icon onClick={() => setOpen(true)}>
                      <SetIcon />
                    </Icon>
                  ) : (
                    ""
                  )}
                  {open && <MySetting userInfo={follows} close={setOpen} />}
                </QuoteTag>
              ) : (
                <>
                  <QuoteTag
                    style={{
                      backgroundImage: `url(${perviewUrl})`,
                    }}
                  >
                    {reviews.length > 0 ? reviews[quoteIndex].quote : ""}
                    {userId === currentUser.uid ? (
                      <Icon onClick={() => setOpen(true)}>
                        <SetIcon />
                      </Icon>
                    ) : (
                      ""
                    )}
                    {open && <MySetting userInfo={follows} close={setOpen} />}
                  </QuoteTag>
                </>
              )}

              <MyInfo>
                <MyInfoDiv>
                  <MyImage src={follows.URL} alt="" />
                  <MyName>{follows.userName}</MyName>
                  <MyEmail>{follows.email}</MyEmail>
                  <MyIntro>{follows.selfInfo}</MyIntro>
                </MyInfoDiv>
                {currentUser.uid
                  ? userId !== currentUser.uid && (
                      <FollowBtn onClick={toggleFollowed}>
                        {isFollowed ? "取消追蹤" : "追蹤"}
                      </FollowBtn>
                    )
                  : ""}
              </MyInfo>
              <TabTag>
                <Tab
                  onClick={() => {
                    setActiveItem("collection");
                  }}
                  style={activeItem === "collection" ? active : []}
                  to={`${url}/collection`}
                >
                  收藏
                </Tab>
                <Tab
                  onClick={() => {
                    setActiveItem("review");
                  }}
                  style={activeItem === "review" ? active : []}
                  to={`${url}/review`}
                >
                  去憂
                </Tab>
                <Tab
                  onClick={() => {
                    setActiveItem("follow");
                  }}
                  style={activeItem === "follow" ? active : []}
                  to={`${url}/follow`}
                >
                  追蹤
                </Tab>
              </TabTag>
              <Switch>
                <Route exact path={`${path}/collection`}>
                  <Collection setActiveItem={setActiveItem} />
                </Route>
                <Route exact path={`${path}/review`}>
                  <Review setActiveItem={setActiveItem} />
                </Route>
                <Route exact path={`${path}/follow`}>
                  <Follow setActiveItem={setActiveItem} />
                </Route>
                <Route
                  exact
                  path={`${path}/collection/:bookName`}
                  component={BookState}
                />
              </Switch>
              {isLoading ? <Loading /> : ""}
            </Content>
          ) : (
            <MyInfo>尚未登入喔！</MyInfo>
          )}
        </BrowserRouter>
      ) : (
        ""
      )}
    </>
  );
};

export default Mybooks;
