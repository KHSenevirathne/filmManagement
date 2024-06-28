import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import clsx from 'clsx';

const Ratings = ({ value, text, color = "text-yellow-600" }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={clsx(color, "ml-1")} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt className={clsx(color, "ml-1")} />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className={clsx(color, "ml-1")} />
      ))}
      <span className={`rating-text ml-2 font-semibold`}>
        {text && text}
      </span>
    </div>
  );
};

export default Ratings;
