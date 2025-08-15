import { useMemo } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
export function useSearchParamPage(defaultPage = 1) {
 const [params] = useSearchParams();
 const nav = useNavigate();
 const loc = useLocation();
 const page = useMemo(() => {
   const p = Number(params.get('page') ?? defaultPage);
   return Number.isFinite(p) && p > 0 ? p : defaultPage;
 }, [params, defaultPage]);
 const setPage = (p: number) => {
   const sp = new URLSearchParams(params);
   sp.set('page', String(Math.max(1, p)));
   nav(`${loc.pathname}?${sp.toString()}`, { replace: false });
 };
 return [page, setPage] as const;
}