import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { Link } from "react-router-dom";

const Img = styled.img`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  margin-right: 10px;
`;
const Side = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const SideBookTag = styled(Link)`
  color: #4e4e4e;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(241, 250, 247, 0.5);
`;
const SideBookImg = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-top: 10px;
  width: 100px;
`;
const SideBookName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #0d6663;
`;
const Author = styled.div`
  margin-right: auto;
  padding-top: 10px;
  color: rgba(44, 33, 59, 0.9);
  display: flex;
  justify-content: flex-start;
`;

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

function SideBooks() {
  const [user, setUser] = useState("");
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const reviewIndex = getRandom(reviews.length);
  const allReviewIndex = getRandom(allReviews.length);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
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
        // const id = docSnapshot.id;
        return { ...docSnapshot.data() };
      });
      setAllReviews(data);
    });
  }, []);

  return (
    <div>
      {user ? (
        <Side>
          #來看看其他去憂
          {reviews.length > 0 ? (
            <>
              <SideBookTag to={`/book/${reviews[reviewIndex].bookName}`}>
                <SideBookImg />
                <SideBookName>{reviews[reviewIndex].bookName}</SideBookName>
                <SideBookImg
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${
                    reviews[reviewIndex].id || reviews[reviewIndex].bookId
                  }?fife=w400-h600`}
                  alt=""
                />
                <Author>
                  <Img
                    src={
                      reviews[reviewIndex].author.photoURL ||
                      "https://images.blush.design/zzDbRuNIfaObRJJl3MMq?w=920&auto=compress&cs=srgb"
                    }
                    alt=""
                  />
                  {reviews[reviewIndex].author.displayName}
                  説：{reviews[reviewIndex].quote}
                </Author>
              </SideBookTag>
              {reviewIndex + 1 < reviews.length && (
                <SideBookTag to={`/book/${reviews[reviewIndex + 1].bookName}`}>
                  <SideBookImg />
                  <SideBookName>
                    {reviews[reviewIndex + 1].bookName}
                  </SideBookName>
                  <SideBookImg
                    src={`https://books.google.com/books/publisher/content/images/frontcover/${
                      reviews[reviewIndex + 1].id ||
                      reviews[reviewIndex + 1].bookId
                    }?fife=w400-h600`}
                    alt=""
                  />
                  <Author>
                    <Img
                      src={reviews[reviewIndex + 1].author.photoURL}
                      alt=""
                    />
                    {reviews[reviewIndex + 1].author.displayName}
                    説：{reviews[reviewIndex + 1].quote}
                  </Author>
                </SideBookTag>
              )}
            </>
          ) : (
            ""
          )}
        </Side>
      ) : (
        <>
          {allReviews.length > 0 ? (
            <Side>
              #來看看其他去憂
              {allReviews.length > 0 ? (
                <>
                  <SideBookTag
                    to={`/book/${allReviews[allReviewIndex].bookName}`}
                  >
                    <SideBookImg />
                    <SideBookName>
                      {allReviews[allReviewIndex].bookName}
                    </SideBookName>
                    <SideBookImg
                      src={`https://books.google.com/books/publisher/content/images/frontcover/${
                        allReviews[allReviewIndex].id ||
                        allReviews[allReviewIndex].bookId
                      }?fife=w400-h600`}
                      alt=""
                    />
                    <Author>
                      <Img
                        src={allReviews[allReviewIndex].author.photoURL}
                        alt=""
                      />
                      {allReviews[allReviewIndex].author.displayName}
                      説：{allReviews[allReviewIndex].quote}
                    </Author>
                  </SideBookTag>
                  {allReviewIndex + 1 < allReviews.length && (
                    <SideBookTag
                      to={`/book/${allReviews[allReviewIndex + 1].bookName}`}
                    >
                      <SideBookImg />
                      <SideBookName>
                        {allReviews[allReviewIndex + 1].bookName}
                      </SideBookName>
                      <SideBookImg
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${
                          allReviews[allReviewIndex + 1].id ||
                          allReviews[allReviewIndex + 1].bookId
                        }?fife=w400-h600`}
                        alt=""
                      />
                      <Author>
                        <Img
                          src={allReviews[allReviewIndex + 1].author.photoURL}
                          alt=""
                        />
                        {allReviews[allReviewIndex + 1].author.displayName}
                        説：{allReviews[allReviewIndex + 1].quote}
                      </Author>
                    </SideBookTag>
                  )}
                </>
              ) : (
                ""
              )}
            </Side>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default SideBooks;
