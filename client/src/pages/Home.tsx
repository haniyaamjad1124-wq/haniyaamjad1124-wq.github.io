import React, { useEffect } from "react";
import Bookshelf from "../components/portfolio/Bookshelf";
import WallScene from "../components/portfolio/WallScene";
import { Header } from "../components/portfolio/Layout";
import { rumiArtwork } from "../data/sections";

export default function Home() {
  useEffect(() => {
    const artwork = new Image();
    artwork.src = rumiArtwork;
  }, []);
  return (
    <div className="entry-screen has-wall">
      <Header path="/" />
      <main id="main-content" className="entry-main" tabIndex={-1}>
        <div className="entry-top">
          <h1>You have entered the space of a weird cat lady</h1>
        </div>
        {/* Wide screens: the wall of shelves. Its styles hide it on phones. */}
        <WallScene />
        {/* Phones and narrow windows: the original spine grid. Hidden on wide screens. */}
        <div className="entry-center">
          <div className="entry-shelf">
            <Bookshelf />
          </div>
        </div>
      </main>
    </div>
  );
}
