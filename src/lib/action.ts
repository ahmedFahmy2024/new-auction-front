"use server";

import { PROJECTS, BASE_URL } from "@/server/Api";

export async function fetchProjects() {
  try {
    const response = await fetch(`${BASE_URL}${PROJECTS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: { revalidate: 0 }, // Disable cache
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const projects = await response.json();
    return projects.data;
  } catch (error) {
    console.error("Error fetching Projects:", error);
    throw error;
  }
}
