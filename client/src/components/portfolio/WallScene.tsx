import React, { useEffect, useRef, useState } from "react";
import { resumeUrl } from "../../data/sections";
import { WALL_HTML, mountWall } from "./wallSceneScript";

type Origin = { x: number; y: number };
type Wall = { destroy(): void };
type WallOptions = {
  /** Open a shelf's page. `external` is true for the resume, which is a file, not a route. */
  navigate(path: string, external: boolean, origin: Origin): void;
  resumeUrl?: string | null;
  /** The window was resized across one of the wall's sizes: it needs building again. */
  onRetier?(): void;
};
const mount = mountWall as (root: HTMLElement, options: WallOptions) => Wall;

// One object for the life of the page: React writes the markup again whenever it is handed a
// new object here, which would wipe the scene the script has built inside it.
const wallMarkup = { __html: WALL_HTML };

/*
  The entrance wall: four shelves, a cat, and one page behind each shelf.
  The scene itself is built and run by wallSceneScript.ts; this component gives it a place to
  live, hands it a way to open a page, and takes it down again.
*/
export default function WallScene() {
  const root = useRef<HTMLDivElement>(null);
  // bumped when the window crosses one of the wall's sizes, to take the scene down and build
  // the one for the new width
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const wall = mount(root.current, {
      resumeUrl,
      onRetier: () => setSize(n => n + 1),
      navigate(path, external, origin) {
        if (external) {
          window.location.assign(path);
          return;
        }
        // the same request the old bookshelf made: the page opens from where the book fell
        const handled = !window.dispatchEvent(
          new CustomEvent("portfolio:navigate", { cancelable: true, detail: { path, origin } })
        );
        if (!handled) window.location.assign(path);
      },
    });
    return () => wall.destroy();
  }, [size]);

  return (
    <div className="wall-scene" ref={root}>
      <div className="fit" id="fit" dangerouslySetInnerHTML={wallMarkup} />
    </div>
  );
}
