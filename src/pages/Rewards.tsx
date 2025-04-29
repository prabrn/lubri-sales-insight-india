
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift, ShoppingBag, Ticket, Wallet } from "lucide-react";

const Rewards: React.FC = () => {
  // Sample rewards data
  const rewards = [
    { 
      id: 1, 
      name: "$10 Store Credit", 
      category: "Discount",
      pointsCost: 500,
      redeemed: 187,
      available: true,
      popularity: 85
    },
    { 
      id: 2, 
      name: "Free Product Sample", 
      category: "Product",
      pointsCost: 350,
      redeemed: 256,
      available: true,
      popularity: 92
    },
    { 
      id: 3, 
      name: "25% Off Next Purchase", 
      category: "Discount",
      pointsCost: 800,
      redeemed: 98,
      available: true,
      popularity: 74
    },
    { 
      id: 4, 
      name: "Premium Merchandise", 
      category: "Product",
      pointsCost: 1200,
      redeemed: 42,
      available: true,
      popularity: 61
    },
    { 
      id: 5, 
      name: "VIP Event Access", 
      category: "Experience",
      pointsCost: 2000,
      redeemed: 15,
      available: true,
      popularity: 78
    },
    { 
      id: 6, 
      name: "Free Shipping Voucher", 
      category: "Service",
      pointsCost: 300,
      redeemed: 312,
      available: false,
      popularity: 94
    }
  ];

  // Category icons
  const categoryIcons = {
    "Discount": <Wallet className="h-5 w-5" />,
    "Product": <ShoppingBag className="h-5 w-5" />,
    "Experience": <Ticket className="h-5 w-5" />,
    "Service": <Gift className="h-5 w-5" />
  };

  // Get color for popularity indicator
  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "bg-green-500";
    if (popularity >= 70) return "bg-blue-500";
    if (popularity >= 50) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Rewards Catalog" 
          subtitle="Manage rewards and redemption options for your loyalty program"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Rewards Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Available Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Redemptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">910</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">858</div>
                  <p className="text-xs text-muted-foreground mt-1">points per reward</p>
                </CardContent>
              </Card>
            </div>

            {/* Rewards by Category */}
            <div className="grid gap-4 md:grid-cols-4">
              {Object.keys(categoryIcons).map((category, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {category} Rewards
                    </CardTitle>
                    <div className="p-1.5 rounded-full bg-muted">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rewards.filter(r => r.category === category).length}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rewards.filter(r => r.category === category).reduce((sum, r) => sum + r.redeemed, 0)} redemptions
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rewards Table */}
            <Card>
              <CardHeader>
                <CardTitle>Rewards Catalog</CardTitle>
                <CardDescription>Manage your available loyalty rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reward Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Points Cost</TableHead>
                      <TableHead>Redeemed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Popularity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewards.map((reward) => (
                      <TableRow key={reward.id}>
                        <TableCell className="font-medium">{reward.name}</TableCell>
                        <TableCell className="flex items-center">
                          <div className="mr-2">
                            {categoryIcons[reward.category as keyof typeof categoryIcons]}
                          </div>
                          {reward.category}
                        </TableCell>
                        <TableCell>{reward.pointsCost.toLocaleString()}</TableCell>
                        <TableCell>{reward.redeemed.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={reward.available ? "bg-green-500" : "bg-red-500"}>
                            {reward.available ? "Available" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-full h-2 rounded-full ${getPopularityColor(reward.popularity)}`} 
                                style={{ width: `${reward.popularity}%`, minWidth: '20px' }}>
                            </div>
                            <span>{reward.popularity}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
