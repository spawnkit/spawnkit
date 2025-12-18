import NextJSTopLoader from "nextjs-toploader";

import { Toaster } from "@/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/provider/theme.provider";

export default function RootLayout(props: Readonly<React.PropsWithChildren>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <Toaster richColors theme={"dark"} />
      <NextJSTopLoader color="var(--primary)" showSpinner={false} />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </ThemeProvider>
  );
}
