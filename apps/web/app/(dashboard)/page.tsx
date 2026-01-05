"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

const TestPage = () => {
  const add = useMutation(api.users.ad);
  const user = useQuery(api.users.getMany);
  return (
    <div>
      <UserButton />
      <OrganizationSwitcher />
      <Button onClick={() => add()}>Test Convex</Button>
      <div>
        {user?.map((u) => (
          <div key={u._id}>{u.name}</div>
        ))}
      </div>
    </div>
  );
};
export default TestPage;
