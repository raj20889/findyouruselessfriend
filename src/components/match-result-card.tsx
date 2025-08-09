"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { GenerateUselessFriendMatchOutput } from "@/ai/flows/generate-useless-friend-match";
import { Award, Heart, RefreshCw, UserX } from "lucide-react";
import { Badge } from "./ui/badge";

interface MatchResultCardProps {
  result: GenerateUselessFriendMatchOutput;
  onReset: () => void;
  filePreviews: (string | null)[];
}

export function MatchResultCard({ result, onReset, filePreviews }: MatchResultCardProps) {
  const { uselessFriend, beautifulCouple } = result;

  const uselessFriendImage = filePreviews[uselessFriend.index - 1];
  const coupleImage1 = filePreviews[beautifulCouple.index1 - 1];
  const coupleImage2 = filePreviews[beautifulCouple.index2 - 1];

  return (
    <Card className="w-full max-w-2xl text-center animate-in fade-in-50 zoom-in-90 duration-500 bg-card/70 backdrop-blur-lg shadow-2xl border-primary/20">
      <CardHeader>
        <CardTitle className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-2">
          The Results Are In!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">

        {/* Useless Friend Section */}
        <div className="w-full p-4 rounded-lg bg-muted/50 border border-border">
          <h3 className="flex items-center justify-center text-2xl font-bold mb-3 gap-2"><Award className="text-accent"/> Useless Friend Award</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {uselessFriendImage ? (
                <Image src={uselessFriendImage} alt="Useless Friend" width={100} height={100} className="rounded-full aspect-square object-cover border-4 border-accent shadow-lg" />
            ) : <UserX className="w-24 h-24 text-muted-foreground" />}
            <p className="text-muted-foreground text-center md:text-left text-lg flex-1 italic">
              ...goes to <Badge variant="secondary" className="text-base mx-1">Friend #{uselessFriend.index}</Badge> because: "{uselessFriend.reason}"
            </p>
          </div>
        </div>
        
        {/* Beautiful Couple Section */}
        <div className="w-full p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="flex items-center justify-center text-2xl font-bold mb-3 gap-2"><Heart className="text-primary"/> Cutest Couple</h3>
            <p className="text-muted-foreground text-lg italic mb-4">
              "{beautifulCouple.reason}"
            </p>
             <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-primary/50">
                <Image
                    src={result.combinedImageUri}
                    alt="Combined friend match"
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                />
            </div>
            <div className="mt-4 flex justify-center items-center gap-4">
                {coupleImage1 && <Image src={coupleImage1} alt="Couple Person 1" width={80} height={80} className="rounded-full aspect-square object-cover border-4 border-primary/80" />}
                <Heart className="text-primary h-8 w-8"/>
                {coupleImage2 && <Image src={coupleImage2} alt="Couple Person 2" width={80} height={80} className="rounded-full aspect-square object-cover border-4 border-primary/80" />}
            </div>
        </div>

        <Button onClick={onReset} size="lg" className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Go Again!
        </Button>
      </CardContent>
    </Card>
  );
}
