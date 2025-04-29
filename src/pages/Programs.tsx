
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const Programs: React.FC = () => {
  // Sample program data
  const programs = [
    { 
      id: 1, 
      name: "Standard Rewards", 
      status: "Active", 
      members: 845,
      description: "Basic point-based loyalty program with standard redemption options.",
      pointsIssued: 456000,
      pointsRedeemed: 213500
    },
    { 
      id: 2, 
      name: "Premium Tier", 
      status: "Active", 
      members: 312,
      description: "Enhanced benefits for customers with higher spending thresholds.",
      pointsIssued: 320000,
      pointsRedeemed: 165000
    },
    { 
      id: 3, 
      name: "Referral Bonus", 
      status: "Active", 
      members: 523,
      description: "Special rewards for members who refer new customers.",
      pointsIssued: 85000,
      pointsRedeemed: 32000
    },
    { 
      id: 4, 
      name: "Seasonal Promotion", 
      status: "Scheduled", 
      members: 0,
      description: "Summer-exclusive rewards with bonus point multipliers.",
      pointsIssued: 0,
      pointsRedeemed: 0
    }
  ];

  // Tiers configuration
  const tiers = [
    { name: "Bronze", threshold: 0, benefits: ["10% off first purchase", "Birthday bonus points", "Monthly newsletter"] },
    { name: "Silver", threshold: 1000, benefits: ["15% off purchases", "Free shipping", "Exclusive promotions", "Birthday bonus points"] },
    { name: "Gold", threshold: 5000, benefits: ["20% off purchases", "Priority customer service", "Free shipping", "Exclusive access to events", "Double points days"] },
    { name: "Platinum", threshold: 10000, benefits: ["25% off purchases", "Dedicated account manager", "Free shipping & returns", "Early access to new products", "Triple points weekends", "Anniversary gifts"] }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Loyalty Programs" 
          subtitle="Configure and manage your loyalty program structures"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Program Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Points Issued</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">861,000</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Points Redeemed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">410,500</div>
                  <p className="text-xs text-muted-foreground mt-1">47.7% redemption rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Programs */}
            <Card>
              <CardHeader>
                <CardTitle>Active Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Points Issued</TableHead>
                      <TableHead>Points Redeemed</TableHead>
                      <TableHead>Redemption Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>
                          <Badge className={program.status === "Active" ? "bg-green-500" : "bg-blue-500"}>
                            {program.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{program.members.toLocaleString()}</TableCell>
                        <TableCell>{program.pointsIssued.toLocaleString()}</TableCell>
                        <TableCell>{program.pointsRedeemed.toLocaleString()}</TableCell>
                        <TableCell>
                          {program.pointsIssued > 0 ? (
                            <>
                              <div className="flex items-center">
                                <Progress 
                                  value={(program.pointsRedeemed / program.pointsIssued) * 100} 
                                  className="h-2 w-full"
                                />
                                <span className="ml-2 text-sm">
                                  {((program.pointsRedeemed / program.pointsIssued) * 100).toFixed(1)}%
                                </span>
                              </div>
                            </>
                          ) : (
                            <span>N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Tier Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Tier Structure</CardTitle>
                <CardDescription>Membership levels and benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((tier, index) => (
                    <Card key={index} className={`border-l-4 ${
                      tier.name === "Bronze" ? "border-l-amber-700" :
                      tier.name === "Silver" ? "border-l-gray-400" :
                      tier.name === "Gold" ? "border-l-yellow-500" :
                      "border-l-purple-500"
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {tier.name}
                          <Badge className="ml-2 text-xs">
                            {tier.threshold.toLocaleString()} pts
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i} className="text-sm">{benefit}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Programs;
