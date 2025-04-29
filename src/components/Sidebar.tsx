
import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Users, 
  Award, 
  Gift, 
  BadgePercent, 
  Settings, 
  LogOut,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Award, label: "Programs", path: "/programs" },
    { icon: Gift, label: "Rewards", path: "/rewards" },
    { icon: BadgePercent, label: "Promotions", path: "/promotions" },
    { icon: Wallet, label: "Transactions", path: "/transactions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center p-4 border-b border-sidebar-border">
        {expanded && (
          <div className="flex items-center flex-1">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
              LP
            </div>
            <span className="ml-2 font-semibold">Loyalty Program</span>
          </div>
        )}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  currentPath === item.path
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon size={20} />
                {expanded && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button className={cn(
          "flex items-center py-2 px-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full transition-colors",
          !expanded && "justify-center"
        )}>
          <LogOut size={20} />
          {expanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
