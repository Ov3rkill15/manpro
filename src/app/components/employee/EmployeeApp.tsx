import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  History,
  LogOut,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DIMENSIONS,
  LEVEL_META,
  LIKERT,
  scoreToLevel,
  useStore,
} from "../../store/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BurnoutBadge } from "../BurnoutBadge";

type View = "home" | "assessment" | "result";

const allQuestions = DIMENSIONS.flatMap((d) =>
  d.questions.map((q) => ({ dimension: d.key, question: q }))
);

export function EmployeeApp({ onLogout }: { onLogout: () => void }) {
  const { currentUser, employees, assessmentsFor, addAssessment } = useStore();
  const employeeId = currentUser?.employeeId ?? "e1";
  const employee = employees.find((e) => e.id === employeeId);
  const [view, setView] = useState<View>("home");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [lastId, setLastId] = useState<string | null>(null);

  const history = assessmentsFor(employeeId);
  const latest = history[0];

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / allQuestions.length) * 100);

  const submit = () => {
    const dimScore = (key: string) => {
      const idxs = allQuestions
        .map((q, i) => ({ ...q, i }))
        .filter((q) => q.dimension === key);
      const sum = idxs.reduce((s, q) => s + (answers[q.i] ?? 0), 0);
      return Math.round((sum / (idxs.length * 5)) * 100);
    };
    const emo = dimScore("emotional");
    const dep = dimScore("depersonalization");
    const acc = dimScore("accomplishment");
    const total = Math.round((emo + dep + acc) / 3);
    const created = addAssessment({
      employeeId,
      date: new Date().toISOString().slice(0, 10),
      emotionalExhaustion: emo,
      depersonalization: dep,
      personalAccomplishment: acc,
      totalScore: total,
      level: scoreToLevel(total),
      answers: allQuestions.map((q, i) => ({
        question: q.question,
        value: answers[i] ?? 0,
      })),
    });
    setLastId(created.id);
    setView("result");
  };

  const resultAssessment = useMemo(
    () => history.find((a) => a.id === lastId) ?? latest,
    [history, lastId, latest]
  );

  const chartData = [...history]
    .reverse()
    .map((a) => ({ date: a.date.slice(5), skor: a.totalScore }));

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </div>
            <div>
              <div className="font-semibold">BurnoutWatch</div>
              <div className="text-xs text-muted-foreground">
                Portal Pegawai
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">{employee?.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="size-4" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {view === "home" && (
          <div className="space-y-6">
            <div>
              <h1>Halo, {employee?.name?.split(" ")[0]} 👋</h1>
              <p className="mt-1 text-muted-foreground">
                Pantau kondisi burnout Anda dan isi assessment secara berkala.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Status Burnout Anda</CardTitle>
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
                        Assessment terakhir: {latest.date}
                      </p>
                    </div>
                  ) : (
                    <p className="py-6 text-center text-muted-foreground">
                      Anda belum pernah mengisi assessment.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardContent className="space-y-3 p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ClipboardList className="size-6" />
                  </div>
                  <h3>Assessment Burnout</h3>
                  <p className="text-sm text-muted-foreground">
                    9 pertanyaan, sekitar 3 menit. Jawab dengan jujur.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setAnswers({});
                      setView("assessment");
                    }}
                  >
                    Mulai Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="size-4" /> Riwayat Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Total Skor</TableHead>
                        <TableHead>Kategori</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{a.date}</TableCell>
                          <TableCell>{a.totalScore}%</TableCell>
                          <TableCell>
                            <BurnoutBadge level={a.level} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {view === "assessment" && (
          <div className="space-y-6">
            <div>
              <h1>Assessment Burnout</h1>
              <p className="mt-1 text-muted-foreground">
                Pilih tingkat persetujuan Anda untuk setiap pernyataan (skala
                Likert 1-5).
              </p>
            </div>

            <div className="sticky top-0 z-10 -mx-2 bg-muted/30 px-2 py-2">
              <Progress value={progress} />
              <p className="mt-1 text-sm text-muted-foreground">
                {answeredCount} dari {allQuestions.length} pertanyaan terjawab
              </p>
            </div>

            {DIMENSIONS.map((dim) => (
              <Card key={dim.key}>
                <CardHeader>
                  <CardTitle>{dim.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {dim.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {dim.questions.map((q) => {
                    const globalIdx = allQuestions.findIndex(
                      (x) => x.question === q
                    );
                    return (
                      <div key={q}>
                        <p className="mb-3 text-sm">{q}</p>
                        <div className="flex flex-wrap gap-2">
                          {LIKERT.map((opt) => {
                            const active = answers[globalIdx] === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() =>
                                  setAnswers((p) => ({
                                    ...p,
                                    [globalIdx]: opt.value,
                                  }))
                                }
                                className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2 text-center text-xs transition ${
                                  active
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-accent"
                                }`}
                              >
                                <span className="text-base font-semibold">
                                  {opt.value}
                                </span>
                                <span className="leading-tight">{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setView("home")}>
                Batal
              </Button>
              <Button
                disabled={answeredCount < allQuestions.length}
                onClick={submit}
              >
                Kirim Assessment
              </Button>
            </div>
          </div>
        )}

        {view === "result" && resultAssessment && (
          <div className="space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <CheckCircle2 className="size-12 text-green-500" />
                <h2>Assessment Selesai</h2>
                <p className="text-muted-foreground">
                  Terima kasih telah mengisi assessment. Berikut hasil Anda.
                </p>
                <div
                  className="mt-2 text-5xl font-semibold"
                  style={{ color: LEVEL_META[resultAssessment.level].chart }}
                >
                  {resultAssessment.totalScore}%
                </div>
                <BurnoutBadge level={resultAssessment.level} />
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Kelelahan Emosional", value: resultAssessment.emotionalExhaustion },
                { label: "Depersonalisasi", value: resultAssessment.depersonalization },
                { label: "Pencapaian Diri", value: resultAssessment.personalAccomplishment },
              ].map((d) => (
                <Card key={d.label}>
                  <CardContent className="p-5">
                    <div className="text-sm text-muted-foreground">{d.label}</div>
                    <div className="mt-1 text-2xl font-semibold">{d.value}%</div>
                    <Progress className="mt-3" value={d.value} />
                  </CardContent>
                </Card>
              ))}
            </div>

            {chartData.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Perkembangan Burnout Anda</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
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
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center">
              <Button onClick={() => setView("home")}>Kembali ke Beranda</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
