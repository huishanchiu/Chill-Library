import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Div = styled.div`
  display: flex;
  background-color: #e5e5e3;
`;
const QuoteTag = styled.div`
  width: 100%;
  margin: 10px;
  padding: 10px;
  background-color: #414141;
`;

function Quote() {
  const [quote, setQuote] = useState(
    "錢錢沒有變成你喜歡的樣子，是真的不見惹！"
  );
  return (
    <Div>
      <QuoteTag>{quote}</QuoteTag>
    </Div>
  );
}

export default Quote;
