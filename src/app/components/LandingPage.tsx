import {
  Activity,
  BarChart3,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const HERO_IMG =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwb2ZmaWNlJTIwd2VsbGJlaW5nJTIwdGVhbXdvcmslMjBhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzgxMzE4NTA5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Assessment Digital",
    desc: "Pegawai mengisi kuesioner burnout berbasis skala Likert dengan cepat dan mudah.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Monitoring",
    desc: "Pantau distribusi tingkat burnout seluruh pegawai dalam satu layar.",
  },
  {
    icon: Activity,
    title: "Deteksi Dini",
    desc: "Kenali potensi burnout lebih awal sebelum berdampak pada produktivitas.",
  },
  {
    icon: ShieldCheck,
    title: "Data Terpusat",
    desc: "Pengelolaan data pegawai dan riwayat assessment yang aman dan terorganisir.",
  },
];

const features = [
  "Login HR/Admin & Pegawai",
  "Form assessment 3 dimensi burnout",
  "Perhitungan skor otomatis",
  "Grafik distribusi & perkembangan",
  "CRUD data pegawai",
  "Laporan monitoring & export",
];

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </div>
            <span className="font-semibold">BurnoutWatch</span>
          </div>
          <Button onClick={onLogin}>Login</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            Sistem Internal Perusahaan
          </span>
          <h1 className="mt-4 text-3xl leading-tight md:text-4xl">
            Sistem Monitoring Burnout Pegawai
          </h1>
          <p className="mt-4 text-muted-foreground">
            Pantau kondisi burnout pegawai secara lebih cepat, terukur, dan
            terorganisir melalui sistem assessment dan dashboard monitoring
            berbasis web.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={onLogin}>
              Mulai Sekarang
            </Button>
            <Button size="lg" variant="outline" onClick={onLogin}>
              Masuk sebagai HR
            </Button>
          </div>
          <div className="mt-8 flex gap-8">
            <div>
              <div className="text-2xl font-semibold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Dimensi Burnout</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Digital & Terpusat</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Role Pengguna</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <ImageWithFallback
              src={HERO_IMG}
              alt="Tim bekerja sama memantau kesejahteraan karyawan"
              className="h-80 w-full object-cover"
            />
          </div>
          <Card className="absolute -bottom-6 -left-6 hidden w-52 shadow-lg md:block">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Users className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">8 Pegawai</div>
                <div className="text-xs text-muted-foreground">Termonitor aktif</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center">Manfaat Sistem</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Membantu divisi HR mengenali, memantau, dan menindaklanjuti kondisi
            burnout pegawai secara terstruktur.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <Card key={b.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="size-5" />
                  </div>
                  <h3 className="mt-4">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2>Fitur Utama</h2>
            <p className="mt-2 text-muted-foreground">
              Semua yang dibutuhkan untuk memonitor kesejahteraan tim Anda dalam
              satu platform.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ClipboardCheck className="size-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-primary-foreground">Siap memulai monitoring?</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Masuk ke sistem dan mulai pantau kondisi burnout tim Anda hari ini.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="mt-6"
                onClick={onLogin}
              >
                Login ke Sistem
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 BurnoutWatch — Sistem Monitoring Burnout Pegawai</span>
          <span>Sistem internal perusahaan</span>
        </div>
      </footer>
    </div>
  );
}
