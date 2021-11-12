
describe('Movies Data Access Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating getMoviesByTitle calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const MoviesDataAccess = require('./movies').default;
        await MoviesDataAccess.getMoviesByTitle('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-movies-by-title', title: 'Test'});
    });

    it('Validating getMovieDetailsById calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const MoviesDataAccess = require('./movies').default;
        await MoviesDataAccess.getMovieDetailsById('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-movie-details', imdb: 'Test'});
    });
    
    it('Validating getMovieImagesById calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const MoviesDataAccess = require('./movies').default;
        await MoviesDataAccess.getMovieImagesById('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-movies-images-by-imdb', imdb: 'Test'});
    });

});