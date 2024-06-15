import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}
