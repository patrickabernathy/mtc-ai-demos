import { Card } from "@/components/card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { CardInfo } from "@/types/cardinfo";


const cards: CardInfo[] = [{
  header: "Hours",
  body: "Open 9 to 7 Monday through Thursday, 9 to 5 on Friday and Saturday, closed Sunday. ",
  footer: "The book drop out front is unlocked all night."
},{
  header: "Getting a card",
  body: "Bring something with your address on it. A piece of mail counts. It takes about four minutes and the card works the same day. ",
  footer: "Free for anyone who lives or works in the county."
},{
  header: "The computer lab",
  body: "Fourteen machines in the back room. First come, first served, two hours a person when someone is waiting. ",
  footer: "Printing is ten cents a page, cash or card."
},{
  header: "header",
  body: "body",
  footer: "footer"
},{
  header: "header",
  body: "body",
  footer: "footer"
}]

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Card cards={cards} />    
      <Footer />
    </>
  );
}
