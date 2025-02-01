import { Sidebar } from "@/components/sidebar";
import { KpiCard } from "@/components/kpi-card";
import { AnalyticsChart } from "@/components/analytics-chart";
import { GrowthChart } from "@/components/growth-chart";
import { RecentActivity } from "@/components/recent-activity";
import Dynamicqss from "@/components/SqQs";

export default function Dynamicc() {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      {/* Sticky Sidebar */}
      <div style={styles.sidebarContainer}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8" style={styles.mainContent}>
        <Dynamicqss />  
      </main>
    </div>
  );
}

const styles = {
  sidebarContainer: {
    position: 'fixed', // Make the sidebar sticky
    top: 0,
    left: 0,
    height: '100vh', // Full height of the viewport
    width: '250px', // Adjust the width as needed
    backgroundColor: '#fff', // Sidebar background color
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)', // Add a shadow for depth
    zIndex: 100, // Ensure the sidebar is above other content
  },
  mainContent: {
    marginLeft: '250px', // Match the width of the sidebar
    width: 'calc(100% - 250px)', // Adjust width to account for the sidebar
    padding: '20px', // Add padding for better spacing
  },
};