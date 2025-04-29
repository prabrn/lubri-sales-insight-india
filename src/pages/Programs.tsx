
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Programs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Loyalty Programs" 
          subtitle="Configure and manage your loyalty program structures"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Program Configuration</h2>
              <p className="text-muted-foreground">
                This page will contain the tools to create and manage different loyalty programs,
                set point systems, configure tier levels, and establish program rules.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Programs;
