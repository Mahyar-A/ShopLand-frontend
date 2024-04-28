"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <main>
      <h1>
        Hi <strong>{user?.fullName}</strong>!
      </h1>
    </main>
  );
}
