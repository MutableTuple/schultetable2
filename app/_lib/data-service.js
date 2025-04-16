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
export async function addUsertoDB(name, id, email) {
  const { data, error } = await supabase
    .from("User")
    .insert([{ name, id, email }])
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

export async function updateProfile(name, social_link, bio, nationality, id) {
  const { data, error } = await supabase
    .from("User")
    .update({ name, social_link, bio, nationality })
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
export async function getAllBlogs() {
  const { data, error } = await supabase.from("Blogs").select("*");
  if (error) console.log("cannot fetch", error);
  return data;
}
export async function getBlogBySlugName(slug) {
  const { data, error } = await supabase
    .from("Blogs")
    .select("*")
    .eq("slug", slug);
  if (error) console.log("cannot fetch", error);
  return data;
}

export async function getFastestTimeForGame(gridSize, difficulty) {
  const { data, error } = await supabase
    .from("SingleGameStat") // your table name
    .select("user, time_taken, grid_size, difficulty") // adjust as needed
    .eq("grid_size", gridSize)
    .eq("difficulty", difficulty)
    .gt("time_taken", 0) // ✅ only include records where time > 0
    .order("time_taken", { ascending: true })
    .limit(1); // Get only the fastest time

  if (error) {
    console.log("Error fetching fastest time:", error);
    return null;
  }

  // Log the returned data for debugging
  console.log("Fastest time for", gridSize, ":", data);

  // Check if data exists and return the first item, else return null
  return data && data.length > 0 ? data[0] : null;
}
