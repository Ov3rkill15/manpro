import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Role = "admin" | "pegawai";
export type BurnoutLevel = "rendah" | "sedang" | "tinggi";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  employeeId?: string;
}

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: Role;
}

export interface Assessment {
  id: string;
  employeeId: string;
  date: string; // ISO
  emotionalExhaustion: number; // 0-100
  depersonalization: number; // 0-100
  personalAccomplishment: number; // 0-100
  totalScore: number; // 0-100
  level: BurnoutLevel;
  answers: { question: string; value: number }[];
}

export const DEPARTMENTS = [
  "Human Resource",
  "Engineering",
  "Finance",
  "Marketing",
  "Operations",
  "Customer Support",
];

export interface AssessmentDimension {
  key: "emotional" | "depersonalization" | "accomplishment";
  title: string;
  description: string;
  questions: string[];
}

export const DIMENSIONS: AssessmentDimension[] = [
  {
    key: "emotional",
    title: "Kelelahan Emosional",
    description: "Perasaan terkuras secara emosional akibat pekerjaan.",
    questions: [
      "Saya merasa lelah secara emosional setelah bekerja.",
      "Saya merasa pekerjaan saya semakin berat untuk dijalani.",
      "Saya merasa terkuras energinya di akhir hari kerja.",
    ],
  },
  {
    key: "depersonalization",
    title: "Depersonalisasi",
    description: "Sikap menjaga jarak atau sinis terhadap pekerjaan dan rekan.",
    questions: [
      "Saya merasa kurang peduli terhadap hasil pekerjaan saya.",
      "Saya merasa semakin sinis terhadap pekerjaan saya.",
      "Saya merasa sulit untuk berempati dengan rekan kerja.",
    ],
  },
  {
    key: "accomplishment",
    title: "Penurunan Pencapaian Diri",
    description: "Perasaan menurunnya kompetensi dan pencapaian dalam bekerja.",
    questions: [
      "Saya merasa kurang termotivasi dalam menyelesaikan pekerjaan.",
      "Saya merasa sulit fokus saat bekerja.",
      "Saya merasa pencapaian kerja saya menurun.",
    ],
  },
];

