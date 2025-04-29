
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { ChartContainer, ChartTitle } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Transactions: React.FC = () => {
  // Sample transaction data
  const transactions = [
    { 
      id: "TRX-5823", 
      member: "John Smith",
      type: "Earned", 
      points: 250,
      reason: "Purchase",
      date: "2025-04-29 14:32",
      status: "Completed"
    },
    { 
      id: "TRX-5822", 
      member: "Emma Wilson",
      type: "Redeemed", 
      points: 500,
      reason: "$10 Store Credit",
      date: "2025-04-29 13:18",
      status: "Completed"
    },
    { 
      id: "TRX-5821", 
      member: "Michael Brown",
      type: "Earned", 
      points: 150,
      reason: "Referral Bonus",
      date: "2025-04-29 11:45",
      status: "Completed"
    },
    { 
      id: "TRX-5820", 
      member: "Sarah Johnson",
      type: "Redeemed", 
      points: 350,
      reason: "Free Product Sample",
      date: "2025-04-29 10:22",
      status: "Completed"
    },
    { 
      id: "TRX-5819", 
      member: "David Lee",
      type: "Earned", 
      points: 75,
      reason: "Birthday Bonus",
      date: "2025-04-28 16:50",
      status: "Completed"
    },
    { 
      id: "TRX-5818", 
      member: "Jennifer Garcia",
      type: "Adjusted", 
      points: 100,
      reason: "Customer Service",
      date: "2025-04-28 14:15",
      status: "Completed"
    },
    { 
      id: "TRX-5817", 
      member: "Robert Wilson",
      type: "Earned", 
      points: 200,
      reason: "Purchase",
      date: "2025-04-28 11:30",
      status: "Completed"
    },
    { 
      id: "TRX-5816", 
      member: "Lisa Martinez",
      type: "Redeemed", 
      points: 800,
      reason: "25% Off Coupon",
      date: "2025-04-28 09:05",
      status: "Completed"
    }
  ];

  // Transaction type indicator
  const getTransactionTypeIndicator = (type: string) => {
    switch (type) {
      case "Earned":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "Redeemed":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case "Adjusted":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTransactionBadgeColor = (type: string) => {
    switch (type) {
      case "Earned":
        return "bg-green-500 hover:bg-green-600";
      case "Redeemed":
        return "bg-red-500 hover:bg-red-600";
      case "Adjusted":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Chart data
  const chartData = [
    { date: "Apr 23", earned: 1250, redeemed: 850 },
    { date: "Apr 24", earned: 1480, redeemed: 920 },
    { date: "Apr 25", earned: 1620, redeemed: 1050 },
    { date: "Apr 26", earned: 1350, redeemed: 780 },
    { date: "Apr 27", earned: 950, redeemed: 690 },
    { date: "Apr 28", earned: 1580, redeemed: 1120 },
    { date: "Apr 29", earned: 1820, redeemed: 1340 }
  ];

  const config = {
    earned: {
      label: "Points Earned",
      theme: {
        light: "rgba(34, 197, 94, 0.6)",
        dark: "rgba(34, 197, 94, 0.6)"
      }
    },
    redeemed: {
      label: "Points Redeemed",
      theme: {
        light: "rgba(239, 68, 68, 0.6)",
        dark: "rgba(239, 68, 68, 0.6)"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Transactions History" 
          subtitle="View and manage loyalty point transactions"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Transaction Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,482</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254,320</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Points Redeemed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187,450</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Redemption Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73.7%</div>
                  <p className="text-xs text-muted-foreground mt-1">Points redeemed / earned</p>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Points Activity - Last 7 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={config} className="h-[300px]">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="earnedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="redeemedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(239, 68, 68)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="rgb(239, 68, 68)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="earned" name="Points Earned" stroke="#22c55e" fillOpacity={1} fill="url(#earnedGradient)" />
                    <Area type="monotone" dataKey="redeemed" name="Points Redeemed" stroke="#ef4444" fillOpacity={1} fill="url(#redeemedGradient)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Transaction Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                        <TableCell>{transaction.member}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {getTransactionTypeIndicator(transaction.type)}
                            <Badge className={getTransactionBadgeColor(transaction.type)}>
                              {transaction.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className={`font-medium ${
                          transaction.type === "Earned" ? "text-green-600" :
                          transaction.type === "Redeemed" ? "text-red-600" :
                          "text-blue-600"
                        }`}>
                          {transaction.type === "Redeemed" ? "-" : "+"}{transaction.points}
                        </TableCell>
                        <TableCell>{transaction.reason}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
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

export default Transactions;
