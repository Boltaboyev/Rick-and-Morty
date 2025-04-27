import React from "react";

import styles from "./Sidebar.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate=useNavigate()
  const fetchEpisodes = async () => {
    const data = await axios("https://rickandmortyapi.com/api/episode");
    return data?.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["episodes"],
    queryFn: () => fetchEpisodes(),
  });
  return (
    <div className={styles["container"]}>
      <h1 className={styles["header"]}>All Episodes</h1>
      <div className={styles["items-wrapper"]}>
        {data?.results?.map((value) => (
          <div onClick={()=>navigate(`/episodes/${value.id}`)} key={value.id} className={styles["items"]}>
            {" "}
            {value.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
