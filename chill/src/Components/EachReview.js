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
  align-items: center;
`;
const ReviewTag = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f1faf7;
  border-radius: 10px;
  color: grey;
  width: 600px;
`;
const ReviewAuthorLink = styled(Link)``;
const ReviewAuthorDiv = styled.div``;
const ReviewAuthor = styled.div`
  align-items: center;
  color: #2c213b;
  text-decoration: none;
  display: flex;
  margin: 20px;
`;
const ReviewAuthorImg = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const Rate = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const Question = styled.h3`
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 50px;
`;
const Hashtag = styled.h4`
  color: #f83b10;
  margin-left: 10px;
  padding: 0.6%;
  background: #f7e8dc center/contain no-repeat;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
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
  padding: 5px;
`;

const BeerYellow = styled.img`
  cursor: pointer;
  width: 35px;
  padding: 5px;
`;
const BeerText = styled.p``;
const LikeCount = styled.div`
  font-size: 12px;
  background-color: #ff9933;
  color: white;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  text-align: center;
`;
const Quote = styled.h3`
  margin-left: 10px;
  color: tomato;
`;
const LikeDiv = styled.div`
  display: flex;
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
  const bookid = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [reviewid, setReviewid] = useState([]);

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
        console.log(data);
        setReviews(data);
      });
  }, []);
  console.log(reviews);
  // useEffect(() => {
  //   const db = firebase.firestore();
  //   reviews.author &&
  //     db
  //       .collection("users")
  //       .where("uid", "==", reviews.author.uid)
  //       .onSnapshot((doc) => {
  //         console.log(doc.data());
  //       });
  // }, [reviews.author]);
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

  console.log(reviewid);

  console.log(comments);
  return (
    <>
      {firebase.auth().currentUser ? (
        <Div>
          {reviews.map((review) => {
            const isLiked = review.likedBy?.includes(
              firebase.auth().currentUser.uid
            );
            return (
              <ReviewTag>
                <ReviewAuthor>
                  <ReviewAuthorLink
                    to={`/mybooks/${review.author.uid}/collection`}
                  >
                    <ReviewAuthorImg src={review.author.photoURL} alt="" />
                  </ReviewAuthorLink>
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
                <LikeDiv>
                  <Beer>
                    {isLiked ? (
                      <BeerYellow
                        onClick={(e) => toggleLiked(e, isLiked)}
                        data-id={review.id}
                        src={toastYellow}
                      />
                    ) : (
                      <BeerIcon
                        onClick={(e) => toggleLiked(e, isLiked)}
                        data-id={review.id}
                        src={toastGrey}
                      />
                    )}
                    <LikeCount>
                      {review.likedBy && review.likedBy.length}
                    </LikeCount>
                  </Beer>
                  <BeerText>覺得很讚，賞作者一杯啤酒!</BeerText>
                </LikeDiv>
                {new Date(review.createdAt.seconds * 1000).toLocaleString(
                  "en-US",
                  options
                )}
                <Comment review={review} />
              </ReviewTag>
            );
          })}
        </Div>
      ) : (
        <>
          <Div>
            {reviews.map((review) => {
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
