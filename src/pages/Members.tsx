
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const Members: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Members Management" 
          subtitle="View and manage your loyalty program members"
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Members Directory</h2>
              <p className="text-muted-foreground">
                This page will contain the members listing, search functionality, filtering options, 
                and tools to manage member profiles and loyalty status.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Members;
