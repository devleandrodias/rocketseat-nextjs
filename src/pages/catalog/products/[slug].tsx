import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import React, { useState } from "react";

const AddToCartModal = dynamic(() => import("@/components/AddToCartModal"), {
  loading: () => <h1>Loading...</h1>,
  ssr: true, // So vai ser false quando o componente precisar de alguma variavel do broweser
});

export default function Product() {
  const router = useRouter();

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}