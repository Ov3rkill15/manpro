import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { Role, StoreProvider, useStore } from "./store/store";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { HrLayout, HrPage } from "./components/hr/HrLayout";
import { DashboardHR } from "./components/hr/DashboardHR";
import { DataPegawai } from "./components/hr/DataPegawai";
import { DetailPegawai } from "./components/hr/DetailPegawai";
import { LaporanMonitoring } from "./components/hr/LaporanMonitoring";
import { EmployeeApp } from "./components/employee/EmployeeApp";

type Screen = "landing" | "login" | "hr" | "employee";

function HrArea({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<HrPage>("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const goToEmployee = (id: string) => setSelectedEmployee(id);

  return (
    <HrLayout
      page={page}
      onNavigate={(p) => {
        setSelectedEmployee(null);
        setPage(p);
      }}
      onLogout={onLogout}
    >
      {selectedEmployee ? (
        <DetailPegawai
          employeeId={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      ) : page === "dashboard" ? (
        <DashboardHR onSelectEmployee={goToEmployee} />
      ) : page === "pegawai" ? (
        <DataPegawai onSelectEmployee={goToEmployee} />
      ) : (
        <LaporanMonitoring />
      )}
    </HrLayout>
  );
}

function AppInner() {
  const { logout } = useStore();
  const [screen, setScreen] = useState<Screen>("landing");

  const handleLoginSuccess = (role: Role) => {
    setScreen(role === "admin" ? "hr" : "employee");
  };

  const handleLogout = () => {
    logout();
    setScreen("landing");
  };

  if (screen === "landing")
    return <LandingPage onLogin={() => setScreen("login")} />;
  if (screen === "login")
    return (
      <LoginPage
        onBack={() => setScreen("landing")}
        onSuccess={handleLoginSuccess}
      />
    );
  if (screen === "hr") return <HrArea onLogout={handleLogout} />;
  return <EmployeeApp onLogout={handleLogout} />;
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
      <Toaster />
    </StoreProvider>
  );
}
