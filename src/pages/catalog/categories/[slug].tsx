import Link from "next/link";

import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";

// import { Title } from "@/styles/pages/home";
import { client } from "@/lib/prismic";

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>;
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <section>
        <ul>
          {products.map(({ id, data, uid }) => {
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
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);

  const paths = categories.results.map((category) => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (ctx) => {
  const { slug } = ctx.params;

  const category = await client().getByUID("category", String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.at("my.product.category", category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60, // 5 segundos
  };
};
