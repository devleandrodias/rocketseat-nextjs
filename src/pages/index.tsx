import { GetServerSideProps } from "next";
import { Document } from "prismic-javascript/types/documents";

import Link from "next/link";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";

import { Title } from "@/styles/pages/home";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // Import Dynamic
  // async function handleSum() {
  //   console.log(process.env.NEXT_PUBLIC_API_URL);
  //   const math = (await import("../lib/math")).default;

  //   console.log(math.sum(20, 23));
  // }

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        shoudExcludTitleSuffix
        image="banner.png"
      />
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(({ id, data, uid }) => {
            return (
              <li key={id}>
                <Link href={`catalog/products/${uid}`}>
                  <a>{PrismicDOM.RichText.asText(data.title)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      {/* <button onClick={handleSum}>Sum</button> */}
    </div>
  );
}

// Client, Server, Static

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  // );

  // const recommendedProducts = await response.json();

  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
