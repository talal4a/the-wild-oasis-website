import Link from "next/link";
export const metadata = {
  title: "The Wild Oasis",
};
export default function Home() {
  return (
    <div>
      <h1>The Wild oasis.Welcome to paradise.</h1>
      <Link href="/cabins">Explore luxary Cabins</Link>
    </div>
  );
}
