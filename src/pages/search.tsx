import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import { Document } from "prismic-javascript/types/documents";

import Link from "next/link";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";
import { client } from "@/lib/prismic";

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    },
    [search, router]
  );

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <ul>
          {searchResults.map(({ id, data, uid }) => {
            return (
              <li key={id}>
                <Link href={`catalog/products/${uid}`}>
                  <a>{PrismicDOM.RichText.asText(data.title)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  ctx
) => {
  const { q } = ctx.query;

  if (!q) {
    return { props: { searchResults: [] } };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.fulltext("my.product.title", String(q)),
  ]);

  return {
    props: { searchResults: searchResults.results },
  };
};
