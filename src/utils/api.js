export const getBookDescription = async (bookId) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    {
      method: "GET",
    }
  );
  const json = await res.json();
  return json;
};
getBookDescription().catch((err) => {
  console.log(err);
});

export const searchBooks = async (search) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search}`,
    {
      method: "GET",
    }
  );
  const json = await res.json();
  return json;
};
searchBooks().catch((err) => {
  console.log(err);
});

export const getEachBook = async (isbn) => {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    {
      method: "GET",
    }
  );
  const json = await res.json();
  return json;
};
getEachBook().catch((err) => {
  console.log(err);
});
