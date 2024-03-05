import EmptyStar from './stars-rating/EmptyStar';
import FilledStar from './stars-rating/FilledStar';
import HalfStar from './stars-rating/HalfStar';

const StarsReview: React.FC<{ rating: number; size: number }> = ({
  rating,
  size,
}) => {
  const renderedRating = Array.from({ length: 5 }, (_, i) => {
    if (i <= rating - 1) return <FilledStar key={i} size={size} />;
    else if (i <= rating - 0.5) return <HalfStar key={i} size={size} />;
    else return <EmptyStar key={i} size={size} />;
  });
  return <div>{renderedRating}</div>;
};

export default StarsReview;
