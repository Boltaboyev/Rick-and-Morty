import React from "react";
import { useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

import styles from "./MainSide.module.css";
import Card from "../../../shared/generics/card";

const MainSide = () => {
  const { episodeId } = useParams();

  const fetchOneEpisode = async () => {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    return data;
  };

  const fetchOneCharacter = async (url) => {
    const { data } = await axios.get(url);
    return data;
  };

  // Episode ma'lumotlarini olish
  const { data: episodeData, isLoading, isError } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: fetchOneEpisode,
    enabled: !!episodeId,
  });

  // Faqat episodeData yuklangandan keyin useQueries ishlashi kerak
  const charactersData = useQueries({
    queries:
      episodeData?.characters?.map((item) => {
        return {
          queryKey: ["character", item],
          queryFn: () => fetchOneCharacter(item),
          enabled: !!episodeData, // ✅ Faqat episodeData mavjud bo‘lsa so‘rov ishlaydi
        };
      }) || [],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching episode!</p>;

  return (
    <div className={styles["container"]}>
      <h1 className={styles["title"]}>{episodeData?.name}</h1>
      <p className={styles["descr"]}>Air Date: {episodeData?.air_date}</p>
      <p className={styles["descr"]}>Episode Number: {episodeData?.episode}</p>
      <p className={styles["epizode-id"]}>
        {episodeData?.id >= 10 ? episodeData.id : `0${episodeData?.id}`}
      </p>
      <div className={styles["card-wrapper"]}>
        {charactersData.map(({ data, isLoading }, index) =>
          isLoading ? (
            <p key={index}>Loading character...</p>
          ) : (
            <Card key={data.id} data={data} />
          )
        )}
      </div>
    </div>
  );
};

export default MainSide;
