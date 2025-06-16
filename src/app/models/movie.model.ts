export interface Movie {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  rating: number;
  duration: number;
  genres: MovieGenre[];
  releasedAt: string;
}

export type MovieGenre =
  | 'action'
  | 'adventure'
  | 'animation'
  | 'biography'
  | 'comedy'
  | 'crime'
  | 'drama'
  | 'fantasy'
  | 'history'
  | 'horror'
  | 'mystery'
  | 'romance'
  | 'sci-fi'
  | 'thriller'
  | 'war'
  | 'western';
