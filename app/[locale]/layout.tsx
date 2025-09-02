export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;
  return (
    <html lang={locale || 'en'}>
      <body>{children}</body>
    </html>
  );
}
