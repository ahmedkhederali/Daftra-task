import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/global.css'; // أو Tailwind لو مفعّل
import AppShell from './AppShell';
import { queryClient } from './app/queryClient';
createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AppShell />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>
    );