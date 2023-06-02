// Hooks
import usePageTitle from '@hooks/usePageTitle';

export default function HomePage() {
  usePageTitle('Taskify');

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
