
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RegionData {
  name: string;
  value: number;
  percentage: number;
}

const SalesMap: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-quarter");
  
  const regions: RegionData[] = [
    { name: "North", value: 12.4, percentage: 32 },
    { name: "South", value: 9.7, percentage: 25 },
    { name: "East", value: 6.6, percentage: 17 },
    { name: "West", value: 8.2, percentage: 21 },
    { name: "Central", value: 1.9, percentage: 5 },
  ].sort((a, b) => b.value - a.value);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Regional Sales Distribution</CardTitle>
          <Tabs defaultValue={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="this-month">Month</TabsTrigger>
              <TabsTrigger value="this-quarter">Quarter</TabsTrigger>
              <TabsTrigger value="this-year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-7 gap-6">
          <div className="md:col-span-4 aspect-[4/3] flex items-center justify-center rounded-lg border bg-muted p-2">
            {/* Placeholder for India map - in production would use a mapping library */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Interactive India map with regional sales data
                </p>
              </div>
              {/* North region hotspot */}
              <div className="absolute left-1/2 top-1/4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              {/* South region hotspot */}
              <div className="absolute left-1/2 bottom-1/4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              {/* East region hotspot */}
              <div className="absolute right-1/3 top-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
              {/* West region hotspot */}
              <div className="absolute left-1/3 top-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
              {/* Central region hotspot */}
              <div className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="text-sm text-muted-foreground mb-3">Top performing regions by sales volume</div>
            
            <div className="space-y-4">
              {regions.map((region, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{region.name} India</span>
                    <span>₹{region.value}M</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{region.percentage}% of total</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesMap;
