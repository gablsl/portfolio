'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from '../apollo/client';

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
}
