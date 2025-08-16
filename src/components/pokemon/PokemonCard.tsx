
import { Link } from 'react-router-dom';
type Props = {
    name: string;
    id?: number;
    sprite?: string | null;
};
export function PokemonCard({ name, id, sprite }: Props) {
    return (
        <Link
            to={`/pokemon/${id ?? name}`}
            style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 12px rgba(30, 60, 90, 0.10)',
                padding: 20,
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 220,
                border: 'none',
            }}
        >
            {sprite && (
                <img
                    src={sprite}
                    alt={name}
                    width={120}
                    height={120}
                    style={{ imageRendering: 'pixelated', marginBottom: 8 }}
                />
            )}
            <div style={{ fontWeight: 700, fontSize: 20, marginTop: 8, textTransform: 'capitalize' }}>{name}</div>
            {id !== undefined && (
                <div style={{ color: '#888', fontSize: 15, marginTop: 2 }}>
                    #{String(id).padStart(3, '0')}
                </div>
            )}
        </Link>
    );
}
