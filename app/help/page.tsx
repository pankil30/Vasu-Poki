import Link from 'next/link'

export default function HelpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Help</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
            <p className="text-gray-600">
              This is a basic TypeScript Next.js project with the App Router. You can navigate between pages using the links below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Project Structure</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><code className="bg-gray-100 px-2 py-1 rounded">app/</code> - App Router directory with pages</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">app/layout.tsx</code> - Root layout component</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code> - Home page</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">app/help/page.tsx</code> - Help page</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Resources</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Next.js Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org/docs/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  TypeScript Handbook
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Tailwind CSS Documentation
                </a>
              </li>
            </ul>
          </section>
        </div>

        <nav className="mt-8">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 inline-block"
          >
            Back to Home
          </Link>
        </nav>
      </div>
    </main>
  )
}
