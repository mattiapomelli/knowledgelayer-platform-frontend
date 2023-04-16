import type { DefaultSeoProps } from "next-seo";

const title = "uKnow";
const description = "Learn and teach anything";
const url = "https://beta.cryvia.xyz/";

const config: DefaultSeoProps = {
  title,
  description,
  canonical: url,
  openGraph: {
    type: "website",
    locale: "en_IE",
    site_name: title,
    title,
    description,
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default config;
