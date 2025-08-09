"use server";

import {
  generateUselessFriendMatch,
  type GenerateUselessFriendMatchInput,
} from "@/ai/flows/generate-useless-friend-match";
import type { GenerateUselessFriendMatchOutput } from "@/ai/flows/generate-useless-friend-match";

type ActionResult = 
  | { success: true; data: GenerateUselessFriendMatchOutput }
  | { success: false; error: string };

const createMockResponse = (scenario: 'girls-seeking-boy' | 'boys-seeking-girl'): GenerateUselessFriendMatchOutput => {
  const uselessFriendIndex = Math.random() < 0.5 ? 1 : 2;
  const coupleFriendIndex = uselessFriendIndex === 1 ? 2 : 1;
  
  return {
    uselessFriend: {
      index: uselessFriendIndex,
      reason: "Their vibes are just... hilariously off today. It's a gift, really.",
    },
    beautifulCouple: {
      index1: coupleFriendIndex,
      index2: 3,
      reason: "They look like they're about to drop the hottest album of the year.",
    },
  };
};

export async function getUselessFriendMatch(
  input: GenerateUselessFriendMatchInput
): Promise<ActionResult> {
  try {
    const result = await generateUselessFriendMatch(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI call failed, returning mock data. Error:", error);
    // Return a mock response so the app can continue without a real AI call.
    const mockData = createMockResponse(input.scenario);
    return { success: true, data: mockData };
  }
}
