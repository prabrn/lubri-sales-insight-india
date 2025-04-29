
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformerData {
  name: string;
  location: string;
  sales: number;
  change: number;
  target: number;
}

const TopPerformers: React.FC = () => {
  const distributors: PerformerData[] = [
    {
      name: "Raj Lubricants",
      location: "Mumbai, MH",
      sales: 3.82,
      change: 12,
      target: 95
    },
    {
      name: "Krishna Oils",
      location: "Delhi, DL",
      sales: 3.44,
      change: 8,
      target: 87
    },
    {
      name: "Vishnu Distributors",
      location: "Chennai, TN",
      sales: 2.91,
      change: -2,
      target: 78
    },
    {
      name: "Singh Brothers Ltd",
      location: "Chandigarh, PB",
      sales: 2.73,
      change: 15,
      target: 92
    },
    {
      name: "Mehta Enterprises",
      location: "Ahmedabad, GJ",
      sales: 2.45,
      change: 6,
      target: 84
    }
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Performing Distributors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {distributors.map((distributor, index) => (
            <div key={index} className="flex items-center">
              <div className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-white mr-3",
                index === 0 ? "bg-yellow-500" : 
                index === 1 ? "bg-gray-400" :
                index === 2 ? "bg-amber-700" : "bg-primary"
              )}>
                {index < 3 ? <Medal className="h-4 w-4" /> : (index + 1)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{distributor.name}</h4>
                    <p className="text-xs text-muted-foreground">{distributor.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{distributor.sales}M</div>
                    <div className={cn(
                      "flex items-center text-xs",
                      distributor.change > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {distributor.change > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(distributor.change)}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        distributor.target >= 90 ? "bg-green-500" :
                        distributor.target >= 75 ? "bg-yellow-500" : "bg-red-500"
                      )}
                      style={{ width: `${distributor.target}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Target completion</span>
                    <span>{distributor.target}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
