export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="bg-dark-1">
        <div className="w-full flex justify-center items-center min-h-screen">
          {children}
        </div>
      </section>
    )
  }