import Link from "next/link";
import css from "./page.module.css"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
 
  openGraph: {
     title: "Page Not Found",
      description: "The page you are looking for does not exist.",
       url: "https://08-zustand-phi-one.vercel.app/not-found",
      images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}]
}
  }


function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>

      <Link href="./notes">Go notes</Link>
    </div>
  )
}

export default NotFound;
