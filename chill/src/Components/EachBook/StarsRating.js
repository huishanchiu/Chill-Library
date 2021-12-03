import React from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer" }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

function StarsRating(rate) {
  const [selection, setSelection] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  return (
    <div onClick={(event) => setRating(event.target.getAttribute("star-id"))}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
}

export default StarsRating;
