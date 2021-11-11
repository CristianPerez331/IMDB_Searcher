import Axios from 'axios';
import IGetMoviesByTitle from '../models/movies/IGetMoviesByTitle';
import IGetMovieDetailsById from '../models/movies/IGetMovieDetailsById';
import IGetMovieImagesById from '../models/movies/IGetMovieImagesById';

class MovieAccess {

    getMoviesByTitle = async (movieTitle: string): Promise<IGetMoviesByTitle> => {

        const tempData = {
            "movie_results": [
                {
                    "imdb_id": "tt1974203",
                    "title": "Adventures in Odyssey: Escape from the Forbidden Matrix",
                    "year": 2001,
                }
            ],
            "search_results": 11,
            "status": "OK",
            "status_message": "Query was successful",
        };

        if (tempData.status !== "OK") throw new Error("There is an error");
        
        return tempData;
    }

    getMovieDetailsById = async (id: string): Promise<IGetMovieDetailsById> => {
        const tempData = {
            "countries":[
                "Brazil",
                "China",
                "United States of America",
            ],
            "description":"The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
            "directors":[
                "Dan Bradley",
                "James Gray",
                "Sharron Reynolds-Enriquez",
                "Doug Torres",
                "Christina Fong",
                "Mark Valenzuela"
            ],
            "genres":[
                "Sci-Fi",
                "Drama",
                "Adventure",
                "Mystery",
                "Thriller",
                "Science Fiction",
            ],
            "imdb_id":"tt2935510",
            "imdb_rating":"6",
            "language": [
                "English",
                "Norsk",
            ],
            "popularity":"501.294",
            "rated":"PG-13",
            "release_date":"2019-09-17",
            "runtime":123,
            "stars": [
                "Brad Pitt",
                "Tommy Lee Jones",
                "Ruth Negga",
                "John Ortiz",
                "Liv Tyler",
                "Donald Sutherland",
                "Greg Bryk",
                "Loren Dean",
                "Kimberly Elise",
                "John Finn",
                "LisaGay Hamilton",
                "Donnie Keshawarz",
                "Bobby Nish",
                "Sean Blakemore",
                "Freda Foh Shen",
                "Kayla Adams",
                "Ravi Kapoor",
                "Elisa Perry",
                "Daniel Sauli",
                "Kimmy Shields",
                "Kunal Dudheker",
                "Alyson Reed",
                "Sasha Compère",
                "Justin Dray",
                "Alexandria Rousset",
                "Natasha Lyonne",
                "Zoro Saro Manuel Daghlian",
                "Jacob Sandler",
                "Elizabeth Willaman",
                "Jamie Kennedy",
                "Anne McDaniels",
                "Halszka Kuza",
                "Ran Wei",
                "Nicholas Walker",
                "Vivian Fleming-Alvarez",
                "Sheila M. Lockhart",
                "Jen Morillo",
                "Stephanie Kerbis",
                "Matthew Jones",
                "Bayardo De Murguia",
                "Amanda Tudesco",
                "Kento Matsunami",
                "Mallory Low",
                "Luis Richard Gomez",
                "Alex Luna",
                "Danny Hamouie",
                "Valeri Ross",
                "Eliza Gerontakis",
                "Afsheen Olyaie",
                "Bayani Ison",
                "Lisa Shows",
                "Terence Rivera",
                "Adinett Nsabimana",
                "Melvin Payne Jr.",
                "Jean-Pierre Mouzon",
                "Lawrence Dex",
                "Eloy Perez",
                "Lorell Bird Dorfman",
                "Eleanor Goodall",
                "James Dunn",
                "Georgia James Gray",
                "Rodney Damon Collins",
                "Mark Casimir Dyniewicz Jr.",
                "Brynn Route",
            ],
            "status":"OK",
            "status_message":"Query was successful",
            "title":"Ad Astra",
            "vote_count":"3038",
            "year":"2019",
            "youtube_trailer_key":"ykC_wu6ffOU"
        };

        return tempData;
    }

    getMovieImagesById = async (id: string): Promise<IGetMovieImagesById> => {
        const tempData = {
            "IMDB": "tt1375666",
            "fanart": "http://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
            "poster": "http://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            "status": "OK",
            "status_message": "Query was successful",
            "title": "Inception"
        }

        return tempData;
    }

}

export default new MovieAccess();