
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, BadgeDollarSign, BadgeCheck } from "lucide-react";

const LoyaltyKpiCards: React.FC = () => {
  const kpis = [
    {
      title: "Total Members",
      value: "8,742",
      change: "+14%",
      trend: "up",
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Active loyalty program members"
    },
    {
      title: "Reward Points",
      value: "2.4M",
      change: "+8%",
      trend: "up",
      icon: <BadgeDollarSign className="h-6 w-6 text-primary" />,
      description: "Total outstanding points"
    },
    {
      title: "Retention Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: <BadgeCheck className="h-6 w-6 text-primary" />,
      description: "Member retention YoY"
    },
    {
      title: "Reward Redemptions",
      value: "1,245",
      change: "+23%",
      trend: "up",
      icon: <Award className="h-6 w-6 text-primary" />,
      description: "This month"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{kpi.description}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                {kpi.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoyaltyKpiCards;
