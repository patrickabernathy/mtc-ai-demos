import { MyLink } from "./mylink";
import Link from "next/link";

export function Navbar () {
    return (
        <>
        <nav>
            <MyLink href="#" description="Catalog" />&nbsp;&middot;&nbsp;
            <MyLink href="#" description="Events" />&nbsp;&middot;&nbsp;
            <MyLink href="#" description="Ask a librarian" />
        </nav>        
        </>
    );
}

