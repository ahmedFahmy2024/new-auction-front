"use server";

import { PROJECTS, BASE_URL, BANNERS } from "@/server/Api";

interface FetchProjectsParams {
  page?: number;
  limit?: number;
}

export async function fetchProjects({
  page = 1,
  limit = 20,
}: FetchProjectsParams = {}) {
  try {
    const response = await fetch(
      `${BASE_URL}${PROJECTS}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 }, // Disable cache
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const { data, paginationResult, success } = await response.json();

    if (!success) {
      throw new Error("Failed to fetch projects");
    }

    return {
      data,
      paginationResult,
    };
  } catch (error) {
    console.error("Error fetching Projects:", error);
    throw error;
  }
}

export async function fetchBanner() {
  try {
    const response = await fetch(`${BASE_URL}${BANNERS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: { revalidate: 0 }, // Disable cache
    });

    if (!response.ok) {
      throw new Error("Failed to fetch banners");
    }

    const banners = await response.json();
    return banners.data;
  } catch (error) {
    console.error("Error fetching Banners:", error);
    throw error;
  }
}
