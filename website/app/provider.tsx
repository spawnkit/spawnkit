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
      {props.children}
    </ThemeProvider>
  );
}
