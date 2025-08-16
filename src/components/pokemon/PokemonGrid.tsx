import React from 'react';
type GridProps<T> = {
 items: T[];
 renderItem: (item: T) => React.ReactNode;
};
export function PokemonGrid<T>({ items, renderItem }: GridProps<T>) {
     return (
          <div
               style={{
                    display: 'grid',
                    gap: 32,
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    justifyContent: 'center',
                    padding: '8px 0',
               }}
          >
               {items.map(renderItem)}
          </div>
     );
}