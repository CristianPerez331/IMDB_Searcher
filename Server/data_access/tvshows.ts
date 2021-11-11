import Axios from 'axios';
import IGetTVShowsByTitle from '../models/tvshows/IGetTVShowsByTitle';
import IGetTVShowDetailsById from '../models/tvshows/IGetTVShowDetailsById';
import IGetTVShowImagesById from '../models/tvshows/IGetTVShowImagesById';

class TVShowAccess {

    getTVShowsByTitle = async (movieTitle: string): Promise<IGetTVShowsByTitle> => {

        const tempData = {
            "tv_results": [
                {
                    "imdb_id":"tt2741602",
                    "release_date":"2013-09-23",
                    "title":"The Blacklist"
                },
                {
                    "imdb_id":"tt5592230",
                    "release_date":"2017-02-23",
                    "title":"The Blacklist: Redemption"
                },{
                    "imdb_id":"tt2741602",
                    "release_date":"2013-09-23",
                    "title":"The Blacklist"
                },
                {
                    "imdb_id":"tt5592230",
                    "release_date":"2017-02-23",
                    "title":"The Blacklist: Redemption"
                },{
                    "imdb_id":"tt2741602",
                    "release_date":"2013-09-23",
                    "title":"The Blacklist"
                },
                {
                    "imdb_id":"tt5592230",
                    "release_date":"2017-02-23",
                    "title":"The Blacklist: Redemption"
                },{
                    "imdb_id":"tt2741602",
                    "release_date":"2013-09-23",
                    "title":"The Blacklist"
                },
                {
                    "imdb_id":"tt5592230",
                    "release_date":"2017-02-23",
                    "title":"The Blacklist: Redemption"
                }
            ],
            "search_results": 11,
            "status": "OK",
            "status_message": "Query was successful",
        };

        if (tempData.status !== "OK") throw new Error("There is an error");
        
        return tempData;
    }

    getTVShowDetailsById = async (id: string): Promise<IGetTVShowDetailsById> => {
        const tempData = {
            "countries":[
            "USA",
            ],
            "creators":[
                "Jon Bokenkamp",
                "Michael W. Watkins",
                "Andrew McCarthy",
                "Bill Roe"
            ],
            "description":"Raymond \"Red\" Reddington, one of the FBI's most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests: bringing down dangerous criminals and terrorists. In the last two decades, he's made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this \"The Blacklist\". Reddington will co-operate, but insists that he will speak only to Elizabeth Keen, a rookie FBI profiler.",
            "genres":[
                "Drama",
                "Crime",
                "Mystery",
                "Action"
            ],
            "imdb_id":"tt2741602",
            "imdb_rating":"7.1",
            "language":[
            "en",
            "English",
            ],
            "networks":[
                "NBC",
            ],
            "popularity":"81.913",
            "production_companies":[
                "Sony Pictures Television"
            ],
            "rated":"TV-14",
            "release_date":"2013-09-23",
            "runtime":43,
            "stars":[
                "James Spader",
                "Megan Boone",
                "Harry Lennix",
                "Diego Klattenhoff",
                "Hisham Tawfiq",
                "Amir Arison",
                "Ryan Eggold",
                "Mozhan Marnò",
                "Parminder Nagra",
                "Susan Blommaert",
                "Baz",
                "Adriane Lenox",
            ],
            "status":"OK",
            "status_message":"Query was successful",
            "title":"The Blacklist",
            "vote_count":"1401",
            "year_started":2013,
            "youtube_trailer_key":"SoT5JImB1H8",
        };

        return tempData;
    }

    getTVShowImagesById = async (id: string): Promise<IGetTVShowImagesById> => {
        const tempData = {
            "IMDB":"tt2741602",
            "fanart":"http://image.tmdb.org/t/p/original/8b4X7cFOagllHuERcefvDpECwDz.jpg",
            "poster":"http://image.tmdb.org/t/p/original/bgbQCW4fE9b6wSOSC6Fb4FfVzsW.jpg",
            "status":"OK",
            "status_message":"Query was successful",
            "title":"The Blacklist",
        }

        return tempData;
    }

}

export default new TVShowAccess();