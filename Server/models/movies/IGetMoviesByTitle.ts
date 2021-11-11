export default interface IGetMoviesByTitle {
    "movie_results": {
        "imdb_id": string;
        "title": string;
        "year": number;
    } [];
    "search_results": number;
    "status": string;
    "status_message": string;
}