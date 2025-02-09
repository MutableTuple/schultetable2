import React from "react";
import ProfilePage from "../_components/ProfilePage";
import { fetchUserFromDB } from "../_lib/data-service";
import { getSession } from "../_lib/auth";

export default async function page() {
  const session = await getSession();
  const user_id = session?.user?.value
    ? JSON.parse(session.user.value)?.identities?.[0]?.id
    : null;
  const fetched_user = await fetchUserFromDB(user_id);
  console.log("fetched_User", fetched_user);
  return <ProfilePage fetched_user={fetched_user} />;
}
