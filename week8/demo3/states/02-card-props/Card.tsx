// The card that grew. Nobody designed this -- it happened one prop at a time,
// and every single one was reasonable when it was added.
export function Card({
  title,
  subtitle,
  price,
  showBadge,
  badgeText,
  hasFooter,
  footerText,
  buttonLabel,
  onButtonClick,
}: {
  title: string;
  subtitle: string;
  price: number;
  showBadge: boolean;
  badgeText: string;
  hasFooter: boolean;
  footerText: string;
  buttonLabel: string;
  onButtonClick: () => void;
}) {
  return (
    <div className="card">
      {showBadge && <span className="tag">{badgeText}</span>}
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <p className="price">${price.toFixed(2)}</p>
      <button type="button" onClick={onButtonClick}>
        {buttonLabel}
      </button>
      {hasFooter && <p className="footer">{footerText}</p>}
    </div>
  );
}
