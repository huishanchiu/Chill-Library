export const getBookDescription = (bookId, setFunction) => {
  fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setFunction(data?.volumeInfo?.description);
    })
    .catch((error) => {
      console.log(error);
    });
};

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
