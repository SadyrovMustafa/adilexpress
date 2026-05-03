"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/admin-auth";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="mx-auto mt-10 max-w-sm space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Пароль администратора
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
        />
      </div>
      {state?.error ? (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600 disabled:opacity-60"
      >
        {pending ? "Вход…" : "Войти"}
      </button>
      <p className="text-center text-xs text-zinc-500">
        Пароль задаётся в переменной окружения <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">ADMIN_PASSWORD</code>
      </p>
    </form>
  );
}
