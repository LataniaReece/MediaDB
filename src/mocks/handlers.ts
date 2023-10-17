import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://api.themoviedb.org/3/discover/:mediaType", // Use a path parameter for mediaType
    (req, res, ctx) => {
      const { mediaType } = req.params;
      const page = req.url.searchParams.get("page");
      let results = [];
      if (mediaType === "tv") {
        results = [
          {
            backdrop_path: "/m0bV3qBiJBBlpFaaKjwHo13MVjm.jpg",
            first_air_date: "2005-01-03",
            genre_ids: [35, 10767],
            id: 14981,
            name: "The Late Late Show with Craig Ferguson",
            origin_country: ["US"],
            original_language: "en",
            original_name: "The Late Late Show with Craig Ferguson",
            overview:
              "The Late Late Show with Craig Ferguson is an American late-night talk show hosted by Scottish American comedian Craig Ferguson, who is the third regular host of the Late Late Show franchise. It follows Late Show with David Letterman in the CBS late-night lineup, airing weekdays in the US at 12:37 a.m. It is taped in front of a live studio audience from Monday to Friday at CBS Television City in Los Angeles, California, directly above the Bob Barker Studio. It is produced by David Letterman's production company Worldwide Pants Incorporated and CBS Television Studios.\n\nSince becoming host on January 3, 2005, after Craig Kilborn and Tom Snyder, Ferguson has achieved the highest ratings since the show's inception in 1995. While the majority of the episodes focus on comedy, Ferguson has also addressed difficult subject matter, such as the deaths of his parents, and undertaken serious interviews, such as one with Desmond Tutu, which earned the show a 2009 Peabody Award.",
            popularity: 8105.298,
            poster_path: "/gGC7zSDgG0FY0MbM1pjfhTCWQBI.jpg",
            vote_average: 7.1,
            vote_count: 76,
          },
          {
            backdrop_path: "/gMMnf8VRg3Z98WaFmOLr9Jk8pIs.jpg",
            first_air_date: "2015-09-08",
            genre_ids: [35, 10767],
            id: 63770,
            name: "The Late Show with Stephen Colbert",
            origin_country: ["US"],
            original_language: "en",
            original_name: "The Late Show with Stephen Colbert",
            overview:
              "Stephen Colbert brings his signature satire and comedy to The Late Show with Stephen Colbert, the #1 show in late night, where he talks with an eclectic mix of guests about what is new and relevant in the worlds of politics, entertainment, business, music, technology, and more. Featuring bandleader Jon Batiste with his band Stay Human, the Emmy Award-nominated show is broadcast from the historic Ed Sullivan Theater. Stephen Colbert, Chris Licht, Tom Purcell, and Jon Stewart are executive producers. Barry Julien and Denise Rehrig serve as co-executive producers.",
            popularity: 4230.862,
            poster_path: "/9jkThAGYj2yp8jsS6Nriy5mzKFT.jpg",
            vote_average: 6.5,
            vote_count: 202,
          },
        ];
      } else {
        results = [
          {
            adult: false,
            backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
            genre_ids: [35, 12, 14],
            id: 346698,
            original_language: "en",
            original_title: "Barbie",
            overview:
              "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
            popularity: 3661.8,
            poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
            release_date: "2023-07-19",
            title: "Barbie",
            video: false,
            vote_average: 7.3,
            vote_count: 4286,
          },
          {
            adult: false,
            backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
            genre_ids: [28, 80, 53],
            id: 385687,
            original_language: "en",
            original_title: "Fast X",
            overview:
              "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            popularity: 2876.124,
            poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            release_date: "2023-05-17",
            title: "Fast X",
            video: false,
            vote_average: 7.3,
            vote_count: 3660,
          },
        ];
      }
      const responseData = {
        page,
        results,
        total_pages: 1,
        total_results: 2,
      };

      return res(ctx.status(200), ctx.json(responseData));
    }
  ),
];

// export const handlers = [
//   rest.get(
//     "https://api.themoviedb.org/3/discover/movie?page=1",
//     (req, res, ctx) => {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           page: 1,
//           results: [
//             {
//               backdrop_path: "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
//               genre_ids: [28, 878, 27],
//               id: 615656,
//               overview:
//                 "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",

//               poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
//               release_date: "2023-08-02",
//               title: "Meg 2: The Trench",
//             },
//             {
//               backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
//               genre_ids: [35, 12, 14],
//               id: 346698,
//               overview:
//                 "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
//               poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
//               release_date: "2023-07-19",
//               title: "Barbie",
//             },
//           ],
//           total_pages: 1,
//           total_results: 2,
//         })
//       );
//     }
//   ),
// ];
