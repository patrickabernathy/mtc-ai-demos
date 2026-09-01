import { NavLink } from "@/types/navlinks";
import Link from "next/link";

export function MyLink (model: NavLink) {
    return (
        <>
        <Link className="redlink" href={model.href}>{model.description}</Link>
        </>
    );
}