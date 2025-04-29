
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import KpiCards from "@/components/KpiCards";
import SalesOverviewChart from "@/components/SalesOverviewChart";
import ProductPerformance from "@/components/ProductPerformance";
import SalesMap from "@/components/SalesMap";
import TopPerformers from "@/components/TopPerformers";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Sales Dashboard" 
          subtitle="Welcome back! Here's an overview of your pan-India lubricant sales"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* KPI Cards */}
            <section className="animate-fade-in">
              <KpiCards />
            </section>
            
            {/* Sales Charts */}
            <section className="grid md:grid-cols-2 gap-6 animate-slide-in">
              <SalesOverviewChart />
              <ProductPerformance />
            </section>
            
            {/* Map and Top Performers */}
            <section className="grid md:grid-cols-5 gap-6 animate-slide-in">
              <div className="md:col-span-3">
                <SalesMap />
              </div>
              <div className="md:col-span-2">
                <TopPerformers />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
