import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import MediaGridList from "../MediaGridList";
import { movieList } from "../../../mocks/mockData/movieMedia";
import { showList } from "../../../mocks/mockData/showMedia";
import { Movie, Show } from "../../../types/api";
import { FavoritesProvider } from "../../../contexts/FavoritesContext";

function renderMediaGridList(
  pathname: string,
  media: Movie[] | Show[] | [],
  type: string
) {
  const location = {
    pathname: pathname,
  };

  return render(
    <StaticRouter location={location}>
      <FavoritesProvider>
        <MediaGridList media={media} type={type} />
      </FavoritesProvider>
    </StaticRouter>
  );
}

describe("<MediaGridList />", () => {
  it("displays no movies found with empty list on /media/movies", () => {
    renderMediaGridList("/media/movies", [], "movies");
    expect(screen.getByText("No Movies Found")).toBeInTheDocument();
  });

  it("displays no favorite movies found with empty list on /favorites/media/movies", () => {
    renderMediaGridList("/favorites/media/movies", [], "movies");
    expect(screen.getByText("No Favorite Movies Found")).toBeInTheDocument();
  });

  it("displays movies on /media/movies with given movie list", () => {
    renderMediaGridList("/media/movies", movieList, "movies");

    const gridContainer = expect(screen.getByTestId("mediaGridContainer"));
    gridContainer.toBeInTheDocument();

    const gridItems = screen.getAllByTestId("mediaGridItem");
    expect(gridItems).toHaveLength(2);
  });

  it("displays fav movies on /favorites/media/movies with given movie list", () => {
    renderMediaGridList("/favorites/media/movies", movieList, "movies");

    const gridContainer = expect(screen.getByTestId("mediaGridContainer"));
    gridContainer.toBeInTheDocument();

    const gridItems = screen.getAllByTestId("mediaGridItem");
    expect(gridItems).toHaveLength(2);
  });

  it("displays no shows found with empty list on /media/shows", () => {
    renderMediaGridList("/media/shows", [], "shows");
    expect(screen.getByText("No Shows Found")).toBeInTheDocument();
  });

  it("displays no favorite shows found with empty list on /favorites/media/shows", () => {
    renderMediaGridList("/favorites/media/shows", [], "shows");
    expect(screen.getByText("No Favorite Shows Found")).toBeInTheDocument();
  });

  it("displays shows on /media/shows with given movie list", () => {
    renderMediaGridList("/media/shows", showList, "shows");

    const gridContainer = expect(screen.getByTestId("mediaGridContainer"));
    gridContainer.toBeInTheDocument();

    const gridItems = screen.getAllByTestId("mediaGridItem");
    expect(gridItems).toHaveLength(2);
  });

  it("displays fav movies on /favorites/media/movies with given movie list", () => {
    renderMediaGridList("/favorites/media/movies", showList, "shows");

    const gridContainer = expect(screen.getByTestId("mediaGridContainer"));
    gridContainer.toBeInTheDocument();

    const gridItems = screen.getAllByTestId("mediaGridItem");
    expect(gridItems).toHaveLength(2);
  });
});
