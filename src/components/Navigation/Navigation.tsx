import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="mt-12">
      <ul className="flex space-around gap-10">
        <li className="text-neutral-700 hover:underline py-2 px-3 rounded"><Link href="/">Forsíða</Link></li>
        <li className="text-neutral-700 hover:underline py-2 px-3 rounded"><Link href="/flokkar">Flokkar</Link></li>
      </ul>
    </nav>
  );
}