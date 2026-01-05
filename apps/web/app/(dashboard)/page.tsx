import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const TestPage = () => {
  return <div>
    <UserButton />
    <OrganizationSwitcher />
  </div>
};
export default TestPage;
