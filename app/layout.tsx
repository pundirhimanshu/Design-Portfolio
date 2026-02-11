import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Design Portfolio",
    description: "A stunning design portfolio showcasing creative work",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased cursor-none">
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
