import { type JSX, type ReactNode } from 'react';

type Props<T> = {
  loading: boolean;
  error: unknown;
  data: T | null | undefined;
  children?: ReactNode;
};

/**
 * Handles loading and error states and renders children when data is ready.
 *
 * @param loading - Indicates if data is being loaded.
 * @param error - Error object from the request.
 * @param data - The fetched data.
 * @param children - Content to render when data is available.
 * @returns A loading message, error message, or the children.
 */
export default function LoadingOrErrorComponent<T>({
  loading,
  error,
  data,
  children,
}: Props<T>): JSX.Element {
  if (loading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !data) {
    return <p>Failed to load, please try again</p>;
  }

  return <>{children}</>;
}
