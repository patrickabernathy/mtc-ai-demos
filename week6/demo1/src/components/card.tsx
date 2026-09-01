import { CardInfo } from "@/types/cardinfo";

export function Card ({ cards }: { cards: CardInfo[] }) {
    return (
        <>
            <ul className="cards">
                {cards.map((i, x) => {
                    return (      
                        <li className="card" key={x}>
                            <h3>{i.header}</h3>
                            <p>{i.body}</p>
                            <p className="detail">{i.footer}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}