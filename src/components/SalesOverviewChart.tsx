
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SalesOverviewChart: React.FC = () => {
  const [period, setPeriod] = useState("6m");
  
  // Sample data - in a real app, this would come from an API
  const data = [
    { month: "Apr", revenue: 18.4, volume: 70 },
    { month: "May", revenue: 21.2, volume: 82 },
    { month: "Jun", revenue: 25.8, volume: 96 },
    { month: "Jul", revenue: 28.5, volume: 103 },
    { month: "Aug", revenue: 22.6, volume: 85 },
    { month: "Sep", revenue: 24.9, volume: 91 },
    { month: "Oct", revenue: 28.2, volume: 104 },
    { month: "Nov", revenue: 32.1, volume: 117 },
    { month: "Dec", revenue: 35.6, volume: 127 },
    { month: "Jan", revenue: 33.2, volume: 124 },
    { month: "Feb", revenue: 30.8, volume: 115 },
    { month: "Mar", revenue: 34.5, volume: 128 },
  ];

  // Filter data based on selected period
  const filterData = (periodValue: string) => {
    switch (periodValue) {
      case "3m":
        return data.slice(-3);
      case "6m":
        return data.slice(-6);
      case "1y":
        return data;
      default:
        return data.slice(-6);
    }
  };

  const chartData = filterData(period);

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Sales Overview</CardTitle>
        
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                activeDot={{ r: 6 }}
                strokeWidth={2}
                name="Revenue (₹M)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--secondary))"
                activeDot={{ r: 6 }}
                strokeWidth={2}
                name="Volume (KL)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesOverviewChart;
