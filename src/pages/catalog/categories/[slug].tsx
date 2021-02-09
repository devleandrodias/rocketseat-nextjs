import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import { Title } from "@/styles/pages/home";

interface ICategory {
  id: number;
  title: string;
}

interface CategoryProps {
  products: ICategory[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando</p>;
  }

  return (
    <div>
      {router.query.slug}

      <section>
        <Title>TOP 10</Title>
        <ul>
          {products.map(({ id, title }) => {
            return <li key={id}>{title}</li>;
          })}
        </ul>
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);

  const categories = await response.json();

  const paths = categories.map((category: ICategory) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (ctx) => {
  const { slug } = ctx.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`
  );

  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60, // 5 segundos
  };
};
