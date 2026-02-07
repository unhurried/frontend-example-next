import "../styles/globals.css";

import DefaultLayout from "../components/DefaultLayout";
import Providers from "./providers";
import { type ReactNode } from "react";

export const metadata = {
  title: "Next.js ToDo App",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
