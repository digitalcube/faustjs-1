import type { RequiredSchema } from '@faustjs/react';
import { useState } from 'react';
import type { NextClient } from '../client';

export function create<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
>(): NextClient<Schema, ObjectTypesNames, ObjectTypes>['auth']['useLogout'] {
  return () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState<boolean | undefined>(
      undefined,
    );

    async function logout() {
      setIsLoading(true);
      const res = await fetch(`/api/auth/logout`);
      setIsLoading(false);

      if (res.ok) {
        setIsLoggedOut(true);
      } else {
        setIsLoggedOut(false);
      }
    }

    return { logout, isLoggedOut, isLoading };
  };
}
