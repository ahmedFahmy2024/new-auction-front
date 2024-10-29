import { BASE_URL, AUCTIONS, PRICES, VIDEOS } from "@/server/Api";

export async function fetchWebsite(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch website");
  }

  const website = await response.json();
  return website.data;
}

export async function fetchPrice(id: string) {
  const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${PRICES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch price");
  }

  const price = await response.json();
  return price.data;
}

export async function fetchVideo(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${VIDEOS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    const video = await response.json();
    return video.data[0];
  } catch (error) {
    console.error("Error fetching Video:", error);
    throw error;
  }
}
