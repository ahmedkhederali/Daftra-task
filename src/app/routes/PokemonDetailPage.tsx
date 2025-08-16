
import { Link, useParams } from "react-router-dom";
import { GridSkeleton } from "../../components/ui/Skeleton";
import { ErrorView } from "../../components/ui/ErrorView";
import { usePokemonById } from "../../features/pokemon/hooks/usePokemonById";
import '../../styles/pokemon-detail.css';

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePokemonById(id!);
  if (isLoading) return <GridSkeleton />;
  if (isError)   return <ErrorView onRetry={refetch} />;
  if (!data) return null;
  const sprite = data.sprites?.front_default ?? '';
  const types = data.types?.map((t: { type: { name: string } }) => t.type.name) ?? [];
  const abilities = data.abilities?.map((a: { ability: { name: string } }) => a.ability.name) ?? [];
  const stats = data.stats ?? [];

  return (
    <main
      className="pokemon-detail-main"
    >
      <Link to="/" aria-label="Back to list">
          <button style={{ marginBottom: 24, background: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>← Back to List</button>
        </Link>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        
        <div style={{ background: 'linear-gradient(90deg, #a259c6 0%, #f75e7a 100%)', borderRadius: '16px 16px 0 0', padding: '24px 0', textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 24 }}>
          <span style={{ fontSize: 22 }}>⚡</span> {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          <div style={{ fontSize: 16, opacity: 0.85, marginTop: 4 }}>#{String(data.id).padStart(3, '0')}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '0 0 16px 16px', boxShadow: '0 2px 12px rgba(30,60,90,0.10)', padding: 32, display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left: Image and types */}
          <div style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#fbefff', borderRadius: '50%', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <img src={sprite} alt={data.name} width={120} height={120} style={{ imageRendering: 'pixelated', borderRadius: '50%', transform:'scale(2.5)'}} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {types.map(type => (
                <span key={type} style={{ background: '#f75e7a', color: '#fff', borderRadius: 8, padding: '4px 12px', fontWeight: 500 }}>{type}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <div style={{ background: '#dcdcdc', borderRadius: 12, padding: '12px 24px', minWidth: 90, textAlign: 'center', boxShadow: '0 2px 8px rgba(30,60,90,0.10)' }}>
                <div style={{ color: '#888', fontSize: 14 }}>Height</div>
                <div style={{ fontWeight: 700 }}>{data.height / 10} m</div>
              </div>
              <div style={{ background: '#dcdcdc', borderRadius: 12, padding: '12px 24px', minWidth: 90, textAlign: 'center', boxShadow: '0 2px 8px rgba(30,60,90,0.10)' }}>
                <div style={{ color: '#888', fontSize: 14 }}>Weight</div>
                <div style={{ fontWeight: 700 }}>{data.weight / 10} kg</div>
              </div>
            </div>
          </div>
          {/* Right: Stats, abilities, experience */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 18 }}>Base Stats</div>
            {stats.map((s) => (
              <div key={s.stat.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ width: 110, fontSize: 14 }}>{s.stat.name.replace('-', ' ')}</div>
                <div style={{ background: '#fbefff', borderRadius: 6, height: 8, width: 140, marginRight: 8 }}>
                  <div style={{ background: '#a259c6', height: 8, borderRadius: 6, width: `${Math.min(100, s.base_stat)}%` }} />
                </div>
                <div style={{ fontWeight: 700, width: 32 }}>{s.base_stat}</div>
              </div>
            ))}
            <div style={{ fontWeight: 700, marginBottom: 8, marginTop: 24 }}>Abilities</div>
            <div style={{ marginBottom: 16 }}>{abilities.join(', ')}</div>
            <div style={{ fontWeight: 700 }}>Base Experience</div>
            <div style={{ color: '#a259c6', fontWeight: 700, fontSize: 18 }}>{data.base_experience} XP</div>
          </div>
        </div>
      </div>
    </main>
  );
}