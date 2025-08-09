"use server";

import {
  generateUselessFriendMatch,
  type GenerateUselessFriendMatchInput,
} from "@/ai/flows/generate-useless-friend-match";
import type { GenerateUselessFriendMatchOutput } from "@/ai/flows/generate-useless-friend-match";

type ActionResult = 
  | { success: true; data: GenerateUselessFriendMatchOutput }
  | { success: false; error: string };

export async function getUselessFriendMatch(
  input: GenerateUselessFriendMatchInput
): Promise<ActionResult> {
  try {
    const result = await generateUselessFriendMatch(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getUselessFriendMatch action:", error);
    // It's better to return a generic error message to the client
    return {
      success: false,
      error: "The AI failed to respond. This is likely due to an invalid API key or API restrictions. Please check your key and try again.",
    };
  }
}
