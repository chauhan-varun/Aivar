"use client";
import { useOrganization } from "@clerk/nextjs";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";
import { OrgSelectView } from "../view/org-select-view";

export const OrganisationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  if (!organization) {
    return (
        <OrgSelectView />
    );
  }
  return <>{children}</>;
};
