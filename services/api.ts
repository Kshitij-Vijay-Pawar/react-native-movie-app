export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`  },
};

export const fetchPopularMovies = async ({query}: {query: string}) => {

    const endpoint = query 
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if(!response.ok) {
        // @ts-ignore
      throw new Error('Failed to fetch movies', response.statusText);
    }
    
    const data = await response.json();
    return data.results;
};

const url =
  "https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOThlNTEzM2FlYTRiYWFkZmQwYTcyMjM3ZjMxYTEyYiIsIm5iZiI6MTc2MTM2ODk1Ni4zODUsInN1YiI6IjY4ZmM1YjdjZjU3ZDFjYWY5MTNiZjIwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLM64VkntRJyjLu4HAfTpAFoudq513IbXEojxSOiT2U",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
