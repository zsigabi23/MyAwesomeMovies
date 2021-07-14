const apiKey = 'd4f7b87d7cedfdfbbb297f46aa3e8779';

export const allMoviesURL = (page = 1) => `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

export const movieDetailsURL = (movieId: string) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

export const imageUrl = (path: string) => `https://www.themoviedb.org/t/p/w220_and_h330_face/${path}`;

export const trelloKey = "6eb508bda626ff893db446eff50d0066";

export const trelloToken = "ae4a73cb0e40c46f6e642f5f7429394534b35e3b5a4c7c21438e5389eec20497";

export const trelloBoardId = "5a4b3c4cbe0188ca9c0b2058";

export const trelloListId = "5a4b3c4cbe0188ca9c0b2059";

export const customFieldName = "5ffc223c1b802319cb6192fb";

export const customFieldSurname = "5ffc224be427094809dd7b7c";

export const customFieldEmail = "5ffc22574a33172aa21ccda1";

export const customFieldPhone = "5ffc22612d199f8b0e325ef4";

export const customFieldMovie = "5ffc672ef7f3ca718a1a9b93";
