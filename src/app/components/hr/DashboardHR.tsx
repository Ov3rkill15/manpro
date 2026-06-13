import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, TrendingUp, Users } from "lucide-react";
import {
  BurnoutLevel,
  DEPARTMENTS,
  LEVEL_META,
  useStore,
} from "../../store/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BurnoutBadge } from "../BurnoutBadge";

export function DashboardHR({
  onSelectEmployee,
}: {
  onSelectEmployee: (id: string) => void;
}) {
  const { employees, assessments, latestAssessmentFor } = useStore();
  const [dept, setDept] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const rows = useMemo(() => {
    return employees
      .map((e) => ({ employee: e, latest: latestAssessmentFor(e.id) }))
      .filter((r) => r.latest);
  }, [employees, assessments, latestAssessmentFor]);

  const counts = useMemo(() => {
    const c = { rendah: 0, sedang: 0, tinggi: 0 } as Record<BurnoutLevel, number>;
    rows.forEach((r) => {
      if (r.latest) c[r.latest.level]++;
    });
    return c;
  }, [rows]);

  const pieData = (["rendah", "sedang", "tinggi"] as BurnoutLevel[]).map((l) => ({
    name: LEVEL_META[l].label,
    value: counts[l],
    color: LEVEL_META[l].chart,
  }));

  const deptData = DEPARTMENTS.map((d) => {
    const inDept = rows.filter((r) => r.employee.department === d);
    return {
      department: d.split(" ")[0],
      rendah: inDept.filter((r) => r.latest?.level === "rendah").length,
      sedang: inDept.filter((r) => r.latest?.level === "sedang").length,
      tinggi: inDept.filter((r) => r.latest?.level === "tinggi").length,
    };
  }).filter((d) => d.rendah + d.sedang + d.tinggi > 0);

  const recent = useMemo(() => {
    return [...assessments]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((a) => {
        const emp = employees.find((e) => e.id === a.employeeId);
        if (!emp) return false;
        if (dept !== "all" && emp.department !== dept) return false;
        if (levelFilter !== "all" && a.level !== levelFilter) return false;
        return true;
      })
      .slice(0, 8);
  }, [assessments, employees, dept, levelFilter]);

  const stats = [
    {
      label: "Total Pegawai",
      value: employees.length,
      icon: Users,
      tone: "text-primary bg-primary/10",
    },
    {
      label: "Burnout Rendah",
      value: counts.rendah,
      icon: TrendingUp,
      tone: "text-green-700 bg-green-100",
    },
    {
      label: "Burnout Sedang",
      value: counts.sedang,
      icon: AlertTriangle,
      tone: "text-amber-700 bg-amber-100",
    },
    {
      label: "Burnout Tinggi",
      value: counts.tinggi,
      icon: AlertTriangle,
      tone: "text-red-700 bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              </div>
              <div
                className={`flex size-11 items-center justify-center rounded-lg ${s.tone}`}
              >
                <s.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Tingkat Burnout</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Burnout per Departemen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={deptData}>
                <XAxis dataKey="department" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="rendah" stackId="a" fill={LEVEL_META.rendah.chart} name="Rendah" radius={[0, 0, 0, 0]} />
                <Bar dataKey="sedang" stackId="a" fill={LEVEL_META.sedang.chart} name="Sedang" />
                <Bar dataKey="tinggi" stackId="a" fill={LEVEL_META.tinggi.chart} name="Tinggi" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent assessments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle>Hasil Assessment Terbaru</CardTitle>
          <div className="flex gap-2">
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Departemen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Departemen</SelectItem>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tingkat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tingkat</SelectItem>
                <SelectItem value="rendah">Rendah</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="tinggi">Tinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pegawai</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Tingkat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((a) => {
                const emp = employees.find((e) => e.id === a.employeeId)!;
                return (
                  <TableRow
                    key={a.id}
                    className="cursor-pointer"
                    onClick={() => onSelectEmployee(emp.id)}
                  >
                    <TableCell className="font-medium">{emp.name}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.totalScore}%</TableCell>
                    <TableCell>
                      <BurnoutBadge level={a.level} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {recent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Tidak ada data assessment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
