
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp, Droplets, Truck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    percentage: number;
    isPositive: boolean;
  };
  icon: React.ElementType;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  className 
}) => {
  return (
    <Card className={cn("shadow-card overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            <div className="flex items-center mt-2">
              <div className={cn(
                "flex items-center p-1 rounded text-xs font-medium",
                change.isPositive 
                  ? "text-green-700 bg-green-50" 
                  : "text-red-700 bg-red-50"
              )}>
                {change.isPositive 
                  ? <ArrowUp className="h-3 w-3 mr-1" /> 
                  : <ArrowDown className="h-3 w-3 mr-1" />
                }
                {change.percentage}%
              </div>
              <span className="text-xs text-muted-foreground ml-1.5">vs last period</span>
            </div>
          </div>
          
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center",
            "bg-primary/10 text-primary"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const KpiCards: React.FC = () => {
  const kpis = [
    {
      title: "Total Revenue",
      value: "₹38.2M",
      change: { value: "+₹4.5M", percentage: 13.2, isPositive: true },
      icon: TrendingUp,
      className: "border-l-4 border-l-primary"
    },
    {
      title: "Sales Volume",
      value: "142K L",
      change: { value: "+15K L", percentage: 11.8, isPositive: true },
      icon: Droplets,
      className: "border-l-4 border-l-secondary" 
    },
    {
      title: "Active Distributors",
      value: "842",
      change: { value: "+24", percentage: 2.9, isPositive: true },
      icon: Users,
      className: "border-l-4 border-l-accent"
    },
    {
      title: "Deliveries",
      value: "1,286",
      change: { value: "-52", percentage: 3.9, isPositive: false },
      icon: Truck,
      className: "border-l-4 border-l-destructive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          icon={kpi.icon}
          className={kpi.className}
        />
      ))}
    </div>
  );
};

export default KpiCards;
