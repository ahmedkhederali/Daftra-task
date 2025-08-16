
import {usePokemonPage} from '../../features/pokemon/hooks/usePokemonPage';
import { usePokemonListDetails } from '../../features/pokemon/hooks/usePokemonListDetails';
import { PokemonGrid } from '../../components/pokemon/PokemonGrid';
import { ErrorView } from '../../components/ui/ErrorView';
import { GridSkeleton } from '../../components/ui/Skeleton';
import { useSearchParamPage } from '../../lib/useSearchParamPage';
import { DEFAULT_LIMIT } from '../../lib/constant';
import { PaginationControls } from '../../components/ui/PaginationControls';
import { PokemonCard } from '../../components/pokemon/PokemonCard';

export default function PaginationPage() {
  const [page, setPage] = useSearchParamPage();
  const LIMIT = DEFAULT_LIMIT;
  const { data, isLoading, isError, refetch } = usePokemonPage(LIMIT, page);
  const items = data?.results ?? [];
  const details = usePokemonListDetails(items);
  // UI matches attached image
  return (
    <main style={{ background: '#eef2fb', minHeight: '100vh', paddingBottom: 32 }}>
      <div style={{ textAlign: 'center', paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#222', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>⚡</span> Pokédex
          </span>
          <span style={{ color: '#555', fontSize: 16 }}>
            Discover and explore Pokemon with page controls
          </span>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{
              background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer',
            }}>Page Controls</button>
            <a href="/load-more">
              <button style={{
                background: '#fff', color: '#222', border: '1px solid #222', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer',
              }}>Infinite Scroll</button>
            </a>
          </div>
        </div>
      </div>
      {isLoading ? ( 
        <GridSkeleton />
      ) : isError ? (
        <ErrorView onRetry={refetch} />
      ) : (
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <PokemonGrid
            items={details.map(it => ({
              ...it,
              sprite: typeof it.sprite === 'string' ? it.sprite : undefined
            }))}
            renderItem={(it: { name: string; id?: number; sprite?: string }) => (
              <PokemonCard key={it.id} name={it.name} id={it.id} sprite={it.sprite} />
            )}
          />
          <PaginationControls
            page={page}
            totalPages={data && 'count' in data ? Math.ceil((data?.count as number) / LIMIT) : 1}
            onPage={setPage}
          />
        </div>
      )}
    </main>
  );
}
