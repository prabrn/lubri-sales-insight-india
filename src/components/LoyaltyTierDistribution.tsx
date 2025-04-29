
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BadgeHelpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: 'Bronze', value: 4250, color: '#CD7F32' },
  { name: 'Silver', value: 2650, color: '#C0C0C0' },
  { name: 'Gold', value: 1420, color: '#FFD700' },
  { name: 'Platinum', value: 422, color: '#E5E4E2' },
];

const LoyaltyTierDistribution: React.FC = () => {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Membership Tier Distribution</CardTitle>
          <CardDescription>Active members by tier level</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <BadgeHelpIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} members`, 'Members']}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyTierDistribution;
