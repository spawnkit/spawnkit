import NextJSTopLoader from "nextjs-toploader";

import { Toaster } from "@/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SanityLive } from "@/sanity/lib/live";
import { ThemeProvider } from "@/components/provider/theme.provider";
import { UserProvider } from "@/components/provider/user.provider";

export default function RootLayout(props: Readonly<React.PropsWithChildren>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <Header />
        <Toaster richColors theme={"dark"} />
        <NextJSTopLoader color="var(--primary)" showSpinner={false} />
        <main className="flex-1">{props.children}</main>
        <Footer />
        <SanityLive />
      </UserProvider>
    </ThemeProvider>
  );
}
