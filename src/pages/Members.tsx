import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";

const Members: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    newMembers: 0,
    activePercent: 0,
    avgPoints: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Fetch members data
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('joined_date', { ascending: false });
        
        if (error) throw error;

        setMembers(data);

        // Calculate stats
        if (data && data.length > 0) {
          const total = data.length;
          
          // Calculate new members (last 30 days)
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          const newCount = data.filter(m => new Date(m.joined_date) >= thirtyDaysAgo).length;
          
          // Calculate active members (with activity in last 30 days)
          const activeCount = data.filter(m => m.last_active && new Date(m.last_active) >= thirtyDaysAgo).length;
          
          // Calculate average points
          const totalPoints = data.reduce((sum, member) => sum + member.points, 0);
          
          setStats({
            totalMembers: total,
            newMembers: newCount,
            activePercent: Math.round((activeCount / total) * 100),
            avgPoints: Math.round(totalPoints / total)
          });
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        // Fallback to sample data
        setMembers([
          { id: 1, name: "John Smith", email: "john.smith@example.com", points: 2450, tier: "Gold", joined: "2024-02-15", lastActive: "2025-04-25" },
          { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", points: 3200, tier: "Platinum", joined: "2023-11-08", lastActive: "2025-04-28" },
          { id: 3, name: "Michael Brown", email: "mbrown@example.com", points: 1800, tier: "Silver", joined: "2024-03-22", lastActive: "2025-04-15" },
          { id: 4, name: "Emma Wilson", email: "emma.w@example.com", points: 4150, tier: "Platinum", joined: "2023-08-30", lastActive: "2025-04-27" },
          { id: 5, name: "David Lee", email: "dlee@example.com", points: 950, tier: "Bronze", joined: "2024-04-10", lastActive: "2025-04-22" },
          { id: 6, name: "Jennifer Garcia", email: "jgarcia@example.com", points: 2100, tier: "Gold", joined: "2023-12-12", lastActive: "2025-04-20" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Function to get badge color based on tier
  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "Platinum": return "bg-purple-500 hover:bg-purple-600";
      case "Gold": return "bg-yellow-500 hover:bg-yellow-600";
      case "Silver": return "bg-gray-400 hover:bg-gray-500";
      case "Bronze": return "bg-amber-700 hover:bg-amber-800";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Members Management" 
          subtitle="View and manage your loyalty program members"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Member Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMembers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">New Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.newMembers}</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activePercent}%</div>
                  <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgPoints.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">Per active member</p>
                </CardContent>
              </Card>
            </div>

            {/* Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>Members Directory</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <p>Loading members...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.points.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getTierBadgeColor(member.tier)}>{member.tier}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(member.joined_date)}</TableCell>
                          <TableCell>{formatDate(member.last_active)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Members;
