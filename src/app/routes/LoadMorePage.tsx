import { PokemonGrid } from '../../components/pokemon/PokemonGrid';
import { ErrorView } from '../../components/ui/ErrorView';
import { GridSkeleton } from '../../components/ui/Skeleton';
import { usePokemonInfinite } from '../../features/pokemon/hooks/usePokemonInfinite';
import { usePokemonListDetails } from '../../features/pokemon/hooks/usePokemonListDetails';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
export default function LoadMorePage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonInfinite();
  const items = (data?.pages ?? []).flatMap((p) => p.results);
  const details = usePokemonListDetails(items);
  if (isLoading) return <GridSkeleton />;
  if (isError) return <ErrorView onRetry={refetch} />;
  return (
    <main style={{ background: '#eef2fb', minHeight: '100vh', paddingBottom: 32 }}>
      <div style={{ textAlign: 'center', paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#222', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 28 }}>⚡</span> Pokédex
          </span>
          <span style={{ color: '#555', fontSize: 16 }}>
            Discover and explore Pokemon with infinite scroll
          </span>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <a href="/pagination">
              <button style={{
                background: '#fff', color: '#222', border: '1px solid #222', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer',
              }}>Page Controls</button>
            </a>
            <button style={{
              background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer',
            }}>Infinite Scroll</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <PokemonGrid
          items={details.map(it => ({
            ...it,
            sprite: it.sprite === null ? undefined : it.sprite
          }))}
          renderItem={(it: { name: string; id?: number; sprite?: string }) => (
            <PokemonCard key={it.id} name={it.name} id={it.id} sprite={it.sprite} />
          )}
        />
        {hasNextPage && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} style={{
              background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 500, fontSize: 18, cursor: 'pointer', marginTop: 8
            }}>
              {isFetchingNextPage ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}