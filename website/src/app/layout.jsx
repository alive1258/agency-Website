import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// SATOSHI FONT
const satoshi = localFont({
  src: [
    {
      path: "../../public/font/Satoshi-Regular.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/font/Satoshi-Regular.otf",
      weight: "600",
      style: "semiBold",
    },
    {
      path: "../../public/font/Satoshi-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

// PLUS JAKARTA SANS
const plusJakartaSans = localFont({
  src: [
    {
      path: "../../public/font/static/PlusJakartaSans-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/static/PlusJakartaSans-SemiBold.ttf",
      weight: "600",
      style: "semiBold",
    },
    {
      path: "../../public/font/static/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-plusjakarta",
});

export const metadata = {
  title: "Solvex – Digital Agency, Smart Solutions for Modern Businesses",
  description:
    "Solvex is a cutting-edge technology company offering innovative digital solutions including Shopify theme development, custom React and Next.js themes, business automation, and full-stack web development services tailored to your growth.",
  keywords: [
    "Solvex",
    "Tech Solutions",
    "Business Automation",
    "Web Development",
    "Software Company",
    "Digital Services",
    "Full Stack Development",
    "Shopify Theme Development",
    "Shopify Customization",
    "React Themes",
    "Next.js Themes",
    "Next.js Development",
    "Frontend Development",
    "Backend Development",
    "E-commerce Solutions",
    "Custom Web Applications",
    "Modern UI/UX",
    "SaaS Development",
    "Startup Solutions",
    "Technology Consulting",
  ],
  authors: [{ name: "Solvex Team", url: "https://solvex.coremindsoft.com/" }],
  creator: "Solvex",
  publisher: "Solvex Inc.",
  robots: "index, follow",
  metadataBase: new URL("https://solvex.coremindsoft.com/"),
  openGraph: {
    title: "Solvex – Smart Solutions for Modern Businesses",
    description:
      "Empowering your business with scalable tech solutions and seamless digital transformation.",
    url: "https://solvex.coremindsoft.com/",
    siteName: "Solvex",
    images: [
      {
        url: "https://solvex.coremindsoft.com//og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Solvex Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvex – Smart Solutions for Modern Businesses",
    description:
      "Discover how Solvex can help you scale your business with tailored digital solutions.",
    site: "@solvex",
    creator: "@solvex",
    images: ["https://solvex.coremindsoft.com//twitter-card.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${plusJakartaSans.variable} bg-white-base`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
