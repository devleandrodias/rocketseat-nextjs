import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";

// import dynamic from "next/dynamic";

import React, { useState } from "react";

// const AddToCartModal = dynamic(() => import("@/components/AddToCartModal"), {
//   loading: () => <h1>Loading...</h1>,
//   ssr: true, // So vai ser false quando o componente precisar de alguma variavel do broweser
// });

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  if (router.isFallback) {
    return <p>Carregando</p>;
  }

  return (
    <div>
      <a>{PrismicDOM.RichText.asText(product.data.title)}</a>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>

      <p>Price: ${product.data.price}</p>

      <img src={product.data.thumbnail.url} width={600} />

      {/* <button onClick={handleAddToCart}>Add to cart</button> */}

      {/* {isAddToCartModalVisible && <AddToCartModal />} */}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const categories = await client().query([
  //   Prismic.Predicates.at("document.type", "category"),
  // ]);

  // const paths = categories.results.map((category) => {
  //   return {
  //     params: { slug: category.uid },
  //   };
  // });

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (ctx) => {
  const { slug } = ctx.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5, // 5 segundos
  };
};
