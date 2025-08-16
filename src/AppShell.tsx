import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

export default function AppShell() {
     return (
          <ErrorBoundary
               fallbackRender={({ resetErrorBoundary }) => (
                    <div style={{ padding: 16 }}>
                         <p>Something went wrong.</p>
                         <button onClick={resetErrorBoundary}>Retry</button>
                    </div>
               )}
          >
               <RouterProvider router={router} />
          </ErrorBoundary>
     );
}

