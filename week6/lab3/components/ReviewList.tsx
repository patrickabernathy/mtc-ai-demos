import type { Review } from "../types/review";

export function ReviewList({
  reviews,
  loading,
  error,
  onRetry,
}: {
  reviews: Review[];
  loading: boolean;
  error: string;
  onRetry: () => void;
}) {
  return (
    <section className="reviews">
      <h2>What people are saying</h2>

      {/* Same four situations as MenuList in demo7/demo8 — loading and
          empty look identical unless you make them say different things. */}
      {loading ? (
        <p className="review-status">Loading reviews&hellip;</p>
      ) : error ? (
        <div className="review-error">
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={onRetry}>
            Try again
          </button>
        </div>
      ) : reviews.length === 0 ? (
        <p className="review-status">No reviews yet. Be the first.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li className="review" key={review.id}>
              <p className="review-author">
                {review.author} <span className="review-rating">{"★".repeat(review.rating)}</span>
              </p>
              <p className="review-text">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
