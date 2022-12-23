import clientEnv from "./clientEnv.json";

export default async function fetchLeaderboard() {
  try {
    const url = `${clientEnv}/leaderboard`;
    const response = await fetch(url);
    const data = await response.json();

    if ("rank" in data && "length" in data)
      return { rank: data.rank, length: data.length };

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
