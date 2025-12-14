import NavbarPage from "../_components/NavBarPage";
import Footer from "../_components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPage />
      {children}
      <Footer />
    </>
  );
}
