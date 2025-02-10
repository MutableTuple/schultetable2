import React from "react";
import Account from "../_components/Account";
import { getSession } from "../_lib/auth";
import { fetchUserFromDB, getStatsofUser } from "../_lib/data-service";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  const userData = JSON.parse(session.user.value);
  const user_stats = await getStatsofUser(userData.id);
  const hasGameActivity = user_stats && Object.keys(user_stats).length > 0;
  const loggedin_user = await fetchUserFromDB(userData.id);
  return (
    <div className="">
      {hasGameActivity ? (
        <Account
          session={session}
          user_stats={user_stats}
          loggedin_user={loggedin_user}
        />
      ) : (
        <div className="text-center h-screen flex flex-col gap-3 items-center justify-center">
          <h2 className="text-3xl font-bold text-stone-900 mt-6 pixelated">
            No Game Activity Yet!
          </h2>
          <p className="text-stone-500 mt-2">
            Play a game to unlock your stats and track your progress!
          </p>
          <Link href={"/"}>
            <p>play a game!</p>
          </Link>
        </div>
      )}
    </div>
  );
}
