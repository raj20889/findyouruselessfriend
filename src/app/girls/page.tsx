"use client";

import { useState, useMemo, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Upload, Users, Dices, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/theme-provider";
import { getUselessFriendMatch } from "../actions";
import type { GenerateUselessFriendMatchOutput } from "@/ai/flows/generate-useless-friend-match";
import { useToast } from "@/hooks/use-toast";
import { MatchResultCard } from "@/components/match-result-card";
import { loadingJokes } from "@/lib/data";

type FileValue = { file: File | null; preview: string | null };

export default function GirlsPage() {
  const { setTheme } = useTheme();
  const [files, setFiles] = useState<{ [key: string]: FileValue }>({
    file1: { file: null, preview: null },
    file2: { file: null, preview: null },
    file3: { file: null, preview: null },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingJoke, setLoadingJoke] = useState(loadingJokes[0]);
  const [result, setResult] = useState<GenerateUselessFriendMatchOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setTheme("girl");
  }, [setTheme]);
  
  useEffect(() => {
    let jokeInterval: NodeJS.Timeout;
    if (isLoading) {
      jokeInterval = setInterval(() => {
        setLoadingJoke(loadingJokes[Math.floor(Math.random() * loadingJokes.length)]);
      }, 2000);
    }
    return () => clearInterval(jokeInterval);
  }, [isLoading]);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [key]: { file, preview: URL.createObjectURL(file) },
      }));
    }
  };

  const removeFile = (key: string) => {
    setFiles(prev => ({ ...prev, [key]: { file: null, preview: null } }));
  }

  const isFormComplete = useMemo(() => {
    return Object.values(files).every((f) => f.file);
  }, [files]);

  const filePreviews = useMemo(() => {
    return [files.file1.preview, files.file2.preview, files.file3.preview];
  }, [files]);

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!isFormComplete) {
      toast({
        title: "Missing Photos!",
        description: "Please upload all three photos to find your useless friend.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const [image1DataUri, image2DataUri, image3DataUri] = await Promise.all([
        fileToDataUri(files.file1.file!),
        fileToDataUri(files.file2.file!),
        fileToDataUri(files.file3.file!),
      ]);

      const response = await getUselessFriendMatch({
        image1DataUri,
        image2DataUri,
        image3DataUri,
        scenario: 'girls-seeking-boy'
      });

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        throw new Error(response.error || "An unknown error occurred.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "AI Overload!",
        description: `The AI had a hiccup: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setResult(null);
    setFiles({
      file1: { file: null, preview: null },
      file2: { file: null, preview: null },
      file3: { file: null, preview: null },
    });
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
        <Dices className="h-16 w-16 animate-spin text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Analyzing Uselessness...</h2>
        <p className="mt-2 text-lg text-muted-foreground animate-pulse">{loadingJoke}</p>
      </div>
    );
  }
  
  if (result) {
    return (
        <div className="container mx-auto flex flex-col items-center p-4 text-center">
            <MatchResultCard result={result} onReset={resetForm} filePreviews={filePreviews} />
        </div>
    )
  }


  return (
    <div className="container mx-auto flex flex-col items-center p-4 text-center">
      <div className="mt-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
          Useless Friend & Couple Finder
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload three photos. Get one useless friend and one cute couple. Science! 😂
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-4xl">
        <Card className="w-full p-6 bg-card/70 backdrop-blur-lg shadow-2xl border-primary/20">
          <CardContent className="p-0">
             <div className="flex flex-col items-center gap-2 mb-8">
              <Sparkles className="text-accent" />
              <h3 className="text-xl font-semibold">It's Girls' Time to Shine!</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.keys(files).map((key, index) => (
                <div key={key} className="relative aspect-square">
                  <label
                    htmlFor={key}
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-muted-foreground/50 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    {files[key].preview ? (
                      <Image
                        src={files[key].preview!}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Upload Photo {index + 1}</span>
                        </p>
                        <p className="text-xs text-muted-foreground/80 px-1">
                          {index < 2 ? `You or a friend` : `A potential guy friend`}
                        </p>
                      </div>
                    )}
                    <input
                      id={key}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, key)}
                      disabled={isLoading}
                    />
                  </label>
                  {files[key].preview && (
                     <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 rounded-full h-7 w-7 z-10" onClick={() => removeFile(key)} disabled={isLoading}>
                       <X className="h-4 w-4" />
                     </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-8 w-full font-bold text-lg tracking-wider transform hover:scale-105 transition-transform duration-300"
              onClick={handleSubmit}
              disabled={!isFormComplete || isLoading}
            >
              <Users className="mr-2" />
              Analyze The Squad!
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
