"use client";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const query = useQuery(api.users.getMany);

  if (!query) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {JSON.stringify(
        query.map((q) => {
          return q.name;
        }),
      )}
    </div>
  );
}
