import { useState } from "react";
import { ArrowLeft, HeartPulse, ShieldCheck, User as UserIcon } from "lucide-react";
import { Role, useStore } from "../store/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

export function LoginPage({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: (role: Role) => void;
}) {
  const { login } = useStore();
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError("Email/username tidak boleh kosong.");
    if (!password.trim()) return setError("Password tidak boleh kosong.");
    if (!role) return setError("Silakan pilih role terlebih dahulu.");
    setError("");
    login(email, role);
    onSuccess(role);
  };

  const fillDemo = (r: Role) => {
    setRole(r);
    setEmail(r === "admin" ? "siti@perusahaan.com" : "andi@perusahaan.com");
    setPassword("password");
    setError("");
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-white/15">
            <HeartPulse className="size-5" />
          </div>
          <span className="font-semibold">BurnoutWatch</span>
        </div>
        <div>
          <h1 className="text-primary-foreground">
            Sistem Monitoring Burnout Pegawai
          </h1>
          <p className="mt-3 max-w-sm text-primary-foreground/80">
            Masuk untuk memantau dan mengisi assessment kondisi burnout secara
            digital dan terorganisir.
          </p>
        </div>
        <span className="text-sm text-primary-foreground/70">
          © 2026 BurnoutWatch
        </span>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Kembali ke beranda
        </button>

        <div className="mx-auto w-full max-w-sm">
          <h2>Masuk ke Sistem</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pilih role dan masukkan kredensial Anda.
          </p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {(
              [
                { r: "admin", label: "HR / Admin", icon: ShieldCheck },
                { r: "pegawai", label: "Pegawai", icon: UserIcon },
              ] as const
            ).map(({ r, label, icon: Icon }) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm transition ${
                  role === r
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:bg-accent"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="nama@perusahaan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 rounded-lg border bg-muted/50 p-4 text-sm">
            <p className="font-medium">Akun demo</p>
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => fillDemo("admin")}
              >
                Isi HR/Admin
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => fillDemo("pegawai")}
              >
                Isi Pegawai
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
