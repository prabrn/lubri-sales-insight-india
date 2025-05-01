
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { fetchPromotions } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define a type for the product data
type ProductData = {
  name: string;
  category: string;
};

// Define a type for the promotion with optional products
type PromotionWithProduct = {
  id: string;
  name: string;
  status: string;
  start_date?: string;
  end_date?: string;
  enrolled_members: number;
  points_awarded: number;
  budget: number;
  percent_used: number;
  region?: string;
  target_audience?: string;
  product_id?: string;
  created_at: string;
  updated_at: string;
  products?: ProductData | null;
};

const Promotions: React.FC = () => {
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Fetch promotions data
  const { data: promotions = [], isLoading, error } = useQuery<PromotionWithProduct[]>({
    queryKey: ['promotions'],
    queryFn: fetchPromotions
  });

  // Show error toast if data fetching fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching promotions",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Scheduled": return "bg-blue-500";
      case "Draft": return "bg-gray-500";
      case "Completed": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case "North America": return "bg-blue-100 text-blue-800";
      case "Europe": return "bg-green-100 text-green-800";
      case "Asia Pacific": return "bg-purple-100 text-purple-800";
      case "South America": return "bg-yellow-100 text-yellow-800";
      case "Global": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate totals
  const activePromotions = promotions.filter(p => p.status === "Active").length;
  const totalEnrolled = promotions.reduce((sum, p) => sum + p.enrolled_members, 0);
  const totalPointsAwarded = promotions.reduce((sum, p) => sum + p.points_awarded, 0);
  
  const handleCreatePromotion = () => {
    // For now, just show a success toast
    toast({
      title: "Coming soon!",
      description: "Promotion creation functionality will be implemented soon.",
    });
    setCreateDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Promotions & Campaigns" 
          subtitle="Create and track special offers and promotional campaigns"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Action Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Promotion
                </Button>
              </div>
              
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
                        <TableHead>Product</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Target Audience</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
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
                          <TableCell>{promotion.products?.name || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRegionColor(promotion.region || "")}>
                              {promotion.region || "—"}
                            </Badge>
                          </TableCell>
                          <TableCell>{promotion.target_audience || "—"}</TableCell>
                          <TableCell>{promotion.start_date || "—"}</TableCell>
                          <TableCell>{promotion.end_date || "—"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={promotion.percent_used} className="h-2 w-full" />
                              <span className="text-sm">{promotion.percent_used}%</span>
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
                          {promotion.start_date} to {promotion.end_date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm font-medium mb-1">Product</div>
                              <div className="font-medium">{promotion.products?.name || "—"}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-1">Region</div>
                              <Badge variant="outline" className={getRegionColor(promotion.region || "")}>
                                {promotion.region || "—"}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Target Audience</div>
                            <div className="font-medium">{promotion.target_audience || "—"}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Enrolled Members</div>
                            <div className="text-2xl font-bold">{promotion.enrolled_members.toLocaleString()}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium mb-1">Points Awarded</div>
                            <div className="text-2xl font-bold">{promotion.points_awarded.toLocaleString()}</div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm font-medium mb-1">
                              <span>Budget Usage</span>
                              <span>{promotion.percent_used}%</span>
                            </div>
                            <Progress value={promotion.percent_used} className="h-2 w-full" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Create Promotion Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Promotion</DialogTitle>
            <DialogDescription>
              Create a new marketing promotion or campaign.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Promotion creation form will be implemented here.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreatePromotion}>Create Promotion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Promotions;
