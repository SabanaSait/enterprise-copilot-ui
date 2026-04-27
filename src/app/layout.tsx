export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r border-gray-800 p-4">
            <h1 className="text-lg font-semibold">Enterprise Copilot</h1>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
