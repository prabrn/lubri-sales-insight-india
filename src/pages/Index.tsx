
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import LoyaltyKpiCards from "@/components/LoyaltyKpiCards";
import LoyaltyOverviewChart from "@/components/LoyaltyOverviewChart";
import TopLoyaltyMembers from "@/components/TopLoyaltyMembers";
import LoyaltyTierDistribution from "@/components/LoyaltyTierDistribution";
import RewardRedemptionHistory from "@/components/RewardRedemptionHistory";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Loyalty Program Dashboard" 
          subtitle="Welcome back! Track and manage your lubricant loyalty program performance"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* KPI Cards */}
            <section className="animate-fade-in">
              <LoyaltyKpiCards />
            </section>
            
            {/* Loyalty Overview */}
            <section className="grid md:grid-cols-2 gap-6 animate-slide-in">
              <LoyaltyOverviewChart />
              <LoyaltyTierDistribution />
            </section>
            
            {/* Members and Redemption */}
            <section className="grid md:grid-cols-5 gap-6 animate-slide-in">
              <div className="md:col-span-2">
                <TopLoyaltyMembers />
              </div>
              <div className="md:col-span-3">
                <RewardRedemptionHistory />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
