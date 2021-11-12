
describe('TVShows Data Access Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating getTVShowsByTitle calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const TVShowsDataAccess = require('./tvshows').default;
        await TVShowsDataAccess.getTVShowsByTitle('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-shows-by-title', title: 'Test'});
    });

    it('Validating getTVShowDetailsById calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const TVShowsDataAccess = require('./tvshows').default;
        await TVShowsDataAccess.getTVShowDetailsById('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-show-details', imdb: 'Test'});
    });
    
    it('Validating getTVShowImagesById calls RapidAPI with correct parameters', async () => {
        const RapidAPI =  require('./rapidapi');
        jest.mock('./rapidapi', () => ({ callEndpoint: jest.fn() }));

        const TVShowsDataAccess = require('./tvshows').default;
        await TVShowsDataAccess.getTVShowImagesById('Test');
        
        expect(RapidAPI.callEndpoint).toBeCalledWith({type: 'get-show-images-by-imdb', imdb: 'Test'});
    });

});