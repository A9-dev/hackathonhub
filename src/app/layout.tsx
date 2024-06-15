import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

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
        </body>
      </html>
    </UserProvider>
  );
}
