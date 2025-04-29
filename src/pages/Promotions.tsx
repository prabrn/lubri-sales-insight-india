
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const Promotions: React.FC = () => {
  // Sample promotions data
  const promotions = [
    { 
      id: 1, 
      name: "Summer Sale Double Points", 
      status: "Active",
      startDate: "2025-04-01",
      endDate: "2025-05-31",
      enrolledMembers: 324,
      pointsAwarded: 15600,
      budget: 40000,
      percentUsed: 39
    },
    { 
      id: 2, 
      name: "New Member Bonus", 
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      enrolledMembers: 128,
      pointsAwarded: 12800,
      budget: 30000,
      percentUsed: 42.7
    },
    { 
      id: 3, 
      name: "Birthday Month Special", 
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      enrolledMembers: 92,
      pointsAwarded: 9200,
      budget: 20000,
      percentUsed: 46
    },
    { 
      id: 4, 
      name: "Anniversary Celebration", 
      status: "Scheduled",
      startDate: "2025-07-15",
      endDate: "2025-08-15",
      enrolledMembers: 0,
      pointsAwarded: 0,
      budget: 25000,
      percentUsed: 0
    },
    { 
      id: 5, 
      name: "Holiday Season Bonus", 
      status: "Draft",
      startDate: "",
      endDate: "",
      enrolledMembers: 0,
      pointsAwarded: 0,
      budget: 50000,
      percentUsed: 0
    },
    { 
      id: 6, 
      name: "Spring Flash Sale", 
      status: "Completed",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
      enrolledMembers: 256,
      pointsAwarded: 23040,
      budget: 20000,
      percentUsed: 100
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Scheduled": return "bg-blue-500";
      case "Draft": return "bg-gray-500";
      case "Completed": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  // Calculate totals
  const activePromotions = promotions.filter(p => p.status === "Active").length;
  const totalEnrolled = promotions.reduce((sum, p) => sum + p.enrolledMembers, 0);
  const totalPointsAwarded = promotions.reduce((sum, p) => sum + p.pointsAwarded, 0);
  
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Promotions & Campaigns" 
          subtitle="Create and track special offers and promotional campaigns"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Promotion Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Promotions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{promotions.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activePromotions}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrolled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalEnrolled.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Points Awarded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPointsAwarded.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>

            {/* Promotions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Promotion Campaigns</CardTitle>
                <CardDescription>Track and manage your promotional activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Promotion Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Points Awarded</TableHead>
                      <TableHead>Budget Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promotions.map((promotion) => (
                      <TableRow key={promotion.id}>
                        <TableCell className="font-medium">{promotion.name}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(promotion.status)}>
                            {promotion.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{promotion.startDate || "—"}</TableCell>
                        <TableCell>{promotion.endDate || "—"}</TableCell>
                        <TableCell>{promotion.enrolledMembers.toLocaleString()}</TableCell>
                        <TableCell>{promotion.pointsAwarded.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={promotion.percentUsed} className="h-2 w-full" />
                            <span className="text-sm">{promotion.percentUsed}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Active Promotions */}
            <div className="grid gap-4 md:grid-cols-3">
              {promotions
                .filter(p => p.status === "Active")
                .map((promotion) => (
                  <Card key={promotion.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{promotion.name}</CardTitle>
                        <Badge className={getStatusBadgeColor(promotion.status)}>
                          {promotion.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {promotion.startDate} to {promotion.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-1">Enrolled Members</div>
                          <div className="text-2xl font-bold">{promotion.enrolledMembers.toLocaleString()}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-1">Points Awarded</div>
                          <div className="text-2xl font-bold">{promotion.pointsAwarded.toLocaleString()}</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm font-medium mb-1">
                            <span>Budget Usage</span>
                            <span>{promotion.percentUsed}%</span>
                          </div>
                          <Progress value={promotion.percentUsed} className="h-2 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Promotions;
