import { default as dayjs } from 'dayjs';

export function forceArray<A>(data: A | Array<A>  | undefined): Array<A>;
export function forceArray<A>(data: A | ReadonlyArray<A> | undefined): ReadonlyArray<A>;
export function forceArray<A>(data: A | Array<A>| undefined) : ReadonlyArray<A> {
  data = data || [];
  return Array.isArray(data)
    ? data
    : [data];
}

export function formatDate(dateStr: string, format: string = "D MMM YYYY hh:mm"): string {
  return dayjs(dateStr.substring(0, 19)).format(format);
}
