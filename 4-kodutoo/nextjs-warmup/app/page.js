import Counter from "./components/Counter";
import ServerMessage from "./components/ServerMessage";

export default function Home() {
  return (
    <main>
      <h1>Tere tulemast!</h1>
      <p>See on minu Next.js Warm-up rakendus.</p>
      <Counter />
      <ServerMessage />
    </main>
  );
}
