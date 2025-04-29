
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Rewards: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Rewards Catalog" 
          subtitle="Manage rewards and redemption options for your loyalty program"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
              <p className="text-muted-foreground">
                This page will contain the rewards catalog management system, where you can add,
                edit, and remove rewards, set point values, and track redemption statistics.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
