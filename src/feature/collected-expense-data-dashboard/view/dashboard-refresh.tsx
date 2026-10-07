import { createContext, useContext, useState } from "react";

type DashboardRefreshContextValue = {
  refreshKey: number;
  triggerRefresh: () => void;
};

const DashboardRefreshContext =
  createContext<DashboardRefreshContextValue | null>(null);

export function DashboardRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <DashboardRefreshContext.Provider
      value={{
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </DashboardRefreshContext.Provider>
  );
}

export function useDashboardRefresh() {
  const context = useContext(DashboardRefreshContext);

  if (!context) {
    throw new Error(
      "useDashboardRefresh must be used inside DashboardRefreshProvider",
    );
  }

  return context;
}
