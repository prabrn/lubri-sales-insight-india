
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Transactions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Transactions History" 
          subtitle="View and manage loyalty point transactions"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Transaction Log</h2>
              <p className="text-muted-foreground">
                This page will display a comprehensive transaction history, including point earnings,
                redemptions, adjustments, and provide filtering and export capabilities.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
