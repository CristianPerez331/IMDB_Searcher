import { Dispatch, SetStateAction } from "react";
import IMediaSearchResult from "../../interfaces/IMediaSearchResult";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons';
import { Slide } from "react-awesome-reveal";
import './SearchResults.css';

interface IProps {
  searchResults: IMediaSearchResult[] | null;
  setSelectedMedia: Dispatch<SetStateAction<IMediaSearchResult | null>>;
}

const SearchResults = (props: IProps) => {

  return (
    <div className="Search-Results">
      {
        props.searchResults && props.searchResults.map((searchResult, index) => (
          <div
            className="Search-Result-Group"
            key={searchResult.imdb_id}
            id={searchResult.imdb_id}
            onClick={() => { props.setSelectedMedia(searchResult); }}
            style={{ animationDelay: `${.1*index}s` }}
          >
            <div className="Search-Result-Container">
              <div className="Search-Result-Info">
                <div className="Search-Result-Title">
                  {searchResult.title}
                </div>
                <hr/>
                <div className="Search-Result-Year">
                  {searchResult.year}
                </div>
              </div>
              <div className="Search-Result-Type">
                <FontAwesomeIcon
                  className="Search-Result-Icon"
                  icon={searchResult.type === 'Movie' ? faFilm: faTv}
                  size="lg"
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default SearchResults;
