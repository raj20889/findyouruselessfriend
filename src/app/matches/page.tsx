"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Vote, HeartPulse, Sliders } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const boysCount = 1337;
const girlsCount = 9001;
const totalUsers = boysCount + girlsCount;

const data = [
  { name: 'Girls', value: girlsCount, color: "hsl(var(--chart-1))" },
  { name: 'Boys', value: boysCount, color: "hsl(var(--chart-2))"  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-sm font-bold">
      {value}
    </text>
  );
};


export default function MatchesPage() {

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in-50 duration-500">
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
            <CardTitle className="flex items-center gap-2"><Vote /> User Distribution</CardTitle>
            <CardDescription>How the battlefield is divided.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                   <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
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

        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sliders /> Useless-o-Meter</CardTitle>
            <CardDescription>Overall uselessness index of our userbase.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 justify-center h-full pb-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not Useless</span>
              <span>Extremely Useless</span>
            </div>
            <Progress value={73} className="h-4" />
            <p className="text-center text-lg font-semibold mt-2">73% Useless! <span className="text-sm font-normal text-muted-foreground">(That's a good thing here)</span></p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/70 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HeartPulse/> Top Useless Trait</CardTitle>
            <CardDescription>The most common reason for being the third wheel.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full pb-6">
            <p className="text-3xl font-bold text-center text-primary/90 p-4 rounded-lg bg-primary/10">"Just has chaotic vibes"</p>
            <p className="text-muted-foreground mt-4 text-center">A classic for a reason. Embrace the chaos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
