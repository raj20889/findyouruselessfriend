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
  name: z.string().describe('A randomly generated name for the useless friend match.'),
  compatibilityPercentage: z
    .number()
    .describe('A useless compatibility percentage for the match.'),
  memeUrl: z.string().describe('A URL for a meme/GIF reaction to make it hilarious.'),
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
  prompt: `You are a funny AI that generates useless friend matches based on uploaded images.

  Generate a random name, a useless compatibility percentage, and find a funny meme/GIF reaction.

  Image 1: {{media url=image1DataUri}}
  Image 2: {{media url=image2DataUri}}
  Image 3: {{media url=image3DataUri}}

  Return the results in the following JSON format:
  {
    "name": "Random Name",
    "compatibilityPercentage": 73,
    "memeUrl": "https://example.com/meme.gif"
  }`,
});

const generateUselessFriendMatchFlow = ai.defineFlow(
  {
    name: 'generateUselessFriendMatchFlow',
    inputSchema: GenerateUselessFriendMatchInputSchema,
    outputSchema: GenerateUselessFriendMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
