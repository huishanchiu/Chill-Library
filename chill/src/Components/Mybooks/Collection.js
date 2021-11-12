import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Link, useParams } from "react-router-dom";
import bookShelf from "../../images/bookShelf.jpeg";

const AllBook = styled.div`
  color: #0b4d4a;
  font-size: 22px;
  font-weight: 500;
  border-radius: 20px;
  background-image: linear-gradient(
      rgba(211, 211, 211, 0.7),
      rgba(255, 255, 255, 0.6)
    ),
    url(${bookShelf});
  justify-content: space-around;
  width: 700px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const BookTag = styled(Link)`
  position: relative;
  padding: 20px 10px 0;
  text-decoration: none;
  width: 150px;
  margin: 10px 20px 0;
  &:hover {
    display: block;
  }
`;
const BookContent = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
const ImgTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 180px;
`;
const BookImg = styled.img`
  cursor: pointer;
  height: 220px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;
const BookName = styled.div`
  margin-top: 10px;
  /* background-color: #f1faf7; */
  font-size: 18px;
  font-weight: 900;
  color: #2c213b;
`;

function Collection() {
  const [uid, setUid] = useState("");
  let userId = useParams();
  const [bookList, setBookList] = useState([]);
  const db = firebase.firestore();
  useEffect(() => {
    setUid(firebase.auth().currentUser?.uid);
  }, []);
  useEffect(() => {
    db.collection("books")
      .where("collectedBy", "array-contains", userId.userid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return { ...docSnapshot.data() };
        });
        setBookList(data);
      });
  }, []);
  console.log(userId.userid);

  console.log(bookList);
  return (
    <>
      {bookList.length > 0 ? (
        <AllBook>
          {bookList.map((item) => {
            let des = item.description.slice(0, 200);
            item.description = des + "......";

            return (
              <BookTag
                to={`/mybooks/${userId.userid}/collection/${item.title}`}
                key={item.id}
              >
                <BookContent>
                  <ImgTag>
                    <BookImg
                      src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w400-h600`}
                      alt=""
                    />
                  </ImgTag>
                  <BookName>{item.title}</BookName>
                </BookContent>
              </BookTag>
            );
          })}
        </AllBook>
      ) : (
        <AllBook>書櫃空空的唷</AllBook>
      )}
    </>
  );
}

export default Collection;
