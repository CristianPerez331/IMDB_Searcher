import { useState } from 'react';
import IMediaSearchResult from '../interfaces/IMediaSearchResult';
import './App.css';
import SearchBar from './searchBar/SearchBar';
import MovieDetails from './movieDetails/MovieDetails';
import SearchResults from './searchResults/SearchResults';
import TVShowDetails from './tvShowDetails/TVShowDetails';

function App() {
  const [searchResults, setSearchResults] = useState<IMediaSearchResult[] | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<IMediaSearchResult | null>(null);

  const displayShowDetails = () => {
    switch(selectedMedia?.type) {
      case 'Movie':
        return <MovieDetails selectedMovieId={selectedMedia.imdb_id}/>;
      case 'TV Show':
        return <TVShowDetails selectedTVShowId={selectedMedia.imdb_id}/>;
      default:
        return <p className="Default-Media-Data">Search for a Movie or TV Show to the left, click and the details will appear here.</p>;
    }
  }

  return (
    <div className="App">
      <div className="Search-Section">
        <SearchBar setSearchResults={(results) => { setSearchResults(results); setSelectedMedia(null); }} />
        <SearchResults searchResults={searchResults} setSelectedMedia={setSelectedMedia}/>
      </div>
      <div className="Media-Data">
        { displayShowDetails() }
      </div>
    </div>
  );
}

export default App;
