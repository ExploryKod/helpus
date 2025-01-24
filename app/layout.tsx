import "styles/tailwind.css"
import {Metadata} from "next";
import {ReactNode} from 'react';

export const metadata: Metadata = {
    title: "Next.js Enterprise Boilerplate",
    twitter: {
        card: "summary_large_image",
    },
    openGraph: {
        url: "https://next-enterprise.vercel.app/",
        images: [
            {
                width: 1200,
                height: 630,
                url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
            },
        ],
    },
}

type Props = {
    children: ReactNode;
};

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }


// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
    return children;
}

