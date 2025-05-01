
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { fetchPromotions, fetchProducts, createPromotion } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

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

// Create form schema using zod for validation
const formSchema = z.object({
  name: z.string().min(3, { message: "Promotion name must be at least 3 characters" }),
  status: z.string(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.coerce.number().min(1, { message: "Budget must be greater than 0" }),
  region: z.string().optional(),
  target_audience: z.string().optional(),
  product_id: z.string().optional(),
});

type PromotionFormValues = z.infer<typeof formSchema>;

const Promotions: React.FC = () => {
  const { toast } = useToast();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  // Form setup
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Draft",
      budget: 1000,
      region: "Global",
      target_audience: "All Members",
    },
  });

  // Fetch promotions data
  const { data: promotions = [], isLoading, error } = useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions
  });

  // Fetch products for the dropdown
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
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
  
  const handleCreatePromotion = async (data: PromotionFormValues) => {
    try {
      await createPromotion(data);
      
      // Close the dialog and show success message
      setCreateDialogOpen(false);
      
      // Reset the form
      form.reset();
      
      // Refetch promotions data
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      
      // Show success toast
      toast({
        title: "Promotion created",
        description: "Your new promotion has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast({
        title: "Error creating promotion",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Promotion</DialogTitle>
            <DialogDescription>
              Create a new marketing promotion or campaign.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreatePromotion)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotion Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {products.map(product => (
                            <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Global">Global</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                          <SelectItem value="South America">South America</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="target_audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="All Members">All Members</SelectItem>
                          <SelectItem value="New Members">New Members</SelectItem>
                          <SelectItem value="Premium Members">Premium Members</SelectItem>
                          <SelectItem value="Inactive Members">Inactive Members</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Create Promotion</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Promotions;
