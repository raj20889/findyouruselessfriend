"use server";

import { getMatchCounts } from "@/services/match-service";
import { MatchesClientPage } from "@/components/matches-client-page";

export default async function MatchesPage() {
  const counts = await getMatchCounts();

  return <MatchesClientPage counts={counts} />;
}
