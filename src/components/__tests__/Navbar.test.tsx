import { render, screen, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Navbar";

describe("<Navbar />", () => {
  it("Renders navlinks", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();

    // Check the "Browse" section links
    const browseSection = screen.getByTestId("browse-section");
    expect(browseSection).toBeInTheDocument();

    const movieLinkBrowse = within(browseSection).getByRole("link", {
      name: "Movies",
    });
    expect(movieLinkBrowse).toBeInTheDocument();

    const tvShowLinkBrowse = within(browseSection).getByRole("link", {
      name: "TV Shows",
    });
    expect(tvShowLinkBrowse).toBeInTheDocument();

    // Check the "Favorites" section links
    const favoritesSection = screen.getByTestId("favorites-section");
    expect(favoritesSection).toBeInTheDocument();

    const movieLinkFavorites = within(favoritesSection).getByRole("link", {
      name: "Movies",
    });
    expect(movieLinkFavorites).toBeInTheDocument();

    const tvShowLinkFavorites = within(browseSection).getByRole("link", {
      name: "TV Shows",
    });
    expect(tvShowLinkFavorites).toBeInTheDocument();
  });
});
