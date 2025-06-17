export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mt-12 mx-auto p-4 shadow-lg rounded-lg ">
      {children}
    </main>
  );
}