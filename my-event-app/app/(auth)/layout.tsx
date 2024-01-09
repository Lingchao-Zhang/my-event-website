export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
            <div className="w-full flex justify-center items-center min-h-screen">
            {children}
            </div>
        </body>
      </html>
    )
  }