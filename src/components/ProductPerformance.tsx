
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductPerformance: React.FC = () => {
  const [category, setCategory] = useState("all");
  
  const productCategories = {
    all: [
      { name: "Engine Oil", sales: 14.2 },
      { name: "Hydraulic", sales: 9.8 },
      { name: "Grease", sales: 5.4 },
      { name: "Transmission", sales: 4.6 },
      { name: "Coolants", sales: 2.8 },
      { name: "Others", sales: 1.4 }
    ],
    automotive: [
      { name: "Engine Oil", sales: 14.2 },
      { name: "Transmission", sales: 4.6 },
      { name: "Brake Fluid", sales: 1.2 },
      { name: "Others", sales: 0.7 }
    ],
    industrial: [
      { name: "Hydraulic", sales: 9.8 },
      { name: "Grease", sales: 5.4 },
      { name: "Coolants", sales: 2.8 },
      { name: "Others", sales: 0.7 }
    ]
  };

  const colors = [
    "hsl(var(--primary))", 
    "hsl(var(--secondary))",
    "hsl(var(--accent))", 
    "#63B3ED", 
    "#F687B3", 
    "#B794F4"
  ];

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Product Category Performance</CardTitle>
          <Tabs defaultValue={category} onValueChange={setCategory}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="automotive">Automotive</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productCategories[category as keyof typeof productCategories]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`₹${value}M`, "Sales"]}
              />
              <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                {productCategories[category as keyof typeof productCategories].map(
                  (_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
