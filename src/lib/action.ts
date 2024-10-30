"use server";

import { AUCTIONS, BASE_URL } from "@/server/Api";

export async function fetchAuction() {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: { revalidate: 0 }, // Disable cache
    });

    if (!response.ok) {
      throw new Error("Failed to fetch auction");
    }

    const auction = await response.json();
    return auction.data;
  } catch (error) {
    console.error("Error fetching Auction:", error);
    throw error;
  }
}
