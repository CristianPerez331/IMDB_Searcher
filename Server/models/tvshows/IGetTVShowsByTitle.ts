export default interface IGetTVShowsByTitle {
    "tv_results": {
        "imdb_id": string;
        "title": string;
        "release_date": string;
    } [];
    "search_results": number;
    "status": string;
    "status_message": string;
}