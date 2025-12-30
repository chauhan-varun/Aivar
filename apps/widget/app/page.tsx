"use client";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";

import { api } from "@workspace/backend/_generated/api";

export default function Page() {
  const query = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.ad);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button onClick={() => addUser()}>Add User</Button>
        {JSON.stringify(query?.map((q) => q.name))}
      </div>
    </div>
  );
}
