import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowLeft, Briefcase, Building2, Mail } from "lucide-react";
import { LEVEL_META, useStore } from "../../store/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BurnoutBadge } from "../BurnoutBadge";

export function DetailPegawai({
  employeeId,
  onBack,
}: {
  employeeId: string;
  onBack: () => void;
}) {
  const { employees, assessmentsFor } = useStore();
  const employee = employees.find((e) => e.id === employeeId);
  const history = assessmentsFor(employeeId);

  if (!employee) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="size-4" /> Kembali
        </Button>
        <p className="text-muted-foreground">Pegawai tidak ditemukan.</p>
      </div>
    );
  }

  const latest = history[0];
  const chartData = [...history]
    .reverse()
    .map((a) => ({ date: a.date.slice(5), skor: a.totalScore }));

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="size-4" /> Kembali
      </Button>

      {/* Profile + latest */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
              {employee.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2>{employee.name}</h2>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="size-4" /> {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="size-4" /> {employee.department}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="size-4" /> {employee.position}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                No. Pegawai: {employee.employeeNumber}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Burnout Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            {latest ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <div
                  className="text-4xl font-semibold"
                  style={{ color: LEVEL_META[latest.level].chart }}
                >
                  {latest.totalScore}%
                </div>
                <BurnoutBadge level={latest.level} />
                <p className="text-sm text-muted-foreground">
                  Diperbarui {latest.date}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada assessment.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trend chart */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Perkembangan Burnout</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="skor"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">Belum ada data perkembangan.</p>
          )}
        </CardContent>
      </Card>

      {/* History table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kelelahan Emosional</TableHead>
                <TableHead>Depersonalisasi</TableHead>
                <TableHead>Pencapaian Diri</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Kategori</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.emotionalExhaustion}%</TableCell>
                  <TableCell>{a.depersonalization}%</TableCell>
                  <TableCell>{a.personalAccomplishment}%</TableCell>
                  <TableCell>{a.totalScore}%</TableCell>
                  <TableCell>
                    <BurnoutBadge level={a.level} />
                  </TableCell>
                </TableRow>
              ))}
              {history.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Belum ada riwayat assessment.
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
