import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import firebase from "../utils/firebase";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Img = styled.img`
  width: 50px;
  background-color: white;
  border-radius: 50px;
  margin-right: 10px;
`;
const Sliders = styled(Slider)`
  margin: auto;
  width: 700px;
`;
const Side = styled.div`
  outline: red solid;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 50px;
`;

const SideBookTag = styled(Link)`
  outline: blue solid;
  margin: 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(241, 250, 247, 0.5);
  width: 250px;
`;
const SideBookImg = styled.img`
  margin-top: 30px;
  width: 100px;
`;
const SideBookName = styled.div`
  background-color: #f1faf7;
  font-size: 20px;
  font-weight: 500;
  color: #0d6663;
`;
function getRandom(x) {
  return Math.floor(Math.random() * x);
}

function SlideReviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  const [user, setUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const reviewIndex = getRandom(reviews.length);
  const allReviewIndex = getRandom(allReviews.length);
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

  useEffect(() => {
    const db = firebase.firestore();
    user &&
      db
        .collection("reviews")
        .where("author.uid", "!=", user.uid)
        .onSnapshot((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((docSnapshot) => {
            return { ...docSnapshot.data() };
          });
          setReviews(data);
        });
  }, [user]);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("reviews").onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      setAllReviews(data);
    });
  }, []);
  console.log(allReviews);

  return (
    <div>
      <Side>
        #來看看其他去憂
        {reviews.length > 0 ? (
          <>
            <SideBookTag to={`/book/${reviews[reviewIndex].bookName}`}>
              <SideBookImg />
              <SideBookName>{reviews[reviewIndex].bookName}</SideBookName>
              <SideBookImg
                src={`https://books.google.com/books/publisher/content/images/frontcover/${reviews[reviewIndex].id}?fife=w400-h600`}
                alt=""
              />
              <Img src={reviews[reviewIndex].author.photoURL} alt="" />
              {reviews[reviewIndex].author.displayName}
              説：{reviews[reviewIndex].quote}
            </SideBookTag>
            {reviewIndex + 1 < reviews.length && (
              <SideBookTag to={`/book/${reviews[reviewIndex + 1].bookName}`}>
                <SideBookImg />
                <SideBookName>{reviews[reviewIndex + 1].bookName}</SideBookName>
                <SideBookImg
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${
                    reviews[reviewIndex + 1].id
                  }?fife=w400-h600`}
                  alt=""
                />
                <Img src={reviews[reviewIndex + 1].author.photoURL} alt="" />
                {reviews[reviewIndex + 1].author.displayName}
                説：{reviews[reviewIndex + 1].quote}
              </SideBookTag>
            )}
          </>
        ) : (
          ""
        )}
      </Side>
    </div>
  );
}

export default SlideReviews;
