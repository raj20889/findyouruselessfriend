'use server';
/**
 * @fileOverview A flow for combining three images into a single image.
 *
 * - generateCombinedImage - A function that takes three images and generates a combined image.
 * - GenerateCombinedImageInput - The input type for the generateCombinedImage function.
 * - GenerateCombinedImageOutput - The return type for the generateCombinedImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCombinedImageInputSchema = z.object({
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

export type GenerateCombinedImageInput = z.infer<typeof GenerateCombinedImageInputSchema>;

const GenerateCombinedImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateCombinedImageOutput = z.infer<typeof GenerateCombinedImageOutputSchema>;

export async function generateCombinedImage(
  input: GenerateCombinedImageInput
): Promise<GenerateCombinedImageOutput> {
  return generateCombinedImageFlow(input);
}

const generateCombinedImageFlow = ai.defineFlow(
  {
    name: 'generateCombinedImageFlow',
    inputSchema: GenerateCombinedImageInputSchema,
    outputSchema: GenerateCombinedImageOutputSchema,
  },
  async (input: GenerateCombinedImageInput) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {text: 'Create a fun, combined group photo of these three people together. Make it look like a collage or a group selfie.'},
        {media: {url: input.image1DataUri}},
        {media: {url: input.image2DataUri}},
        {media: {url: input.image3DataUri}},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageDataUri: media.url,
    };
  }
);
