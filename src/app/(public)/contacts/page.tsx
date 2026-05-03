export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Контакты</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        Свяжитесь с нами для заказа, расчёта доставки карго или подбора запчастей по VIN.
      </p>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <dt className="text-sm font-semibold text-amber-700 dark:text-amber-500">Телефон</dt>
          <dd className="mt-2 text-lg text-zinc-900 dark:text-white">+7 (000) 000-00-00</dd>
          <dd className="mt-1 text-sm text-zinc-500">Замените на реальный номер в коде или через админку позже.</dd>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <dt className="text-sm font-semibold text-amber-700 dark:text-amber-500">Email</dt>
          <dd className="mt-2 text-lg text-zinc-900 dark:text-white">info@adilexpress.example</dd>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
          <dt className="text-sm font-semibold text-amber-700 dark:text-amber-500">Адрес</dt>
          <dd className="mt-2 text-zinc-700 dark:text-zinc-300">
            Укажите город, склад или пункт выдачи — блок можно править в файле страницы контактов.
          </dd>
        </div>
      </dl>
    </div>
  );
}
