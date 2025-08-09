
"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Bot, BarChart, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-provider";
import { UselessFactDialog } from "./useless-fact-dialog";
import { usePathname } from "next/navigation";

const Header = () => {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const [logoClicks, setLogoClicks] = useState(0);
  const [isFactOpen, setIsFactOpen] = useState(false);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      setIsFactOpen(true);
      setLogoClicks(0);
    }
    setTheme("boy");
  };

  const navItems = [
    { name: "Boys", theme: "boy", icon: <Bot className="h-4 w-4" />, href: "/" },
    { name: "Girls", theme: "girl", icon: <Heart className="h-4 w-4" />, href: "/girls" },
    { name: "Matches", href: "/matches", icon: <BarChart className="h-4 w-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-lg border-b">
        <div className="container mx-auto flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={handleLogoClick}>
            <div className="bg-primary p-2 rounded-lg">
              <Ghost className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tighter">UselessFriend</span>
          </Link>
          <nav className="flex items-center gap-2 rounded-full border bg-muted/50 p-1">
            {navItems.map((item) => {
              const isActive = item.href === pathname;
              
              const handleClick = () => {
                if (item.theme) {
                  setTheme(item.theme as "boy" | "girl")
                }
              };

              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                  onClick={handleClick}
                  className="rounded-full transition-all duration-300"
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className="hidden sm:inline ml-2">{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>
        </div>
      </header>
      <UselessFactDialog open={isFactOpen} onOpenChange={setIsFactOpen} />
    </>
  );
};

export default Header;
