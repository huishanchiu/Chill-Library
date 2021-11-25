import { useState, useEffect, React } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { getReviews } from "../../utils/firebaseFunction";
import EditCombo from "./EditCombo";

const Div = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 240, 221, 0.8);
  font-size: 22px;
  width: 100%;
  padding: 20px;
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
  padding: 30px;
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
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviews(userId, setReviews);
    setIsLoading(false);
    setActiveItem("review");
  }, [userId]);
  console.log(reviews);
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
                    <EditCombo review={review} />
                    <BookName>-{review.bookName}</BookName>
                    <BookImgTag>
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
                      <BookImg
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${review.bookId}?fife=w400-h600`}
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
