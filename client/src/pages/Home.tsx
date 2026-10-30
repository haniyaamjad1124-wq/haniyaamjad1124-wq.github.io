import React, { useEffect } from "react";
import Bookshelf from "../components/portfolio/Bookshelf";
import { Header } from "../components/portfolio/Layout";
import { rumiArtwork } from "../data/sections";

export default function Home() {
  useEffect(() => {
    const artwork = new Image();
    artwork.src = rumiArtwork;
  }, []);
  return (
    <div className="entry-screen">
      <Header path="/" />
      <main id="main-content" className="entry-main" tabIndex={-1}>
        <h1 className="sr-only">Haniya Amjad portfolio</h1>
        <div className="entry-center">
          <div className="entry-shelf">
            <Bookshelf />
          </div>
        </div>
      </main>
    </div>
  );
}
