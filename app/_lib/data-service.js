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
    .from("SingleGameStat")
    .select("user, time_taken, grid_size, difficulty")
    .eq("grid_size", gridSize)
    .eq("difficulty", difficulty)
    .gt("time_taken", 0); // no sort or limit

  if (error) {
    console.log("Error fetching times:", error);
    return null;
  }

  // Convert time_taken to numbers and find the min
  const validTimes = data
    .map((entry) => ({
      ...entry,
      time_taken_num: parseFloat(entry.time_taken),
    }))
    .filter((entry) => !isNaN(entry.time_taken_num));

  const fastest = validTimes.reduce(
    (min, curr) => (curr.time_taken_num < min.time_taken_num ? curr : min),
    validTimes[0]
  );

  return fastest || null;
}
