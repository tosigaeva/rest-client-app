import { Body } from '@/components/rest-form/body';
import { GeneratedCode } from '@/components/rest-form/generated-code';
import { RestHeaders } from '@/components/rest-form/headers';
import { RestMain } from '@/components/rest-form/main';
import { RestResponce } from '@/components/rest-form/responce';

export default function RestClientPage() {
  return (
    <div className="rest-client-page">
      <h2 className="text-text mb-4 text-xl font-semibold">REST Client</h2>
      <RestMain />
      <RestHeaders />
      <GeneratedCode />
      <Body />
      <RestResponce />
    </div>
  );
}
