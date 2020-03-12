import Constants from "expo-constants";

export const INITIAL_STATE_MOVIE = {
  Title: 'N/A',
  Poster: 'N/A',
  Year: 'N/A',
  Rated: 'N/A',
  Runtime: 'N/A',
  Plot: 'N/A',
  Ratings: [
    { Source: 'N/A', Value: 'N/A' },
    { Source: 'N/A', Value: 'N/A' },
    { Source: 'N/A', Value: 'N/A' },
  ],
};

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;