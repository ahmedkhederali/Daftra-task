import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { GridSkeleton } from './components/ui/Skeleton';
import { ErrorFallback } from './ErrorPageDesign';

function Layout() {
    return (
        <div>
            <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                    <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
                )}
            >
                <Suspense fallback={<GridSkeleton />}>
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default Layout;
