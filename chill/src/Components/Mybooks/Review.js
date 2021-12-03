import { useState, useEffect, React } from "react";
import styled from "styled-components";
import Loading from "../common/Loading";
import EditCombo from "./EditCombo";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getReviews } from "../../utils/firebaseFunction";
import { bookImgSrc, defaltBookImgSrc } from "../../utils/utils";

const Div = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 240, 221, 0.8);
  font-size: 22px;
  width: 100%;
  background-color: rgba(213, 219, 219, 0.1);
`;
const DivContainer = styled(Div)`
  font-size: 16px;
`;

const AllBook = styled.div`
  width: 100%;
`;
const ReviewTag = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-decoration: none;
  color: rgba(255, 240, 221, 0.8);
  border-bottom: rgba(254, 174, 32, 0.3) 1px solid;
  margin: 20px 0;
`;
const BookName = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-top: 0;
`;
const Hashtag = styled.div`
  color: #f83b10;
  margin-left: 10px;
  padding: 3px 5px;
  background-color: rgba(254, 239, 222, 0.7);
  white-space: nowrap;
  border-radius: 5px;
  box-shadow: 0.2em 0.2em #222126;
`;
const ReviewTime = styled.div`
  margin-top: 20px;
  color: rgba(254, 239, 222, 0.7);
`;
const HashtagContainer = styled.div`
  margin: 10px;
  display: flex;
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
const BookImgTag = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

function Review({ setActiveItem }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviews(userId, setReviews, setActiveItem);
    setIsLoading(false);
  }, [userId, setActiveItem]);

  return (
    <>
      {isLoading ? <Loading /> : ""}
      {reviews.length > 0 ? (
        <DivContainer>
          <AllBook>
            {reviews &&
              reviews.map((review) => {
                return (
                  <ReviewTag key={review.id}>
                    {userId === currentUser.uid ? (
                      <EditCombo review={review} />
                    ) : (
                      ""
                    )}
                    <BookName>-{review.bookName}</BookName>
                    <BookImgTag>
                      <HashtagContainer>
                        {review.hashtag1 && (
                          <Hashtag>#{review.hashtag1}</Hashtag>
                        )}
                        {review.hashtag2 && (
                          <Hashtag>#{review.hashtag2}</Hashtag>
                        )}
                        {review.hashtag3 && (
                          <Hashtag>#{review.hashtag3}</Hashtag>
                        )}
                      </HashtagContainer>
                      <BookImg
                        src={bookImgSrc(review.bookId) || defaltBookImgSrc()}
                        alt=""
                      />
                    </BookImgTag>
                    <ReviewTime>
                      {new Date(
                        review.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </ReviewTime>
                  </ReviewTag>
                );
              })}
          </AllBook>
        </DivContainer>
      ) : (
        <Div>目前還沒發表去憂唷</Div>
      )}
    </>
  );
}

export default Review;
