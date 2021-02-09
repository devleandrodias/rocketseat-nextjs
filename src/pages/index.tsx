import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/home";

interface IProduct {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(({ id, title }) => {
            return <li key={id}>{title}</li>;
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
