import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift, ShoppingBag, Ticket, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRewards: 0,
    availableRewards: 0,
    totalRedemptions: 0,
    averageCost: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data, error } = await supabase
          .from('rewards')
          .select('*')
          .order('popularity', { ascending: false });
        
        if (error) throw error;
        
        setRewards(data);
        
        if (data && data.length > 0) {
          // Calculate stats
          const available = data.filter(r => r.available).length;
          const totalRedemptions = data.reduce((sum, r) => sum + r.redeemed, 0);
          const avgCost = Math.round(data.reduce((sum, r) => sum + r.points_cost, 0) / data.length);
          
          setStats({
            totalRewards: data.length,
            availableRewards: available,
            totalRedemptions: totalRedemptions,
            averageCost: avgCost
          });
        }
      } catch (error) {
        console.error("Error fetching rewards:", error);
        // Fallback to sample data
        setRewards([
          { 
            id: 1, 
            name: "$10 Store Credit", 
            category: "Discount",
            points_cost: 500,
            redeemed: 187,
            available: true,
            popularity: 85
          },
          { 
            id: 2, 
            name: "Free Product Sample", 
            category: "Product",
            points_cost: 350,
            redeemed: 256,
            available: true,
            popularity: 92
          },
          { 
            id: 3, 
            name: "25% Off Next Purchase", 
            category: "Discount",
            points_cost: 800,
            redeemed: 98,
            available: true,
            popularity: 74
          },
          { 
            id: 4, 
            name: "Premium Merchandise", 
            category: "Product",
            points_cost: 1200,
            redeemed: 42,
            available: true,
            popularity: 61
          },
          { 
            id: 5, 
            name: "VIP Event Access", 
            category: "Experience",
            points_cost: 2000,
            redeemed: 15,
            available: true,
            popularity: 78
          },
          { 
            id: 6, 
            name: "Free Shipping Voucher", 
            category: "Service",
            points_cost: 300,
            redeemed: 312,
            available: false,
            popularity: 94
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRewards();
  }, []);

  // Category icons
  const categoryIcons: Record<string, JSX.Element> = {
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

  // Count rewards by category
  const getRewardsByCategory = (category: string) => {
    if (!rewards.length) return { count: 0, redemptions: 0 };
    
    const categoryRewards = rewards.filter(r => r.category === category);
    return {
      count: categoryRewards.length,
      redemptions: categoryRewards.reduce((sum, r) => sum + r.redeemed, 0)
    };
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
                  <div className="text-2xl font-bold">{stats.totalRewards}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Available Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.availableRewards}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Redemptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRedemptions}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageCost}</div>
                  <p className="text-xs text-muted-foreground mt-1">points per reward</p>
                </CardContent>
              </Card>
            </div>

            {/* Rewards by Category */}
            <div className="grid gap-4 md:grid-cols-4">
              {Object.keys(categoryIcons).map((category, index) => {
                const categoryData = getRewardsByCategory(category);
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {category} Rewards
                      </CardTitle>
                      <div className="p-1.5 rounded-full bg-muted">
                        {categoryIcons[category]}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {categoryData.count}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {categoryData.redemptions} redemptions
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Rewards Table */}
            <Card>
              <CardHeader>
                <CardTitle>Rewards Catalog</CardTitle>
                <CardDescription>Manage your available loyalty rewards</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <p>Loading rewards...</p>
                  </div>
                ) : (
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
                              {categoryIcons[reward.category]}
                            </div>
                            {reward.category}
                          </TableCell>
                          <TableCell>{reward.points_cost.toLocaleString()}</TableCell>
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
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
