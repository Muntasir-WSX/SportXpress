import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";



const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "SportXpress",
  description: "fastest growing sports news platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", publicSans.variable, merriweatherHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        
   <Toaster 
  position="bottom-right" 
  toastOptions={{
    style: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
    className: 'shadow-lg rounded-xl',
  }}
/>
        {children}




      </body>
    
    {/* Nav */}

    {/* footer */}

    
    </html>
  );
}
