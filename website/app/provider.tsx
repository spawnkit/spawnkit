import { Toaster, ToasterProps } from "sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/provider/theme.provider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <Toaster richColors theme={"dark" as ToasterProps["theme"]} />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </ThemeProvider>
  );
}
