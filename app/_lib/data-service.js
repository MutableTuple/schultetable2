import { supabase } from "./supabase";

export async function getAllAds() {
  const { data, error } = await supabase.from("Ads").select("*");

  if (error) console.log(error);
  return data;
}
async function trackGameSession(total_wrong_click, total_right_click, user) {
  const { data, error } = await supabase
    .from("SingleGameStat")
    .insert([{ total_wrong_click, total_right_click, time_taken, user }])
    .select();

  return data;
}

export async function getStatsofUser(user_id) {
  const { data, error } = await supabase
    .from("SingleGameStat")
    .select("*")
    .eq("user", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase Error:", error);
    return null;
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ No data found for this user.");
    return [];
  }

  console.log("✅ Data fetched:", data);
  return data;
}
export async function addUsertoDB(id, email) {
  const { data, error } = await supabase
    .from("User")
    .insert([{ id, email }])
    .select();

  if (error) console.log("cant add", error);
  console.log("Data", data);
  return data;
}

export async function fetchUserFromDB(id) {
  const { data, error } = await supabase.from("User").select("*").eq("id", id);

  if (error) console.log("cant fetch user for some reason", error);
  console.log("Data", data);
  return data;
}

export async function updateProfile(name, social_link, bio, id) {
  const { data, error } = await supabase
    .from("User")
    .update({ name, social_link, bio })
    .eq("id", id)
    .select();

  if (error) console.log("err", error);
  return data;
}

export async function getAllNotifications() {
  const { data, error } = await supabase.from("Notification").select("*");
  if (error) console.log("cannot fetch", error);
  return data;
}
// export async function getUsersScore(id) {
//   const { data, error } = await supabase
//     .from("User")
//     .select("score")
//     .eq("id", id);
//   if (error) console.log("cannot fetch", error);
//   return data;
// }
