import Link from "next/link";
import Navigation from "./components/Navigation";
export default function Home() {
  return (
    <div>
      <h1>The Wild oasis.Welcome to paradise.</h1>
      <Link href="/cabins">Explore luxary Cabins</Link>
    </div>
  );
}
