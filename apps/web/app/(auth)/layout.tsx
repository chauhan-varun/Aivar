const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default Layout;
