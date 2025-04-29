
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, BadgeIndianRupee, HandCoins, Gift, Wallet } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const redemptions = [
  {
    id: "RD-7845",
    member: "Rajesh Kumar",
    date: "2023-04-25",
    reward: "Lubricant Service Pack",
    points: 5000,
    status: "completed",
    value: "₹2,500",
    icon: Gift
  },
  {
    id: "RD-7844",
    member: "Priya Sharma",
    date: "2023-04-24",
    reward: "Cash Discount",
    points: 7500,
    status: "completed",
    value: "₹3,750",
    icon: BadgeIndianRupee
  },
  {
    id: "RD-7843",
    member: "Amit Patel",
    date: "2023-04-23",
    reward: "Free Oil Change",
    points: 4000,
    status: "pending",
    value: "₹2,000",
    icon: HandCoins
  },
  {
    id: "RD-7842",
    member: "Vikram Mehta",
    date: "2023-04-22",
    reward: "Gift Voucher",
    points: 8000,
    status: "completed",
    value: "₹4,000",
    icon: Award
  },
  {
    id: "RD-7841",
    member: "Deepa Singh",
    date: "2023-04-21",
    reward: "Wallet Credit",
    points: 3000,
    status: "completed",
    value: "₹1,500",
    icon: Wallet
  },
  {
    id: "RD-7840",
    member: "Suresh Reddy",
    date: "2023-04-20",
    reward: "Free Oil Change",
    points: 4000,
    status: "pending",
    value: "₹2,000",
    icon: HandCoins
  }
];

const RewardRedemptionHistory: React.FC = () => {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Recent Reward Redemptions</CardTitle>
            <CardDescription>Member reward activity</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground">
              This Month
            </Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[90px]">ID</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Member</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redemptions.map((redemption) => {
              const Icon = redemption.icon;
              return (
                <TableRow key={redemption.id}>
                  <TableCell className="font-medium">{redemption.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{redemption.reward}</span>
                    </div>
                  </TableCell>
                  <TableCell>{redemption.member}</TableCell>
                  <TableCell className="text-right">
                    {redemption.points.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {redemption.value}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={redemption.status === "completed" ? "default" : "outline"}
                      className={redemption.status === "pending" ? "text-orange-500 border-orange-200 bg-orange-100" : ""}
                    >
                      {redemption.status === "completed" ? "Complete" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RewardRedemptionHistory;
