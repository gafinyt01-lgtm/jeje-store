export function ProductSkeleton() {
  return <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-3">
    <div className="skeleton aspect-[4/3] w-full" />
    <div className="mt-4 space-y-3"><div className="skeleton h-4 w-3/4"/><div className="skeleton h-4 w-1/2"/><div className="skeleton h-11 w-full"/></div>
  </div>;
}
export function LoadingGrid() {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{[1,2,3].map(n => <ProductSkeleton key={n}/>)}</div>;
}
