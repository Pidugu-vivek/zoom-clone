/**
 * The backend stores timestamps in SQLite, which does not preserve timezone
 * info: fields like `start_time` / `created_at` / `joined_at` arrive over the
 * API as naive ISO strings (no trailing "Z" or UTC offset) even though the
 * underlying instant is always UTC. `new Date(...)` parses a timezone-less
 * datetime string as *local* time per the JS spec, which silently shifts
 * every one of these timestamps by the viewer's UTC offset.
 *
 * This parses any timezone-less timestamp as UTC before handing it to `Date`,
 * while leaving already-qualified strings (with "Z" or an offset) untouched.
 */
export function parseUtcTimestamp(value: string): Date {
  const hasTimezoneDesignator = /(Z|[+-]\d{2}:?\d{2})$/.test(value);
  return new Date(hasTimezoneDesignator ? value : `${value}Z`);
}
