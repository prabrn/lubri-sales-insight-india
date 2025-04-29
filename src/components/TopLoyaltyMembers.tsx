
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BadgeCheck } from "lucide-react";

const topMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    points: 48500,
    nextTier: 50000,
    tier: "Gold",
    region: "North",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya Sharma",
    points: 62300,
    nextTier: 75000,
    tier: "Platinum",
    region: "West",
    avatar: "PS"
  },
  {
    id: 3,
    name: "Amit Patel",
    points: 32100,
    nextTier: 35000,
    tier: "Silver",
    region: "South",
    avatar: "AP"
  },
  {
    id: 4,
    name: "Deepa Singh",
    points: 28700,
    nextTier: 35000,
    tier: "Silver",
    region: "East",
    avatar: "DS"
  },
  {
    id: 5,
    name: "Vikram Mehta",
    points: 45200,
    nextTier: 50000,
    tier: "Gold",
    region: "Central",
    avatar: "VM"
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Bronze": return "bg-amber-700";
    case "Silver": return "bg-gray-400";
    case "Gold": return "bg-yellow-500";
    case "Platinum": return "bg-slate-300";
    default: return "bg-gray-400";
  }
};

const TopLoyaltyMembers: React.FC = () => {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Top Loyalty Members</CardTitle>
        <CardDescription>Members closest to tier upgrades</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Member</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                        {member.avatar}
                      </div>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full ${getTierColor(member.tier)} mr-1`}></span>
                        <span>{member.tier}</span>
                        <span className="mx-1">•</span>
                        <span>{member.region}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {member.points.toLocaleString()}
                </TableCell>
                <TableCell className="w-[160px]">
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(member.points / member.nextTier) * 100}
                      className="h-2" 
                    />
                    <div className="w-9 text-xs text-muted-foreground">
                      {Math.round((member.points / member.nextTier) * 100)}%
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopLoyaltyMembers;
