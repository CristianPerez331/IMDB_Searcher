import { useState, useEffect } from 'react';
import { getTVShowDetailsById } from '../../endpoints/tvshow';
import ITVShowDetails from '../../interfaces/ITVShowDetails';
import { Fade } from "react-awesome-reveal";
import './TVShowDetails.css';

interface IProps {
  selectedTVShowId: string | null;
}

const TVShowDetails = (props: IProps) => {

  const [tvShowDetails, setTVShowDetails] = useState<ITVShowDetails | null>(null);
  const [tvShowDetailError, setTVShowDetailError] = useState<string>('');

  useEffect(() => {
    setTVShowDetails(null);
    setTVShowDetailError('');
    if (!props.selectedTVShowId) return;

    getTVShowDetailsById(props.selectedTVShowId).then((data) => {
      setTVShowDetails(data);
    }).catch((error) => {
      setTVShowDetailError(error.message);
    });
  }, [props.selectedTVShowId]);

  const displayList = (list: string[]) => (
    list.map((item) => (
      <span key={item} className="TV-Show-Details-List">{item}</span>
    ))
  );

  return (
    <>
      {tvShowDetails && 
        <div className="TV-Show-Details">
          <div className="TV-Show-Fan-Art" style={{ backgroundImage: `url(${tvShowDetails.fanart})`}}/>
          
          <Fade triggerOnce>
            <div className="TV-Show-Details-Panels">
              <div className="TV-Show-Details-Right-Panel">
                <p>Released: {tvShowDetails.release_date}</p>
                <p>Rated: {tvShowDetails.rated}</p>
                <p>Runtime: {tvShowDetails.runtime} Minutes</p>
                <p>Rating: {tvShowDetails.imdb_rating}</p>
                <hr />
                <p>Movie Poster:</p>
                <img className="TV-Show-Poster" width='300' src={tvShowDetails.poster}/>
                <hr />
                <p>Movie Trailer:</p>
                <iframe className="TV-Show-Video" height="280" src={`http://www.youtube.com/embed/${tvShowDetails.youtube_trailer_key}`} width="350"></iframe>
              </div>

              <div className="TV-Show-Details-Left-Panel">
                {displayList(tvShowDetails.genres)}
                <h2>{tvShowDetails.title}</h2>
                <p>{tvShowDetails.description}</p>
                <hr/>
                <h3>Creators</h3>
                {displayList(tvShowDetails.creators)}
                <hr/>
                <h3>Countries</h3>
                {displayList(tvShowDetails.countries)}
                <hr/>
                <h3>Networks</h3>
                {displayList(tvShowDetails.networks)}
                <hr/>
                <h3>Languages</h3>
                {displayList(tvShowDetails.language)}
                <hr/>
                <h3>Stars</h3>
                {displayList(tvShowDetails.stars)}
              </div>
            </div>
          </Fade>
        </div>
      }
      {tvShowDetailError && (
        <div className="TV-Show-Details-Error">{tvShowDetailError}</div>
      )}
    </>
  );
}

export default TVShowDetails;
