import { GetStaticProps } from "next";
import { Title } from "../styles/pages/home";

interface IProduct {
  id: number;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <section>
      <Title>TOP 10</Title>
      <ul>
        {products.map(({ id, title }) => {
          return <li key={id}>{title}</li>;
        })}
      </ul>
    </section>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async (ctx) => {
  // const response = await fetch("http://localhost:3333/products");

  // const products = await response.json();

  return {
    props: {
      products: [],
    },
    revalidate: 5, // 5 segundos
  };
};