export const LIKERT = [
  { value: 1, label: "Sangat Tidak Setuju" },
  { value: 2, label: "Tidak Setuju" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Setuju" },
  { value: 5, label: "Sangat Setuju" },
];

export function scoreToLevel(score: number): BurnoutLevel {
  if (score <= 40) return "rendah";
  if (score <= 70) return "sedang";
  return "tinggi";
}

export const LEVEL_META: Record<
  BurnoutLevel,
  { label: string; color: string; bg: string; text: string; chart: string }
> = {
  rendah: {
    label: "Rendah",
    color: "#22c55e",
    bg: "bg-green-100",
    text: "text-green-700",
    chart: "#22c55e",
  },
  sedang: {
    label: "Sedang",
    color: "#f59e0b",
    bg: "bg-amber-100",
    text: "text-amber-700",
    chart: "#f59e0b",
  },
  tinggi: {
    label: "Tinggi",
    color: "#ef4444",
    bg: "bg-red-100",
    text: "text-red-700",
    chart: "#ef4444",
  },
};

// ---- Mock seed data ----
const seedEmployees: Employee[] = [
  { id: "e1", employeeNumber: "EMP-001", name: "Andi Wijaya", email: "andi@perusahaan.com", department: "Engineering", position: "Backend Developer", role: "pegawai" },
  { id: "e2", employeeNumber: "EMP-002", name: "Siti Rahmawati", email: "siti@perusahaan.com", department: "Human Resource", position: "HR Officer", role: "admin" },
  { id: "e3", employeeNumber: "EMP-003", name: "Budi Santoso", email: "budi@perusahaan.com", department: "Finance", position: "Accountant", role: "pegawai" },
  { id: "e4", employeeNumber: "EMP-004", name: "Dewi Lestari", email: "dewi@perusahaan.com", department: "Marketing", position: "Marketing Specialist", role: "pegawai" },
  { id: "e5", employeeNumber: "EMP-005", name: "Rizki Pratama", email: "rizki@perusahaan.com", department: "Engineering", position: "Frontend Developer", role: "pegawai" },
  { id: "e6", employeeNumber: "EMP-006", name: "Maya Putri", email: "maya@perusahaan.com", department: "Customer Support", position: "Support Lead", role: "pegawai" },
  { id: "e7", employeeNumber: "EMP-007", name: "Fajar Nugroho", email: "fajar@perusahaan.com", department: "Operations", position: "Ops Analyst", role: "pegawai" },
  { id: "e8", employeeNumber: "EMP-008", name: "Putri Anggraini", email: "putri@perusahaan.com", department: "Engineering", position: "QA Engineer", role: "pegawai" },
];

function mkAssessment(
  id: string,
  employeeId: string,
  date: string,
  emo: number,
  dep: number,
  acc: number
): Assessment {
  const total = Math.round((emo + dep + acc) / 3);
  return {
    id,
    employeeId,
    date,
    emotionalExhaustion: emo,
    depersonalization: dep,
    personalAccomplishment: acc,
    totalScore: total,
    level: scoreToLevel(total),
    answers: [],
  };
}

const seedAssessments: Assessment[] = [
  mkAssessment("a1", "e1", "2026-06-10", 85, 70, 80),
  mkAssessment("a2", "e1", "2026-05-10", 60, 55, 50),
  mkAssessment("a3", "e1", "2026-04-10", 40, 35, 38),
  mkAssessment("a4", "e3", "2026-06-08", 30, 25, 35),
  mkAssessment("a5", "e4", "2026-06-09", 55, 60, 50),
  mkAssessment("a6", "e4", "2026-05-09", 45, 50, 40),
  mkAssessment("a7", "e5", "2026-06-11", 78, 82, 75),
  mkAssessment("a8", "e6", "2026-06-07", 35, 30, 28),
  mkAssessment("a9", "e7", "2026-06-06", 62, 58, 65),
  mkAssessment("a10", "e8", "2026-06-12", 25, 20, 30),
];

interface StoreContextValue {
  currentUser: User | null;
  employees: Employee[];
  assessments: Assessment[];
  login: (email: string, role: Role) => User;
  logout: () => void;
  addEmployee: (e: Omit<Employee, "id">) => void;
  updateEmployee: (e: Employee) => void;
  deleteEmployee: (id: string) => void;
  addAssessment: (a: Omit<Assessment, "id">) => Assessment;
  latestAssessmentFor: (employeeId: string) => Assessment | undefined;
  assessmentsFor: (employeeId: string) => Assessment[];
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [assessments, setAssessments] = useState<Assessment[]>(seedAssessments);

  const value = useMemo<StoreContextValue>(() => {
    const assessmentsFor = (employeeId: string) =>
      assessments
        .filter((a) => a.employeeId === employeeId)
        .sort((a, b) => b.date.localeCompare(a.date));

    return {
      currentUser,
      employees,
      assessments,
      login: (email, role) => {
        const matched = employees.find(
          (e) => e.email.toLowerCase() === email.toLowerCase()
        );
        const user: User = {
          id: matched?.id ?? "u-" + Date.now(),
          name: matched?.name ?? (role === "admin" ? "HR Admin" : "Pegawai"),
          email,
          role,
          employeeId: role === "pegawai" ? matched?.id ?? "e1" : matched?.id,
        };
        setCurrentUser(user);
        return user;
      },
      logout: () => setCurrentUser(null),
      addEmployee: (e) =>
        setEmployees((prev) => [...prev, { ...e, id: "e-" + Date.now() }]),
      updateEmployee: (e) =>
        setEmployees((prev) => prev.map((x) => (x.id === e.id ? e : x))),
      deleteEmployee: (id) =>
        setEmployees((prev) => prev.filter((x) => x.id !== id)),
      addAssessment: (a) => {
        const created = { ...a, id: "a-" + Date.now() };
        setAssessments((prev) => [...prev, created]);
        return created;
      },
      latestAssessmentFor: (employeeId) => assessmentsFor(employeeId)[0],
      assessmentsFor,
    };
  }, [currentUser, employees, assessments]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
