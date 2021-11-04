import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Collection from "./Mybooks/Collection";
import Review from "./Mybooks/Review";
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
  color: #1abea7;
  font-size: 44px;
  font-weight: 900;
`;

const MyInfo = styled.div`
  display: flex;
  margin-top: 60px;
  font-size: 30px;
  align-items: center;
`;
const MyInfoDiv = styled.div`
  display: flex;
  align-items: center;
  line-height: 20px;
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
const MyEmail = styled.div`
  color: #f1faf7;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 18px;
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
const FollowBtn = styled.div`
  background-color: #0d6663;
  margin: 20px;
  width: 60px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

const Mybooks = () => {
  const [uid, setUid] = useState("");
  const [follows, setFollows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [activeItem, setActiveItem] = useState("collection");
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState(null);
  let userId = useParams();
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(userId.userid);
  // console.log(userRef);
  // console.log(firebase.auth().currentUser.uid);

  useEffect(() => {
    setUid(firebase.auth().currentUser?.uid);
  }, []);
  const quoteIndex = getRandom(reviews.length);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId.userid)
      .onSnapshot((docSnapshot) => {
        setFollows(docSnapshot.data());
      });
  }, []);

  useEffect(() => {
    if (user !== "") {
      db.collection("reviews")
        .where("author.uid", "==", userId.userid)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            const id = docSnapshot.id;
            return { ...docSnapshot.data(), id };
          });
          setReviews(data);
        });
    }
  }, []);
  console.log(reviews);
  function toggleFollowed() {
    if (userId.userid !== uid) {
      if (isFollowed) {
        firebase
          .firestore()
          .collection("users")
          .doc(userId.userid)
          .update({
            followBy: firebase.firestore.FieldValue.arrayRemove(uid),
          });
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(userId.userid)
          .update({
            followBy: firebase.firestore.FieldValue.arrayUnion(uid),
          });
      }
    }
  }

  const isFollowed = follows.followBy?.includes(
    firebase.auth().currentUser.uid
  );
  console.log(isFollowed);

  console.log(userId.userid);
  useEffect(() => {
    if (userId.userid) {
      console.log(typeof userId.userid);
      userRef.get().then((doc) => {
        console.log(doc.data());
        setUserInfo({
          displayName: doc.data().userName,
          email: doc.data().email,
          photoURL: doc.data().URL,
          uid: doc.data().uid,
        });
      });
    }
  }, []);

  const active = {
    background: "#F1FAF7",
    color: "#0D6663",
    borderRadius: "20px",
    cursor: "pointer",
  };

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

  let { path, url } = useRouteMatch();

  return (
    <BrowserRouter>
      {Object.keys(userInfo) ? (
        <Content>
          <QuoteTag>
            {reviews.length > 0 ? reviews[quoteIndex].quote : ""}
          </QuoteTag>

          <MyInfo>
            <MyImage src={userInfo.photoURL} alt="" />
            <MyName>{userInfo.displayName}</MyName>
            的去憂書櫃
          </MyInfo>
          <MyInfoDiv>
            <MyEmail>{userInfo.email}</MyEmail>
            {uid
              ? userId.userid !== uid && (
                  <FollowBtn onClick={toggleFollowed}>
                    {isFollowed ? "Unfollow" : "Follow"}
                  </FollowBtn>
                )
              : ""}
          </MyInfoDiv>

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
            {/* <Tab
              onClick={() => {
                setActiveItem("quote");
              }}
              style={activeItem === "quote" ? active : []}
              to={`${url}/quote`}
            >
              Quote
            </Tab> */}
          </TabTag>
          <Switch>
            <Route exact path={`${path}/collection`} component={Collection} />
            <Route exact path={`${path}/review`} component={Review} />
            <Route exact path={`${path}/follow`} component={Follow} />
            {/* <Route exact path={`${path}/quote`} component={Quote} /> */}
          </Switch>
        </Content>
      ) : (
        <MyInfo>尚未登入喔！</MyInfo>
      )}
    </BrowserRouter>
  );
};

export default Mybooks;
