export function GridSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gap: 32,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        justifyContent: 'center',
        padding: '8px 0',
         maxWidth: 1040, margin: '0 auto'
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(30, 60, 90, 0.10)',
            padding: 20,
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 'none',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: '#e0e0e0',
              borderRadius: 12,
              marginBottom: 8,
              animation: 'pulse 1.5s infinite',
            }}
          />
          <div
            style={{
              width: 80,
              height: 18,
              backgroundColor: '#e0e0e0',
              borderRadius: 6,
              marginTop: 8,
              animation: 'pulse 1.5s infinite',
            }}
          />
          <div
            style={{
              width: 50,
              height: 14,
              backgroundColor: '#e0e0e0',
              borderRadius: 6,
              marginTop: 6,
              animation: 'pulse 1.5s infinite',
            }}
          />
        </div>
      ))}
    </div>
  );
}