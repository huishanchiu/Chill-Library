import React from "react";
import styled from "styled-components";
import "firebase/storage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../utils/firebase";
import { Link, useRouteMatch } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Collection from "./Mybooks/Collection";
import Review from "./Mybooks/Review";
import Follow from "./Mybooks/Follow";
import BookState from "./Mybooks/BookState";
import bookCover from "../images/021.jpeg";
import { FiUpload } from "react-icons/fi";
import { VscSaveAll } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import MySetting from "./Mybooks/MySetting";

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
const SaveIcon = styled(VscSaveAll)`
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  width: 25px;
  height: 100%;
  color: #f1faf7;
`;
const UploadIcon = styled(FiUpload)`
  padding: 5px;
  cursor: pointer;
  width: 25px;
  height: 100%;
  color: #f1faf7;
`;
const Add = styled.div`
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 20px;
  width: 60px;
  height: 30px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 800px;
  @media (max-width: 1200px) {
    max-width: 650px;
  }
  @media (max-width: 900px) {
  }
`;
const QuoteTag = styled.div`
  background-size: cover;
  color: #1abea7;
  font-size: 44px;
  font-weight: 900;
  padding: 20px;
  width: 800px;
  height: 200px;
  position: relative;
`;

const MyInfo = styled.div`
  width: 800px;
  height: 100px;
  /* outline: yellow solid; */
  position: relative;
`;
const MyInfoDiv = styled.div`
  /* outline: red solid; */
  position: absolute;
  left: 0px;
  top: 50px;
`;
const MyName = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: tomato;
  margin: 0 10px;
`;
const MyImage = styled.img`
  position: absolute;
  bottom: -45px;
  left: 30px;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 70px;
  margin-right: 10px;
`;
const MyIntro = styled.div`
  color: #999c9d;
  padding: 5px;

  font-size: 18px;
`;
const MyEmail = styled.div`
  color: #999c9d;
  padding: 5px;
  margin-bottom: 5px;

  font-size: 18px;
`;
const TabTag = styled.div`
  /* outline: blue solid; */
  display: flex;
  margin-top: 60px;
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
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const [follows, setFollows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [activeItem, setActiveItem] = useState("collection");
  const [file, setFile] = useState(null);
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
  console.log(follows);

  console.log(userId.userid);
  useEffect(() => {
    if (userId.userid) {
      userRef.onSnapshot((doc) => {
        setUserInfo(
          {
            displayName: doc.data().userName,
            email: doc.data().email,
            photoURL: doc.data().URL,
            uid: doc.data().uid,
          },
          { merge: true }
        );
      });
    }
  }, []);
  console.log(userInfo);

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
  console.log(follows);
  console.log(userInfo);
  const perviewUrl = file ? URL.createObjectURL(file) : follows.imageUrl;
  return (
    <BrowserRouter>
      {Object.keys(userInfo) ? (
        <Content>
          {follows.imageUrl ? (
            <QuoteTag
              style={{
                backgroundImage:
                  `url(${follows.imageUrl})` || `url(${perviewUrl})`,
              }}
            >
              {reviews.length > 0 ? reviews[quoteIndex].quote : ""}
              {userId.userid === firebase.auth().currentUser.uid ? (
                <Icon onClick={() => setOpen(true)}>
                  <SetIcon />
                </Icon>
              ) : (
                ""
              )}
              {open && <MySetting userInfo={follows} close={setOpen} />}
              <MyImage src={userInfo.photoURL} alt="" />
            </QuoteTag>
          ) : (
            <>
              <QuoteTag
                style={{
                  backgroundImage: `url(${perviewUrl})`,
                }}
              >
                {reviews.length > 0 ? reviews[quoteIndex].quote : ""}

                <MyImage src={userInfo.photoURL} alt="" />
              </QuoteTag>
            </>
          )}

          <MyInfo>
            <MyInfoDiv>
              <MyName>{userInfo.displayName}</MyName>
              <MyEmail>@{userInfo.email}</MyEmail>
              <MyIntro>{follows.selfInfo}</MyIntro>

              {uid
                ? userId.userid !== uid && (
                    <FollowBtn onClick={toggleFollowed}>
                      {isFollowed ? "Unfollow" : "Follow"}
                    </FollowBtn>
                  )
                : ""}
            </MyInfoDiv>
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
            <Route exact path={`${path}/collection`} component={Collection} />
            <Route exact path={`${path}/review`} component={Review} />
            <Route exact path={`${path}/follow`} component={Follow} />
            <Route
              exact
              path={`${path}/collection/:id`}
              component={BookState}
            />
          </Switch>
        </Content>
      ) : (
        <MyInfo>尚未登入喔！</MyInfo>
      )}
    </BrowserRouter>
  );
};

export default Mybooks;
