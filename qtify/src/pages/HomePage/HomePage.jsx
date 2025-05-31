import React from "react";
import { useOutletContext } from "react-router-dom";
import { fetchFilters } from "../../Api/api";
import Hero from "../../Components/Hero/Hero";
import Section from "../../Components/Section/Section";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { data } = useOutletContext();
  const { newAlbums, topAlbums, songs, genres } = data;

  console.log("genres", genres);

  return (
    <>
      <Hero />
      <div className={styles.wrapper}>
        <Section title="Top Albums" data={topAlbums} type="album" />
        <Section title="New Albums" data={newAlbums} type="album" />
        <Section
          title="Songs"
          data={songs}
          filterSource={fetchFilters}
          type="song"
        />
      </div>
    </>
  );
}
