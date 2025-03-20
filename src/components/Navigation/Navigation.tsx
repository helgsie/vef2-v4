import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="">
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/flokkar">Flokkar</Link></li>
      </ul>
    </nav>
  );
}