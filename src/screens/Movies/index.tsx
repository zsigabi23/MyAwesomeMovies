import {useState} from 'react'
import * as S from './styles';
import { allMoviesURL, imageUrl } from '../../utils/constants';
import { ApiResponseAll, PartialMovie } from '../../utils/types';
import { getColor } from '../../utils/helpers';
import Layout from '../../components/Layout';

const Movies = () => {
  const [data, setData] = useState<PartialMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState(1);
  
  const getData = async () => {
    if (loading) return;
    setLoading(true);
    console.log('GetData', nextPage)
    const request = await fetch(allMoviesURL(nextPage));
    const response: ApiResponseAll = await request.json();
    const {results = [], total_pages = 1} = response;
    setPageLimit(total_pages);
    setData((data) => [...data, ...results]);
    setLoading(false);
    setNextPage(nextPage + 1);
  }

  console.log('No. of Pages', pageLimit);

  return (
    <Layout 
      infiniteOptions={{
        hasMoreData: nextPage !== pageLimit,
        isLoading: loading,
        loadOnMount: true,
        onBottomHit: () => getData()
      }}
    >
    <S.Container>
      {data.length > 0 && (
        <S.MovieItems>
          {data.map((movie, index) => {
            return (
              <MovieCard key={index} movie={movie} />
            )
          })}
        </S.MovieItems>
      )}
      {loading && (
        <div style={{
          padding: 64,
          textAlign: 'center',
        }}>Loading data...</div>
      )}
    </S.Container>
    </Layout>
  )
}

const MovieCard = ({
  movie
}: {
  movie: PartialMovie
}) => {
  const avg = (movie.vote_average / 10) * 100;
  return (
    <S.MovieItem href={`/movie/${movie.id}`}>
      <img src={imageUrl(movie.poster_path)} alt={movie.title} />
      <span>{movie.title}</span>
      <S.Rating style={{
        background: getColor(avg)
      }}>{Math.round(avg)}</S.Rating>
    </S.MovieItem>
  )
}

export default Movies;
