import { AlertTriangle } from "lucide-react"; // nice icon

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      style={{
        padding: 32,
        textAlign: "center",
        background: "linear-gradient(135deg, #fff5f5, #ffe3e3)",
        borderRadius: 12,
        maxWidth: 400,
        margin: "80px auto",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <AlertTriangle size={48} color="#e53e3e" style={{ marginBottom: 12 }} />
      <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
        Oops! Something went wrong
      </h2>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
        Don’t worry, you can try again.
      </p>

      {/* Show error details in development only */}
      {process.env.NODE_ENV === "development" && (
        <pre
          style={{
            background: "#fff",
            color: "#e53e3e",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: 12,
            textAlign: "left",
            overflowX: "auto",
            marginBottom: 16,
          }}
        >
          {error?.message}
        </pre>
      )}

      <button
        onClick={resetErrorBoundary}
        style={{
          background: "#e53e3e",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#c53030")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#e53e3e")}
      >
        🔄 Retry
      </button>
      
    </div>
  );
}
