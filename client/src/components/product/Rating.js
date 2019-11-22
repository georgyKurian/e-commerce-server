import React from "react";

export default ({rating}) => {
  let i = 2;
  const num = rating *2;
  const stars = [];
  for (; i <= num && i <= 10; i += 2) {
    stars.push(<svg version="1.1" height={"1rem"} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style={{"enable-background":"new 0 0 53.867 53.867"}} xmlSpace="preserve"> <polygon style={{fill:"#EFCE4A"}} points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/> </svg>);
  }
  if (i !== 10 && num % 2 === 1) {
    i += 2;
    stars.push();
  }
  for (; i <= 10; i += 2) {
    stars.push(<div>0</div>);
  }
  return <div className="flex">{stars}</div>;
};
