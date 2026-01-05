import { OrganisationLayout } from "@/modules/auth/ui/components/organisation-layout";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthLayout>
      <OrganisationLayout>{children}</OrganisationLayout>
    </AuthLayout>
  );
};

export default Layout;
