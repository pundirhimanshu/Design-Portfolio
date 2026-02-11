import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Design Portfolio",
    description: "A stunning design portfolio showcasing creative work",
    icons: {
        icon: [
            {
                url: '/images/Fire.gif?v=4',
                type: 'image/gif',
            },
        ],
        shortcut: [
            {
                url: '/images/Fire.gif?v=4',
                type: 'image/gif',
            },
        ],
    },
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
