export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-950">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-xl font-semibold tracking-tight">Invoice web preview</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Open a shared link like <span className="font-mono">/inv/&lt;publicToken&gt;</span>.
        </p>
      </div>
    </main>
  );
}
