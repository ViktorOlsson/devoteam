import { Movie } from '../../models/movie.model';

export const mockMovies: Movie[] = [
  {
    id: '1',
    name: 'Inception',
    description:
      'A skilled thief is given a chance at redemption if he can successfully perform inception.',
    thumbnail: 'https://via.placeholder.com/150x220?text=Inception',
    rating: 8.8,
    duration: 148,
    genres: ['action', 'sci-fi', 'thriller'],
    releasedAt: '2010-07-16T00:00:00Z',
  },
  {
    id: '2',
    name: 'Interstellar',
    description:
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
    thumbnail: 'https://via.placeholder.com/150x220?text=Interstellar',
    rating: 8.6,
    duration: 169,
    genres: ['adventure', 'drama', 'sci-fi'],
    releasedAt: '2014-11-07T00:00:00Z',
  },
  {
    id: '3',
    name: 'The Dark Knight',
    description:
      'Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.',
    thumbnail: 'https://via.placeholder.com/150x220?text=Dark+Knight',
    rating: 9.0,
    duration: 152,
    genres: ['action', 'crime', 'drama'],
    releasedAt: '2008-07-18T00:00:00Z',
  },
  {
    id: '4',
    name: 'La La Land',
    description:
      'A jazz musician and an aspiring actress fall in love while pursuing their dreams.',
    thumbnail: 'https://via.placeholder.com/150x220?text=La+La+Land',
    rating: 8.0,
    duration: 128,
    genres: ['comedy', 'drama', 'romance'],
    releasedAt: '2016-12-09T00:00:00Z',
  },
  {
    id: '5',
    name: '1917',
    description:
      'Two British soldiers are tasked with delivering a message deep in enemy territory during WWI.',
    thumbnail: 'https://via.placeholder.com/150x220?text=1917',
    rating: 8.3,
    duration: 119,
    genres: ['war', 'drama', 'history'],
    releasedAt: '2019-12-25T00:00:00Z',
  },
];
