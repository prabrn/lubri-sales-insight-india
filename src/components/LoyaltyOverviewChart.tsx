
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BadgeHelpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { month: 'Jan', members: 4800, points: 1200000, redemptions: 780 },
  { month: 'Feb', members: 5200, points: 1320000, redemptions: 820 },
  { month: 'Mar', members: 5600, points: 1450000, redemptions: 900 },
  { month: 'Apr', members: 6100, points: 1580000, redemptions: 950 },
  { month: 'May', members: 6500, points: 1650000, redemptions: 980 },
  { month: 'Jun', members: 6900, points: 1750000, redemptions: 1050 },
  { month: 'Jul', members: 7300, points: 1870000, redemptions: 1120 },
  { month: 'Aug', members: 7600, points: 1950000, redemptions: 1180 },
  { month: 'Sep', members: 8000, points: 2100000, redemptions: 1210 },
  { month: 'Oct', members: 8300, points: 2200000, redemptions: 1240 },
  { month: 'Nov', members: 8500, points: 2300000, redemptions: 1220 },
  { month: 'Dec', members: 8742, points: 2400000, redemptions: 1245 },
];

const LoyaltyOverviewChart: React.FC = () => {
  const [metric, setMetric] = React.useState<'members' | 'points' | 'redemptions'>('members');

  const metrics = {
    members: {
      name: 'Members',
      color: '#0066cc',
      formatter: (value: number) => `${value.toLocaleString()} members`
    },
    points: {
      name: 'Points',
      color: '#00cc99',
      formatter: (value: number) => `${(value/1000000).toFixed(1)}M points`
    },
    redemptions: {
      name: 'Redemptions',
      color: '#ff6600',
      formatter: (value: number) => `${value.toLocaleString()} redemptions`
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Loyalty Program Overview</CardTitle>
          <CardDescription>12-month program performance</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={metric === 'members' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setMetric('members')}
          >
            Members
          </Button>
          <Button 
            variant={metric === 'points' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setMetric('points')}
          >
            Points
          </Button>
          <Button 
            variant={metric === 'redemptions' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setMetric('redemptions')}
          >
            Redemptions
          </Button>
          <Button variant="ghost" size="icon">
            <BadgeHelpIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                style={{ fontSize: '12px' }} 
                tickFormatter={(value) => {
                  if (metric === 'members') return `${value/1000}k`;
                  if (metric === 'points') return `${value/1000000}M`;
                  return value.toString();
                }}
              />
              <Tooltip 
                formatter={(value: number) => metrics[metric].formatter(value)}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={metric}
                name={metrics[metric].name}
                stroke={metrics[metric].color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyOverviewChart;
