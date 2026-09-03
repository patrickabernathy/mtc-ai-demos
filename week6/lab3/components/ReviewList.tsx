import { sampleReviews } from "../types/review";

// Static for now — straight out of types/review.ts, the same way the menu
// used to come straight out of types/coffee.ts back in demo1-6. Your job in
// this lab is to make this section fetch the real reviews from the server
// instead, the way demo7 did for the menu.
export function ReviewList() {
  return (
    <section className="reviews">
      <h2>What people are saying</h2>
      <ul className="review-list">
        {sampleReviews.map((review) => (
          <li className="review" key={review.id}>
            <p className="review-author">
              {review.author} <span className="review-rating">{"★".repeat(review.rating)}</span>
            </p>
            <p className="review-text">{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
