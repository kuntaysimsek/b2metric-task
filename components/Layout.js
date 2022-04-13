import { useRouter } from "next/router";
import Header from "./Header";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/library" && <Header />}
      {children}
    </>
  );
};

export default Layout;
