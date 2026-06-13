import { useMemo, useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { LEVEL_META, useStore } from "../../store/store";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BurnoutBadge } from "../BurnoutBadge";

export function LaporanMonitoring() {
  const { assessments, employees } = useStore();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => {
    return [...assessments]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter((a) => {
        if (from && a.date < from) return false;
        if (to && a.date > to) return false;
        if (level !== "all" && a.level !== level) return false;
        return true;
      });
  }, [assessments, from, to, level]);

  const summary = useMemo(() => {
    const total = filtered.length;
    const avg =
      total === 0
        ? 0
        : Math.round(filtered.reduce((s, a) => s + a.totalScore, 0) / total);
    return {
      total,
      avg,
      rendah: filtered.filter((a) => a.level === "rendah").length,
      sedang: filtered.filter((a) => a.level === "sedang").length,
      tinggi: filtered.filter((a) => a.level === "tinggi").length,
    };
  }, [filtered]);

  const exportCsv = () => {
    const header = "No Pegawai,Nama,Departemen,Tanggal,Total Skor,Kategori\n";
    const lines = filtered
      .map((a) => {
        const e = employees.find((x) => x.id === a.employeeId);
        return `${e?.employeeNumber ?? "-"},${e?.name ?? "-"},${
          e?.department ?? "-"
        },${a.date},${a.totalScore}%,${LEVEL_META[a.level].label}`;
      })
      .join("\n");
    const blob = new Blob([header + lines], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "laporan-burnout.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Laporan Excel (CSV) berhasil diunduh");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-end">
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Dari Tanggal</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sampai Tanggal</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Kategori Burnout</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="rendah">Rendah</SelectItem>
                  <SelectItem value="sedang">Sedang</SelectItem>
                  <SelectItem value="tinggi">Tinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Menyiapkan PDF... (simulasi)")}>
              <FileText className="size-4" /> PDF
            </Button>
            <Button onClick={exportCsv}>
              <FileSpreadsheet className="size-4" /> Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Assessment", value: summary.total, tone: "text-primary" },
          { label: "Rata-rata Skor", value: `${summary.avg}%`, tone: "text-primary" },
          { label: "Rendah", value: summary.rendah, tone: "text-green-600" },
          { label: "Sedang", value: summary.sedang, tone: "text-amber-600" },
          { label: "Tinggi", value: summary.tinggi, tone: "text-red-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <div className={`mt-1 text-2xl font-semibold ${s.tone}`}>
                {s.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Rekap Assessment Pegawai</CardTitle>
          <Button variant="ghost" size="sm" onClick={exportCsv}>
            <Download className="size-4" /> Unduh
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Pegawai</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Total Skor</TableHead>
                <TableHead>Kategori</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => {
                const e = employees.find((x) => x.id === a.employeeId);
                return (
                  <TableRow key={a.id}>
                    <TableCell>{e?.employeeNumber}</TableCell>
                    <TableCell className="font-medium">{e?.name}</TableCell>
                    <TableCell>{e?.department}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.totalScore}%</TableCell>
                    <TableCell>
                      <BurnoutBadge level={a.level} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Tidak ada data sesuai filter.
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
