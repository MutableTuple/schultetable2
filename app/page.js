import Link from "next/link";
import Footer from "./_components/Footer";
import Notification from "./_components/Notification";
import SchulteBoard from "./_components/SchulteBoard";
import { getSession } from "./_lib/auth";
import { getAllNotifications } from "./_lib/data-service";
import LeaderBoardBtn from "./_components/LeaderBoardBtn";

export default async function Home() {
  const session = await getSession();
  const notifications = await getAllNotifications();
  // console.log("Notifications", notifications);
  return (
    <div className="">
      <Notification notifications={notifications} />
      <LeaderBoardBtn />
      <SchulteBoard session={session} />
    </div>
  );
}
