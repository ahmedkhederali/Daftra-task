import  { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { GridSkeleton } from './components/ui/Skeleton';
import { router } from './app/router';

export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
          <div style={{ padding: 16, textAlign: 'center' }}>
            <p>Something went wrong.</p>
            <button onClick={resetErrorBoundary}>Retry</button>
          </div>
      )}
    >
      <Suspense fallback={<GridSkeleton />}>
          <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}