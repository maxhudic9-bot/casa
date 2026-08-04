"use client"

import dynamic from "next/dynamic"

// WebGL kann nicht server-seitig gerendert werden - dynamic mit ssr:false
// ist in Next.js nur innerhalb von Client Components erlaubt, daher dieser
// duenne Wrapper statt der direkte dynamic()-Aufruf in der (Server-)page.tsx.
export const PizzaScrollHero = dynamic(
  () => import("./pizza-scroll-hero").then((mod) => mod.PizzaScrollHero),
  {
    ssr: false,
    loading: () => <div className="h-screen w-full bg-ribelle-black" />,
  }
)
