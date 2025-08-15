import React from 'react';
type ErrorViewProps = {
 message?: string;
 onRetry?: () => void;
};
export function ErrorView({ message = 'Something went wrong', onRetry }: ErrorViewProps) {
 return (
<div style={{ padding: 16, textAlign: 'center' }}>
<p>{message}</p>
     {onRetry && (
<button onClick={onRetry} style={{ marginTop: 8 }}>
         Retry
</button>
     )}
</div>
 );
}