"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8 space-y-2">
        <p className="text-[13px] uppercase tracking-[0.2em] text-[#888]">
          AlgoryCode
        </p>
        <h1 className="heading text-2xl font-semibold text-[#ededed]">
          Admin Girişi
        </h1>
        <p className="text-sm text-[#888]">
          Yönetim paneline erişmek için e-posta ve şifrenizi girin.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-[13px] font-medium text-[#ededed]"
          >
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]"
            placeholder="ornek@algorycode.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-[13px] font-medium text-[#ededed]"
          >
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-11 w-full rounded-md border border-[#1a1a1a] bg-black px-3 text-sm text-[#ededed] outline-none transition-colors placeholder:text-[#444] focus:border-[#333]"
            placeholder="••••••••"
          />
        </div>

        {state.error ? (
          <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </Card>
  );
}
