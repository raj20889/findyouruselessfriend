"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Lightbulb } from "lucide-react";
import { uselessFacts } from "@/lib/data";

interface UselessFactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UselessFactDialog({ open, onOpenChange }: UselessFactDialogProps) {
  const [fact, setFact] = useState("");

  useEffect(() => {
    if (open) {
      setFact(uselessFacts[Math.floor(Math.random() * uselessFacts.length)]);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card/80 backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary animate-pulse" />
            A Wild Useless Fact Appeared!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg pt-4 text-foreground">
            {fact}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Wow, so useless!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
