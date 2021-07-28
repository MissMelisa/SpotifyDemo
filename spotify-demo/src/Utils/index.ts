export default function sortBy<TEntity>(
  a: TEntity,
  b: TEntity,
  sortKey: keyof TEntity
): number {
  const aValue = a[sortKey];
  const bValue = b[sortKey];
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
}
