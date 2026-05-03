export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 py-10 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Адил Экспресс</p>
          <p className="mt-2 max-w-xs">
            Карго и автотовары: запчасти, ветровики, брызговики, LED-мониторы и другое для вашего авто.
          </p>
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Режим</p>
          <p className="mt-2">Пн–Сб · 9:00–19:00</p>
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Связь</p>
          <p className="mt-2">
            Телефон и адрес уточняйте у менеджера — блок «Контакты» на сайте.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-zinc-500 sm:px-6">
        © {new Date().getFullYear()} Адил Экспресс. Демо-витрина с админ-панелью.
      </p>
    </footer>
  );
}
