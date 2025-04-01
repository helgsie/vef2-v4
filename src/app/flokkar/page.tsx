import CategoryManagement from '@/components/CategoryManagement/CategoryManagement';
import Navigation from '@/components/Navigation/Navigation';

export default function Home() {
  return (
    <div className="w-5/6 mx-auto flex flex-col items-center justify-items-center min-h-screen gap-12 font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <CategoryManagement/>
    </div>
  );
}