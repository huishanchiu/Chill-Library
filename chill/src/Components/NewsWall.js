import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import Comments from "./Comments";

const Star = ({ starId, marked }) => {
  return (
    <span star-id={starId} style={{ color: "#ff9933" }}>
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 875px) {
    width: 100%;
  }
`;
const ReviewTag = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(213, 219, 219, 0.2);
  border-bottom: rgba(254, 174, 32, 0.4) 1px solid;
  margin: 10px 0;
  padding: 15px;

  color: rgba(254, 239, 222, 0.8);
  width: 100%;
`;
const ReviewAuthorLink = styled(Link)``;
const ReviewAuthorDiv = styled.div``;
const ReviewAuthor = styled.div`
  align-items: center;
  color: #2c213b;
  display: flex;
  @media (max-width: 600px) {
    /* flex-direction: column;
    align-items: flex-start; */
  }
`;

const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 20px;
`;
const Rate = styled.div`
  margin-bottom: auto;
  color: rgba(254, 239, 222, 0.7);
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const Question = styled.h3`
  display: flex;
  align-items: center;
  /* height: 60px; */
  margin: 50px 0 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Hashtag = styled.h4`
  color: #f83b10;
  margin-left: 10px;
  padding: 3px 5px;
  background-color: rgba(254, 239, 222, 0.7);
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
`;

const Quote = styled.h3`
  margin-right: 20px;
  color: tomato;
`;

const ReviewAuthorName = styled.span`
  font-weight: 500;

  margin-bottom: 0;
  color: rgb(254, 239, 222);
`;
const BookName = styled.div`
  color: rgba(254, 239, 222, 0.6);
  display: flex;
  align-items: center;
`;
const Time = styled.div`
  color: rgba(254, 239, 222, 0.6);
`;
const ReviewAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const BookReview = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const BookImg = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-right: 20px;
  width: 25%;
  @media (max-width: 1250px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (max-width: 425px) {
    width: 60%;
  }
`;
const ReviewContent = styled.div`
  white-space: pre-wrap;
`;

const NewsWall = () => {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [news, setNews] = useState([]);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Taipei",
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("reviews")
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setNews(data);
      });
  }, []);
  console.log(news);

  return (
    <Div>
      {firebase.auth().currentUser ? (
        news.map((review) => {
          return (
            <ReviewTag key={review.id}>
              <ReviewAuthor>
                <ReviewAuthorLink
                  to={`/mybooks/${review.author.uid}/collection`}
                >
                  <ReviewAuthorImg
                    src={
                      review.author.photoURL ||
                      "https://images.blush.design/zzDbRuNIfaObRJJl3MMq?w=920&auto=compress&cs=srgb"
                    }
                    alt=""
                  />
                </ReviewAuthorLink>
                <ReviewAuthorInfo>
                  <ReviewAuthorName>
                    {review.author.displayName}
                  </ReviewAuthorName>
                  <Time>
                    {new Date(review.createdAt.seconds * 1000).toLocaleString(
                      "en-US",
                      options
                    )}
                  </Time>
                </ReviewAuthorInfo>

                <Rate>
                  去憂指數:
                  {Array.from({ length: 5 }, (v, i) => (
                    <Star marked={review.rating > i} />
                  ))}
                </Rate>
              </ReviewAuthor>
              <BookName>
                <Quote>{review.quote}</Quote>
              </BookName>
              <BookReview>
                <BookImg
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${review.bookId}?fife=w400-h600`}
                  alt=""
                />
                <ReviewContent>
                  【 {review.bookName}】{review.content}
                </ReviewContent>
              </BookReview>
              <Question>
                這本書幫我解決了
                <HashtagContainer>
                  {review.hashtag1 ? <Hashtag>#{review.hashtag1}</Hashtag> : ""}
                  {review.hashtag2 ? <Hashtag>#{review.hashtag2}</Hashtag> : ""}
                  {review.hashtag3 ? <Hashtag>#{review.hashtag3}</Hashtag> : ""}
                </HashtagContainer>
                的問題!
              </Question>

              {open && <Comment review={review} close={setOpen} />}

              <Comments review={review} />
            </ReviewTag>
          );
        })
      ) : (
        <>
          {news.map((review) => {
            return (
              <ReviewTag>
                <ReviewAuthor>
                  <ReviewAuthorDiv>
                    <ReviewAuthorImg src={review.author.photoURL} alt="" />
                  </ReviewAuthorDiv>
                  {review.author.displayName}
                  <Quote>{review.quote}</Quote>
                  <Rate>
                    去憂指數：
                    {Array.from({ length: 5 }, (v, i) => (
                      <Star marked={review.rating > i} />
                    ))}
                  </Rate>
                </ReviewAuthor>
                <div>{review.content}</div>
                <Question>
                  這本書幫我解決了
                  <HashtagContainer>
                    {review.hashtag1 ? (
                      <Hashtag>#{review.hashtag1}</Hashtag>
                    ) : (
                      ""
                    )}
                    {review.hashtag2 ? (
                      <Hashtag>#{review.hashtag2}</Hashtag>
                    ) : (
                      ""
                    )}
                    {review.hashtag3 ? (
                      <Hashtag>#{review.hashtag3}</Hashtag>
                    ) : (
                      ""
                    )}
                  </HashtagContainer>
                  的問題!
                </Question>
                <Comments review={review} />
                {new Date(review.createdAt.seconds * 1000).toLocaleString(
                  "en-US",
                  options
                )}
                -《{review.bookName}》{/* <Comment review={review} /> */}
              </ReviewTag>
            );
          })}
        </>
      )}
    </Div>
  );
};

export default NewsWall;
