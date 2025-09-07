import { Body } from '@/components/rest-form/body';
import { GeneratedCode } from '@/components/rest-form/generated-code';
import { RestHeaders } from '@/components/rest-form/headers';
import { RestMain } from '@/components/rest-form/main';
import { SendButton } from '@/components/rest-form/send-button';
import { Locale } from '@/type';

import { generateStaticParams } from '../../layout';

generateStaticParams();

export default async function RestClientPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">REST Client</h2>
      <RestMain />
      <RestHeaders />
      <Body />
      <GeneratedCode />
      <SendButton locale={locale as Locale} />
      {children}
    </div>
  );
}
