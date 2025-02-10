import React from "react";
import ProfilePage from "../_components/ProfilePage";
import { fetchUserFromDB } from "../_lib/data-service";
import { getSession } from "../_lib/auth";

export default async function Page() {
  try {
    const session = await getSession();
    const user_id = session?.user?.value
      ? JSON.parse(session.user.value)?.identities?.[0]?.id
      : null;

    if (!user_id) {
      return (
        <div className="text-center text-red-500 h-screen font-semibold">
          User not found. Please log in.
        </div>
      );
    }

    const fetched_user = await fetchUserFromDB(user_id);

    if (!fetched_user) {
      return (
        <div className="text-center text-red-500">No user data available.</div>
      );
    }

    return <ProfilePage fetched_user={fetched_user} />;
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="text-center text-red-500">
        Something went wrong. Please try again later.
      </div>
    );
  }
}
