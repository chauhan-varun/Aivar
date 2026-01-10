"use client";

import { WidgetView } from "@/modules/widget/ui/views/widget-view";
import { use } from "react";

interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>;
}

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);
  return <WidgetView organizationId={organizationId} />;
};

export default Page;
