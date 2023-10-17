import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import MediaDiscover from "../MediaDiscover";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
// import { movieList } from "../../../mocks/mockData/movieMedia";
// import { showList } from "../../../mocks/mockData/showMedia";
// import { Movie, Show } from "../../../types/api";
// import { FavoritesProvider } from "../../../contexts/FavoritesContext";

function renderMediaDiscover(pathname: string) {
  const location = {
    pathname: pathname,
  };

  return render(
    <StaticRouter location={location}>
      <FavoritesProvider>
        <MediaDiscover />
      </FavoritesProvider>
    </StaticRouter>
  );
}

describe("<MediaDiscover />", () => {
  it("mounts", async () => {
    renderMediaDiscover("/media/movies");
    const headerElement = await screen.findByTestId("mediaDiscoverHeader");
    expect(headerElement).toBeInTheDocument();
  });
});
