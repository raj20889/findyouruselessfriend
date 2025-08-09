'use server';
/**
 * @fileOverview Generates a useless friend match based on uploaded images.
 *
 * - generateUselessFriendMatch - A function that generates a useless friend match.
 * - GenerateUselessFriendMatchInput - The input type for the generateUselessFriendMatch function.
 * - GenerateUselessFriendMatchOutput - The return type for the generateUselessFriendMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generateCombinedImage, type GenerateCombinedImageInput} from './generate-combined-image';

const GenerateUselessFriendMatchInputSchema = z.object({
  image1DataUri: z
    .string()
    .describe(
      "A photo of the first person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  image2DataUri: z
    .string()
    .describe(
      "A photo of the second person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  image3DataUri: z
    .string()
    .describe(
      "A photo of the third person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateUselessFriendMatchInput = z.infer<typeof GenerateUselessFriendMatchInputSchema>;

const GenerateUselessFriendMatchOutputSchema = z.object({
  uselessFriend: z.object({
    index: z.number().describe('The index (1, 2, or 3) of the person deemed most "useless" in a funny way.'),
    reason: z.string().describe("A funny, sassy reason why this person is the useless friend."),
  }),
  beautifulCouple: z.object({
    index1: z.number().describe('The index (1, 2, or 3) of the first person in the beautiful couple.'),
    index2: z.number().describe('The index (1, 2, or 3) of the second person in the beautiful couple.'),
    reason: z.string().describe("A sweet and funny reason why these two look beautiful together."),
  }),
  combinedImageUri: z.string().describe('A data URI of the combined image of the three people.'),
});
export type GenerateUselessFriendMatchOutput = z.infer<typeof GenerateUselessFriendMatchOutputSchema>;

export async function generateUselessFriendMatch(
  input: GenerateUselessFriendMatchInput
): Promise<GenerateUselessFriendMatchOutput> {
  return generateUselessFriendMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUselessFriendMatchPrompt',
  input: {schema: GenerateUselessFriendMatchInputSchema},
  output: {schema: GenerateUselessFriendMatchOutputSchema},
  prompt: `You are a funny, sassy AI that analyzes three photos of people to determine who the "useless friend" is and which two would make a "beautiful couple".

Image 1: {{media url=image1DataUri}}
Image 2: {{media url=image2DataUri}}
Image 3: {{media url=image3DataUri}}

Your tasks:
1.  **Identify the Useless Friend:** Pick one person (1, 2, or 3) who seems the most likely to be the "useless" one in a friendship trio. This is purely for fun, so be creative and humorous. Maybe they're not looking at the camera, making a silly face, or just giving off chaotic vibes. Provide a funny, one-sentence reason for your choice.
2.  **Identify the Beautiful Couple:** From the three people, pick the two who you think look the most beautiful or cutest together. Provide a short, sweet, and slightly funny reason for your choice.

Return the results in the specified JSON format.`,
});

const generateUselessFriendMatchFlow = ai.defineFlow(
  {
    name: 'generateUselessFriendMatchFlow',
    inputSchema: GenerateUselessFriendMatchInputSchema,
    outputSchema: GenerateUselessFriendMatchOutputSchema,
  },
  async input => {
    // Generate the analysis and the combined image in parallel.
    const [matchResult, combinedImage] = await Promise.all([
      prompt(input),
      generateCombinedImage(input as GenerateCombinedImageInput),
    ]);

    if (!matchResult.output) {
      throw new Error('Failed to generate match result');
    }

    return {
      ...matchResult.output,
      combinedImageUri: combinedImage.imageDataUri,
    };
  }
);
