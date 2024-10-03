"use client";

import {
  QueryClient as _QueryClient,
  QueryClientProvider as _QueryClientProvider,
  QueryClientProviderProps as _QueryClientProviderProps,
} from "@tanstack/react-query";
import { FC } from "react";

export const QueryClientProvider: FC<
  Omit<_QueryClientProviderProps, "client">
> = ({ children }) => {
  const queryClient = new _QueryClient({
    defaultOptions: {
      queries: {
        notifyOnChangeProps: "all",
        refetchOnWindowFocus: false,
        retry: 3,
        retryDelay: 300,
      },
    },
  });

  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
};
