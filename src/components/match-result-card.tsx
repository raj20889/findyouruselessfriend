"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { GenerateUselessFriendMatchOutput } from "@/ai/flows/generate-useless-friend-match";
import { PartyPopper, RefreshCw } from "lucide-react";
import { Progress } from "./ui/progress";

interface MatchResultCardProps {
  result: GenerateUselessFriendMatchOutput;
  onReset: () => void;
}

export function MatchResultCard({ result, onReset }: MatchResultCardProps) {
  return (
    <Card className="w-full max-w-lg text-center animate-in fade-in-50 zoom-in-90 duration-500 bg-card/70 backdrop-blur-lg shadow-2xl border-primary/20">
      <CardHeader>
        <CardDescription className="text-lg">Your perfect useless friend is...</CardDescription>
        <CardTitle className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2">
          {result.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full px-4">
           <div className="flex justify-between items-center mb-1">
             <span className="font-semibold">Useless Compatibility</span>
             <span className="font-bold text-primary">{result.compatibilityPercentage}%</span>
           </div>
          <Progress value={result.compatibilityPercentage} className="h-4" />
        </div>
        
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-4 shadow-lg border-4 border-primary/50">
          <Image
            src={result.memeUrl}
            alt="Funny meme reaction"
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </div>

        <p className="text-muted-foreground mt-4 italic">Congratulations? We think?</p>
        
        <Button onClick={onReset} size="lg" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
