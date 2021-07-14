import {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom';
import { Movie } from '../../utils/types';
import * as S from './styles';
import { movieDetailsURL, imageUrl, trelloListId, trelloToken, trelloKey, customFieldEmail, customFieldSurname, customFieldName, customFieldPhone, customFieldMovie } from '../../utils/constants';
import { getColor } from '../../utils/helpers';
import Layout from '../../components/Layout';
import FeedbackForm, { FeedbackFormInput } from './FeedbackForm';

type CreateState = "idle" | "createCard" | "updateCard" | "cardDone" | "error"

const MovieDetails = () => {
  const {id} = useParams() as {id: string};
  const [cardState, setCardState] = useState<CreateState>("idle");
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [formKey, setFomkey] = useState(Date.now());
  
  const getData = useCallback(async () => {
    const req = await fetch(movieDetailsURL(id));
    const res = await req.json();
    setMovie(res);
    setLoading(false);
  }, [id]);

  const createCardApi = (data: FeedbackFormInput) => {
    const name = `${data.name} ${data.surname}`;
    setCardState("createCard");
    fetch(`https://api.trello.com/1/cards?key=${trelloKey}&token=${trelloToken}&idList=${trelloListId}&name=${name}`, {
      method: 'POST'
    })
      .then((res) => res.json())
      .then((returnedData) => {
        const {id} = returnedData;
        updateCardApi(id, data)
      }).catch((error) => {
        setCardState("error");
        console.log(error)
      })
  }; 

  const getUpdateParams = (id: string, data: Record<string, string>) => {
    const params: Promise<Response>[] = [];
    Object.keys(data).forEach((key) => {
      console.log(key, data[key])
      params.push(
        fetch(`https://api.trello.com/1/card/${id}/customField/${key}/item`, {
          method: 'PUT',
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            value: {
              "text": data[key]
            },
            key: trelloKey,
            token: trelloToken
          })
        })
      );
    })
    
    return params;
  }

  const updateCardApi = (id: string, data: FeedbackFormInput) => {
    setCardState("updateCard");
    Promise.all(getUpdateParams(id,
      {
      [customFieldEmail]: data.email,
      [customFieldSurname]: data.surname,
      [customFieldName]: data.name,
      [customFieldPhone]: data.phone,
      [customFieldMovie]: movie?.title as string
    })).then((data) => {
      setCardState("cardDone");
      setTimeout(() => {
        setCardState("idle");
        setFomkey(Date.now())
      }, 2000);
    }).catch((error) => {
      setCardState("error");
      console.log(error)
    })
  }
  
  useEffect(() => {
    getData()
  }, [id, getData])
  const date = !movie ? new Date() : new Date(movie.release_date);

  const getCardState = () => {
    let state = "";
    switch (cardState) {
      case "cardDone":
        state = "Card successfully created!"
        break;
      case "createCard":
        state = "Creating a new card..."
        break; 
      case "updateCard":
        state = "Updating card data..."
        break;
      case "error":
        state = "Error while creating your card!!!"
        break;
      default:
        state = "";
        break;
    }

    return state;
  }
  return (
    <Layout>
    <S.Container>
      {movie && !loading && (
        <>
          <S.MovieImage src={imageUrl(movie.poster_path)}/>
          <S.MovieContents>
            <MovieDetail title={movie.title} year={date.getFullYear()} content="Ahh!! its got that new movie smell" />
            <Rating rating={movie.vote_average / 10 * 100}/>
            <MovieDetail title="Overview" content={movie.overview} />
            <MovieDetail title="Genres" content={movie.genres.map((genre) => genre.name).join(", ")} />
            <FeedbackForm key={formKey} onSubmit={(data) => {
              console.log(data);
              void createCardApi(data)
            }} />
            <span style={{
              color: cardState === "error" ? "red" : cardState === "cardDone" ? "green" : "black"
            }}>{getCardState()}</span>
          </S.MovieContents>
        </>
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

const Rating = ({rating}:{rating: number}) => {
  return (
    <div style={{
      background: getColor(rating),
      padding: '4px 8px',
      marginBottom: 16,
    }}>Rating {Math.round(rating)}</div>
  )
}

interface MovieDetailProps {
  title: string;
  year?: number; 
  content?: string;
}

const MovieDetail = ({
  content,
  title,
  year
}: MovieDetailProps) => {
  return (
    <S.MovieDetail>
      <S.MovieDetailTitle hasUnderline={!!year}>
        <h2>{title}</h2>
        {year && <h3>({year})</h3>}
      </S.MovieDetailTitle>
      {content && <S.MovieDetailContent>{content}</S.MovieDetailContent>}
    </S.MovieDetail>
  )
}

export default MovieDetails;
