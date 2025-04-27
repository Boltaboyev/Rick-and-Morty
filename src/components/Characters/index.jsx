import React, { useEffect, useRef } from "react";
import styles from "./Characters.module.css";
import Card from "../../shared/generics/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const Characters = () => {
  const targetRef = useRef(null);

  const fetchNextCharacters = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${pageParam}`
    );
    return {
      results: data.results,
      nextPage: data.info.next ? pageParam + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["characters"],
      queryFn: fetchNextCharacters,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <section className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["box"]}>
          {data?.pages?.map((page) =>
            page?.results?.map((item, index) => (
              <Card key={item.id} data={item} />
            ))
          )}
        </div>
        <div ref={targetRef} className={styles["loading"]}>
          {isFetchingNextPage && <p>Loading more characters...</p>}
        </div>
      </div>
    </section>
  );
};

export default Characters;
