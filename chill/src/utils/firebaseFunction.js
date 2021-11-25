import firebase from "./firebase";

export const getTheme_1Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `宅在家好發慌？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};
export const getTheme_2Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `錢錢去哪了？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};
export const getTheme_3Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `一個人好孤單？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};
export const getTheme_4Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `想不出好點子？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};
export const getTheme_5Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `如何上火箭？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};
export const getTheme_6Books = (setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .where("categories", "array-contains", `心裡總是卡卡的？`)
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setFunction(list);
    });
};

export const getBookInfo = (bookName, setFunction) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookName)
    .onSnapshot((docSnapshot) => {
      setFunction(docSnapshot.data());
    });
};

export const setUserCollectedBooks = (userId, book) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("collectedBooks")
    .doc(book.title)
    .set(
      {
        title: book.title || "",
        authors: book.authors || "",
      },
      { merge: true }
    );
};

export const removeCollectedBook = (userId, bookName) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookName)
    .update({
      collectedBy: firebase.firestore.FieldValue.arrayRemove(userId),
    });
};
export const addCollectedBook = (userId, bookName) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookName)
    .update({
      collectedBy: firebase.firestore.FieldValue.arrayUnion(userId),
    });
};

export const getPersonalShelf = (userId, bookName, setFunction) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("collectedBooks")
    .where("title", "==", bookName)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      console.log(data);
      setFunction(data[0]);
    });
};

export const updateReadState = (
  userId,
  bookName,
  check,
  borrow,
  person,
  setEdit,
  setFunction
) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("collectedBooks")
    .doc(bookName)
    .update({
      read: check,
      borrow: borrow,
      borrowPerson: person,
    });
  setEdit(false);
  setFunction(false);
};
export const getReviews = (userId, setReviews) => {
  const unsubscribe = firebase
    .firestore()
    .collection("reviews")
    .where("author.uid", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      setReviews(data);
    });
  return () => {
    unsubscribe();
  };
};

export const addLikedReviews = (reviewId, userId) => {
  firebase
    .firestore()
    .collection("reviews")
    .doc(reviewId)
    .update({
      likedCount: firebase.firestore.FieldValue.increment(1),
      likedBy: firebase.firestore.FieldValue.arrayUnion(userId),
    });
};

export const deleteComment = (reviewId, commentId) => {
  firebase
    .firestore()
    .collection("reviews")
    .doc(reviewId)
    .collection("comments")
    .doc(commentId)
    .delete();
};

export const getComments = (reviewId, setComments) => {
  firebase
    .firestore()
    .collection("reviews")
    .doc(reviewId)
    .collection("comments")
    .orderBy("createdAt", "desc")
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      setComments(data);
    });
};

export const submitComments = (
  reviewId,
  setCommentContent,
  commentContent,
  setIsLoading
) => {
  setIsLoading(true);
  const firestore = firebase.firestore();
  const batch = firestore.batch();
  const reviewRef = firestore.collection("reviews").doc(reviewId);
  batch.update(reviewRef, {
    commentCount: firebase.firestore.FieldValue.increment(1),
  });
  const commentRef = reviewRef.collection("comments").doc();
  batch.set(commentRef, {
    docId: reviewId,
    content: commentContent,
    createdAt: firebase.firestore.Timestamp.now(),
    author: {
      uid: firebase.auth().currentUser.uid,
      displayName: firebase.auth().currentUser.displayName || "",
      photoURL: firebase.auth().currentUser.photoURL || "",
    },
  });
  batch.commit().then(() => {
    setCommentContent("");
    setIsLoading(false);
  });
};

export const getReviewsWithBook = (bookName, setReviews) => {
  let isUnmount = false;
  firebase
    .firestore()
    .collection("reviews")
    .where("bookName", "==", bookName)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      if (!isUnmount) {
        setReviews(data);
      }
    });
  return () => {
    isUnmount = true;
  };
};

export const addNewBookToDB = (bookInfo) => {
  const documentRef = firebase
    .firestore()
    .collection("books")
    .doc(bookInfo.volumeInfo.title);
  documentRef.set(
    {
      title: bookInfo.volumeInfo.title || "",
      subtitle: bookInfo.volumeInfo.subtitle || "",
      authors: bookInfo.volumeInfo.authors || "",
      publisher: bookInfo.volumeInfo.publisher || "",
      publishedDate: bookInfo.volumeInfo.publishedDate || "",
      ISBN: bookInfo.volumeInfo.industryIdentifiers[0].identifier || "",
      description: bookInfo.volumeInfo.description || "",
      image: bookInfo.volumeInfo.imageLinks.smallThumbnail || "",
      id: bookInfo.id || "",
    },
    { merge: true }
  );
};

export const getAuthorInfo = (userId, setFunction) => {
  firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .onSnapshot((docSnapshot) => {
      setFunction(docSnapshot.data());
    });
};
export const getAllReviews = (setAllReviews) => {
  firebase
    .firestore()
    .collection("reviews")
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        return { ...docSnapshot.data() };
      });
      setAllReviews(data);
    });
};
export const addCategory = (e, bookName) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookName)
    .update({
      categories: firebase.firestore.FieldValue.arrayRemove(
        `${e.target.textContent}`
      ),
    });
};
export const removeCategory = (e, bookName) => {
  firebase
    .firestore()
    .collection("books")
    .doc(bookName)
    .update({
      categories: firebase.firestore.FieldValue.arrayUnion(
        `${e.target.textContent}`
      ),
    });
};
