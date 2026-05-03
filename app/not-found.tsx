import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="display-heading text-9xl text-ember mb-6 leading-none">
          404
        </p>
        <h1 className="display-heading text-4xl md:text-5xl mb-6 text-balance">
          Página no encontrada
        </h1>
        <p className="text-smoke-400 mb-10">
          Esta página se perdió en el espacio digital.
        </p>
        <Link href="/" className="btn-ember">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
