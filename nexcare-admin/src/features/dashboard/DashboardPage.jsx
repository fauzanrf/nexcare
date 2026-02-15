import { useAuth } from "../auth/AuthContext";
import { StatsCards } from "./StatsCards";
import { DashboardCharts } from "./DashboardCharts";
import mascot from "../../assets/mascot.png";

export default function DashboardPage() {
  const { session } = useAuth();
  const userName = session?.name || "Admin";

  return (
    <div className="space-y-8">
      {/* Welcome Section with Mascot */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 relative overflow-hidden transition-colors">
        <div className="z-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="relative z-10 mt-4 md:mt-0">
          <img
            src={mascot}
            alt="Welcome Mascot"
            className="w-32 h-32 md:w-48 md:h-48 drop-shadow-xl"
          />
        </div>

        {/* Decorative background blob */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      </div>

      <StatsCards />

      <DashboardCharts />
    </div>
  );
}
