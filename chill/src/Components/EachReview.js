import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdBeer } from "react-icons/io";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import { useHistory, useParams } from "react-router-dom";
import toastGrey from "../images/toast_grey.png";
import toastYellow from "../images/toast_gold.png";
import Loading from "./Loading";
import Comment from "./Comment";
import Comments from "./Comments";
import { BsFillChatTextFill } from "react-icons/bs";

const TextIcon = styled(BsFillChatTextFill)`
  cursor: pointer;
  position: absolute;
  color: #bdbcbc;
  width: 26px;
  height: 100%;
`;
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
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const ReviewTag = styled.div`
  color: rgba(255, 240, 221, 0.6);
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  padding: 15px;
  background-color: rgba(213, 219, 219, 0.1);
`;
const ReviewAuthorLink = styled(Link)`
  text-decoration: none;
  color: rgba(254, 240, 221, 0.8);
  display: flex;
  align-items: center;
`;
const ReviewAuthorDiv = styled.div`
  @media (max-width: 768px) {
    display: flex;
  }
`;
const ReviewAuthor = styled.div`
  align-items: center;
  color: rgba(254, 240, 221, 0.8);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: flex-start;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Rate = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const Question = styled.h3`
  color: rgba(255, 240, 221, 1);
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Hashtag = styled.h4`
  color: #f83b10;
  margin-right: 10px;
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
const ContentDiv = styled.div`
  font-size: 15px;
  color: rgba(255, 240, 221, 0.8);
  word-break: break-all;
`;

const Beer = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  padding: 5px;
`;

const BeerIcon = styled.img`
  cursor: pointer;
  width: 35px;
  margin-left: 30px;
`;

const BeerYellow = styled.img`
  cursor: pointer;
  width: 35px;
  /* padding: 5px; */
  margin-left: 30px;
`;
const BeerText = styled.p`
  color: rgba(255, 240, 221, 0.6);
`;
const LikeCount = styled.div`
  font-size: 16px;
  color: #ff9933;
  width: 15px;
  height: 15px;
  border-radius: 20px;
  text-align: center;
`;
const Quote = styled.h3`
  margin-left: 10px;
  color: tomato;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;
const RateQuote = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const LikeDiv = styled.div`
  position: relative;
  display: flex;
  /* align-items: center; */
`;

function EachReview() {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Taipei",
  };
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const bookid = useParams();

  useEffect(() => {
    const db = firebase.firestore();
    const reviewRef = db
      .collection("reviews")
      .where("bookName", "==", bookid.id)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });

        setReviews(data);
      });
  }, []);

  const toggleLiked = (e, isLiked) => {
    const uid = firebase.auth().currentUser.uid;
    console.log(e.target);
    console.log(e.target.dataset.id);
    if (isLiked) {
      firebase
        .firestore()
        .collection("reviews")
        .doc(e.target.dataset.id)
        .update({
          likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection("reviews")
        .doc(e.target.dataset.id)
        .update({
          likedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  };

  return (
    <>
      {firebase.auth().currentUser ? (
        <Div>
          {reviews.map((review) => {
            const isLiked = review.likedBy?.includes(
              firebase.auth().currentUser.uid
            );
            return (
              <ReviewTag key={review.id}>
                <ReviewAuthor>
                  <ReviewAuthorLink
                    to={`/mybooks/${review.author.uid}/collection`}
                  >
                    <ReviewAuthorImg src={review.author.photoURL} alt="" />
                    {review.author.displayName}
                  </ReviewAuthorLink>
                  <RateQuote>
                    <Quote>{review.quote}</Quote>
                    <Rate>
                      去憂指數：
                      {Array.from({ length: 5 }, (v, i) => (
                        <Star marked={review.rating > i} />
                      ))}
                    </Rate>
                  </RateQuote>
                </ReviewAuthor>
                <ContentDiv>{review.content}</ContentDiv>
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

                {new Date(review.createdAt.seconds * 1000).toLocaleString(
                  "en-US",
                  options
                )}
                {open && <Comment close={setOpen} review={review} />}
                <Comments review={review} />
              </ReviewTag>
            );
          })}
        </Div>
      ) : (
        <>
          <Div>
            {reviews.map((review) => {
              return (
                <ReviewTag key={review.id}>
                  <ReviewAuthor>
                    <ReviewAuthorDiv>
                      <ReviewAuthorImg src={review.author.photoURL} alt="" />
                      {review.author.displayName}
                    </ReviewAuthorDiv>
                    <RateQuote>
                      <Quote>{review.quote}</Quote>
                      <Rate>
                        去憂指數：
                        {Array.from({ length: 5 }, (v, i) => (
                          <Star marked={review.rating > i} />
                        ))}
                      </Rate>
                    </RateQuote>
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
                  <LikeDiv>
                    <Beer>
                      {review.likedCount >= 1 ? (
                        <>
                          <BeerYellow src={toastYellow} />
                          <LikeCount>
                            {review.likedCount && review.likedCount}
                          </LikeCount>
                        </>
                      ) : (
                        <>
                          <BeerIcon src={toastGrey} />
                        </>
                      )}
                    </Beer>
                  </LikeDiv>
                  {new Date(review.createdAt.seconds * 1000).toLocaleString(
                    "en-US",
                    options
                  )}
                </ReviewTag>
              );
            })}
          </Div>
        </>
      )}
    </>
  );
}

export default EachReview;
