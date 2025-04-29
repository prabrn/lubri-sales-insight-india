
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Promotions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Promotions & Campaigns" 
          subtitle="Create and track special offers and promotional campaigns"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Promotions</h2>
              <p className="text-muted-foreground">
                This page will contain tools to create time-limited promotions, bonus point campaigns,
                special offers, and track their performance and engagement metrics.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Promotions;
