import Footer from "./_components/Footer";
import SchulteBoard from "./_components/SchulteBoard";
import { getSession } from "./_lib/auth";
export default async function Home() {
  const session = await getSession();
  return (
    <div className="">
      <SchulteBoard session={session} />
      <Footer />
    </div>
  );
}
