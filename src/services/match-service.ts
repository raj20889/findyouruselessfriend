/**
 * @fileOverview Service functions for managing match counts.
 *
 * - getMatchCounts - Retrieves the current match counts for boys and girls.
 * - incrementMatchCount - Increments the match count for a given scenario.
 */
import fs from 'fs/promises';
import path from 'path';

const countsFilePath = path.join(process.cwd(), 'src', 'lib', 'match-counts.json');

type MatchCounts = {
  girls: number;
  boys: number;
};

async function readCounts(): Promise<MatchCounts> {
  try {
    const data = await fs.readFile(countsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, so we initialize it.
      const initialCounts = { girls: 0, boys: 0 };
      await writeCounts(initialCounts);
      return initialCounts;
    }
    console.error('Error reading match counts:', error);
    // Return a default value in case of other errors
    return { girls: 0, boys: 0 };
  }
}

async function writeCounts(counts: MatchCounts): Promise<void> {
  try {
    await fs.writeFile(countsFilePath, JSON.stringify(counts, null, 2));
  } catch (error) {
    console.error('Error writing match counts:', error);
  }
}

export async function getMatchCounts(): Promise<MatchCounts> {
  return await readCounts();
}

export async function incrementMatchCount(scenario: 'girls-seeking-boy' | 'boys-seeking-girl'): Promise<void> {
  const counts = await readCounts();
  if (scenario === 'girls-seeking-boy') {
    counts.girls += 1;
  } else {
    counts.boys += 1;
  }
  await writeCounts(counts);
}
