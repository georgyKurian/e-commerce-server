import React from "react";

const star = {
  fill: "#FFB600",
  stroke: "#a0a0a0",
  strokeWidth: 1
};

const halfStar = { ...star, fill: "url('#halfGradient')" };
const emptyStar = { ...star, fill: "none" };

export default ({ rating, reviewCount }) => {
  const xCords = [0, 36, 72, 108, 144];
  const stars = [];
  let i = 10;
  for (; i <= 50; i += 10) {
    let style = emptyStar;
    if (i - 5 === rating) {
      style = halfStar;
    } else if (i <= rating) {
      style = star;
    }
    stars.push(
      <use
        key={i / 10}
        xlinkHref="#icon-star"
        x={xCords[(i-10) / 10]}
        y="0"
        style={style}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="text-sm flex">
        <svg
          className="star-source"
          height="20"
          width="100"
          viewBox="40 0 95 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <g id="icon-star">
              <path
                d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
                 l11.547-1.2L16.026,0.6L20.388,10.918z"
              />
            </g>
            <linearGradient id="halfGradient">
              <stop stopOpacity="1" offset="50%" stopColor="#FFB600"></stop>
              <stop stopOpacity="0" offset="50%"></stop>
            </linearGradient>
          </defs>
          {stars}
        </svg>
        <span>({reviewCount} Reviews)</span>
      </div>
    </React.Fragment>
  );
};
