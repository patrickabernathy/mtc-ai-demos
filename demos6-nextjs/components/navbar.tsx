import { NavClass } from "@/types/navclass";

export function Nav ({ navClass }: { navClass: NavClass[] }) {
    return (
      <nav>
        {navClass.map((element, x) => (
            <NavA key={x} href={element.href} text={element.text} endingDot={element.endingDot} />
        ))}
      </nav>
    );
}

function NavA ({ href, text, endingDot = true }: NavClass) {
    return (
        <>
            <a style={{ fontWeight: "bold" }} href={href}>{text}</a> {endingDot && <>&nbsp;&middot;{" "}</>}
        </>
    );
}
