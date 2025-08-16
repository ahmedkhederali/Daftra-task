import { createBrowserRouter } from 'react-router-dom';
import PaginationPage from './routes/PaginationPage';
import LoadMorePage from './routes/LoadMorePage';
import PokemonDetailPage from './routes/PokemonDetailPage';
import Layout from '../Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PaginationPage /> },
      { path: 'pagination', element: <PaginationPage /> },
      { path: 'load-more', element: <LoadMorePage /> },
      { path: 'pokemon/:id', element: <PokemonDetailPage /> },
    ]
  }
]);
