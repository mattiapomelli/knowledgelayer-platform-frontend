import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";

import type { ReactNode } from "react";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-x-hidden pb-20 pt-8">
        {/* <div className="container">
          <div className="rounded-box mb-8 bg-primary/30 px-4 py-3 text-center">
            Get free MATIC from{" "}
            <a
              href="https://faucet.polygon.technology/"
              className="font-bold hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Mumbai Faucet
            </a>{" "}
            💰
          </div>
        </div> */}
        {children}
      </main>
      <Footer />
    </div>
  );
};
