import { Category } from '@/components/Category/Category';
import Navigation from '@/components/Navigation/Navigation';

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div className="w-5/6 mx-auto mb-28 flex flex-col items-center justify-items-center min-h-screen gap-12 font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <Category slug={flokkur} />
    </div>
  );
}