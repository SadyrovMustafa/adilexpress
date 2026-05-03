import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админка",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
