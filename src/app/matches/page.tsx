"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/contexts/theme-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';

const boysCount = 1337;
const girlsCount = 9001;

const data = [
  { name: 'Girls', count: girlsCount, color: "hsl(var(--chart-1))" },
  { name: 'Boys', count: boysCount, color: "hsl(var(--chart-2))"  },
];

export default function MatchesPage() {
    const { theme } = useTheme();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Useless Analytics
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A deep dive into the science of uselessness. Trust us bro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users/> Head-to-Head</CardTitle>
            <CardDescription>Who's more committed to finding useless friends?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--foreground))', fontSize: 16 }} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Bar dataKey="count" barSize={60} radius={[0, 8, 8, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/70 backdrop-blur-lg flex flex-col justify-center items-center p-8 text-center">
            <h3 className="text-2xl font-bold">The Verdict Is In...</h3>
            <p className="text-4xl md:text-5xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {girlsCount > boysCount ? "Girls are winning!" : "Boys are winning!"}
            </p>
            <p className="text-muted-foreground">
                With a staggering {Math.max(girlsCount, boysCount)} users, they are clearly more dedicated to the art of uselessness. Science has spoken.
            </p>
        </Card>
      </div>
    </div>
  );
}
