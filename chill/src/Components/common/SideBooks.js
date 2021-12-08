import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CommentAuthorInfo from "../EachBook/CommentAuthorInfo";
import { useSelector } from "react-redux";
import { getOtherReviews, getAllReviews } from "../../utils/firebaseFunction";
import { bookImgSrc, defaltBookImgSrc } from "../../utils/utils";

const Side = styled.div`
  width: 80%;
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
`;

function getRandom(x) {
  return Math.floor(Math.random() * x);
}

function SideBooks() {
  const currentUser = useSelector((state) => state.currentUser);
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const reviewIndex = getRandom(reviews.length);
  const allReviewIndex = getRandom(allReviews.length);

  useEffect(() => {
    getOtherReviews(currentUser?.uid, setReviews);
    getAllReviews(setAllReviews);
  }, [currentUser?.uid]);

  return (
    <div>
      {currentUser ? (
        <Side>
          #來看看其他去憂
          {reviews.length > 0 ? (
            <>
              <SideBookTag to={`/book/${reviews[reviewIndex].bookName}`}>
                <SideBookImg />
                <SideBookName>{reviews[reviewIndex].bookName}</SideBookName>
                <SideBookImg
                  src={
                    bookImgSrc(reviews[reviewIndex].bookId) ||
                    defaltBookImgSrc()
                  }
                  alt=""
                />
                <Author>
                  <CommentAuthorInfo comment={reviews[reviewIndex]} />
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
                    src={
                      bookImgSrc(reviews[reviewIndex + 1].bookId) ||
                      defaltBookImgSrc()
                    }
                    alt=""
                  />

                  <Author>
                    <CommentAuthorInfo comment={reviews[reviewIndex + 1]} />
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
                      src={
                        bookImgSrc(allReviews[allReviewIndex].bookId) ||
                        defaltBookImgSrc()
                      }
                      alt=""
                    />
                    <Author>
                      <CommentAuthorInfo comment={allReviews[allReviewIndex]} />
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
                        src={
                          bookImgSrc(allReviews[allReviewIndex + 1].bookId) ||
                          defaltBookImgSrc()
                        }
                        alt=""
                      />
                      <Author>
                        <CommentAuthorInfo
                          comment={allReviews[allReviewIndex + 1]}
                        />
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
