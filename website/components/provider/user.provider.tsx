"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/lib/stores/user-store";

export function UserProvider({
  children,
}: Readonly<React.PropsWithChildren>): React.JSX.Element {
  const { data: session } = authClient.useSession();
  const syncFromSession = useUserStore((s) => s.syncFromSession);

  React.useEffect(() => {
    void syncFromSession(session);
  }, [session, syncFromSession]);

  return <>{children}</>;
}
