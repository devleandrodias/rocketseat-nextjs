import { GetServerSideProps } from "next";

import { Title } from "@/styles/pages/home";
import SEO from "@/components/SEO";

interface IProduct {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // Import Dynamic
  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const math = (await import("../lib/math")).default;

    console.log(math.sum(20, 23));
  }

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
          {recommendedProducts.map(({ id, title }) => {
            return <li key={id}>{title}</li>;
          })}
        </ul>
      </section>
      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

// Client, Server, Static

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  );

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
