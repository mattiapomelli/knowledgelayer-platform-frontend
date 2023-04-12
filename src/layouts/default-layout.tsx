import { Container } from "@components/layout/container";
import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";

import type { ReactNode } from "react";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-20">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};
