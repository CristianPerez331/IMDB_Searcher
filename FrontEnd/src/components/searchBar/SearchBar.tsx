import React, { Dispatch, SetStateAction, useState } from "react";
import { searchTitle } from "../../endpoints/media";
import IMediaSearchResult from "../../interfaces/IMediaSearchResult";
import { AttentionSeeker } from "react-awesome-reveal";
import './SearchBar.css';

interface IProps {
  setSearchResults: Dispatch<SetStateAction<IMediaSearchResult[] | null>>;
}

const Header = (props: IProps) => {

  const [movieTitle, setMovieTitle] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');

  const search = () => {
    setSearchError('');
    props.setSearchResults(null);

    searchTitle(movieTitle).then((data) => {
      props.setSearchResults(data);
    }).catch((error) => {
      setSearchError(error.message);
    });
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      search();
    }
  }

  /* This function is to animate the input when there is an error */
  const getSearchInput = (): JSX.Element => {
    if (searchError.includes('Movie/TV Show Title Cannot Be Empty.')) {
      return (<AttentionSeeker effect="headShake">
        <div>
          <input 
            type='text'
            value={movieTitle}
            placeholder='Movie/Show Title'
            onChange={(event) => { setMovieTitle(event.target.value); setSearchError(''); }}
            onKeyPress={(event) => { handleKeyPress(event); }}
            autoFocus
          />
          <button onClick={search}> Search </button>
        </div>
      </AttentionSeeker>);
    }
    return (<div>
      <input 
        type='text'
        value={movieTitle}
        placeholder='Movie/Show Title'
        onChange={(event) => { setMovieTitle(event.target.value); setSearchError(''); }}
        onKeyPress={(event) => { handleKeyPress(event); }}
        autoFocus
      />
      <button onClick={search}> Search </button>
    </div>);
  }

  return (
    <div className="Search-Bar">
      <div className="Search-Field">
        Enter Movie/Show Title:
        {getSearchInput()}
        { searchError && (
          <div className="Search-Error">{searchError}</div>
        )}
      </div>
    </div>
  );
}

export default Header;
