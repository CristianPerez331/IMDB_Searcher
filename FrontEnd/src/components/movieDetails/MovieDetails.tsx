import { useState, useEffect } from 'react';
import IMovieDetails from '../../interfaces/IMovieDetails';
import { getMovieDetailsById } from '../../endpoints/movie';
import { Fade } from "react-awesome-reveal";
import Loader from "react-loader-spinner";
import './MovieDetails.css';

interface IProps {
  selectedMovieId: string | null;
}

const MovieDetails = (props: IProps) => {

  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);
  const [movieDetailError, setMovieDetailError] = useState<string>('');

  useEffect(() => {
    setMovieDetails(null);
    setMovieDetailError('');
    if (!props.selectedMovieId) return;

    getMovieDetailsById(props.selectedMovieId).then((data) => {
      setMovieDetails(data);
    }).catch((error) => {
      setMovieDetailError(error.message);
    });
  }, [props.selectedMovieId]);

  const displayList = (list: string[]) => (
    list?.map((item) => (
      <span key={item} className="Movie-Details-List">{item}</span>
    ))
  );

  return (
    <>
      {!movieDetails &&
        <div className="Loading-Icon">
          <Loader
            type="ThreeDots"
            color="black"
            height={70}
            width={70}
          />
        </div>
      }
      {movieDetails && 
        <div className="Movie-Details">
          <div className="Movie-Fan-Art" style={{ backgroundImage: `url(${movieDetails.fanart})`}}/>
          <Fade triggerOnce>
            <div className="Movie-Details-Panels">
              <div className="Movie-Details-Right-Panel">
                <p>Released: {movieDetails.release_date}</p>
                <p>Rated: {movieDetails.rated}</p>
                <p>Runtime: {movieDetails.runtime} Minutes</p>
                <p>Rating: {movieDetails.imdb_rating}</p>
                <hr />
                <p>Movie Poster:</p>
                <img className="Movie-Poster" width='300' src={movieDetails.poster}/>
                
                {movieDetails.youtube_trailer_key && (
                  <>
                    <hr />
                    <p>Movie Trailer:</p>
                    <iframe className="Movie-Video" height="280" src={`http://www.youtube.com/embed/${movieDetails.youtube_trailer_key}`} width="350"></iframe>
                  </>
                )}
              </div>

              <div className="Movie-Details-Left-Panel">
                {displayList(movieDetails.genres)}
                <h2>{movieDetails.title}</h2>
                <p>{movieDetails.description}</p>
                <hr/>
                <h3>Directors</h3>
                {displayList(movieDetails.directors)}
                <hr/>
                <h3>Countries</h3>
                {displayList(movieDetails.countries)}
                <hr/>
                <h3>Languages</h3>
                {displayList(movieDetails.language)}
                <hr/>
                <h3>Stars</h3>
                {displayList(movieDetails.stars)}
              </div>
            </div>
          </Fade>
        </div>
      }
      {movieDetailError && (
        <div className="Movie-Details-Error">{movieDetailError}</div>
      )}
    </>
  );
}

export default MovieDetails;
