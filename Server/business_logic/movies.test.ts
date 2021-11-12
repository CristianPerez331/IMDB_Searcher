import { emptyGetMoviesByTitleResponse, getMoviesByTitleResponse, getMovieDetailsByIdResponse, getMovieImagesByIdResponse } from '../mock_data/mockMovies';

describe('Movies Business Logic Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating getMovieDataByTitle Checks For Null Title', async () => {
        const mockReq = {params: {}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('Movie Title Cannot Be Empty.');
    });

    it('Validating getMovieDataByTitle Checks For Empty Title', async () => {
        const mockReq = {params: { movieTitle: ''}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('Movie Title Cannot Be Empty.');
    });

    it('Validating getMovieDataByTitle Calls Data Access Layer Functions', async () => {
        const mockReq = {params: { movieTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieAccess =  require('../data_access/movies');
        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue({movie_results: []}) }));

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(MovieAccess.getMoviesByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Can Handle No Results Returned', async () => {
        const mockReq = {params: { movieTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieAccess =  require('../data_access/movies');
        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue(emptyGetMoviesByTitleResponse) }));

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(MovieAccess.getMoviesByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Returns Movies', async () => {
        const mockReq = {params: { movieTitle: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue(getMoviesByTitleResponse) }));

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataByTitle(mockReq as any, mockRes as any);
        
        expect((mockRes.send.mock.calls[0][0] as any[]).some(x => x.imdb_id === 'tt1974203')).toBeTruthy();
        expect(mockRes.send.mock.calls[0][0]).toHaveLength(1);
    });

    it('Validating getMovieDataById Checks For Null Title', async () => {
        const mockReq = {params: {}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('IMDB Id Cannot Be Empty.');
    });

    it('Validating getMovieDataById Checks For Empty Title', async () => {
        const mockReq = {params: { id: ''}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('IMDB Id Cannot Be Empty.');
    });

    it('Validating getMovieDataById Calls Data Access Layer Functions', async () => {
        const mockReq = {params: { id: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieAccess =  require('../data_access/movies');
        jest.mock('../data_access/movies', () => ({ 
            getMovieDetailsById: jest.fn().mockReturnValue({}),
            getMovieImagesById: jest.fn().mockReturnValue({}) 
        }));

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataById(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith({});
        expect(MovieAccess.getMovieDetailsById).toHaveBeenCalledTimes(1);
        expect(MovieAccess.getMovieImagesById).toHaveBeenCalledTimes(1);
    });
    
    it('Validating Returns Movies Data', async () => {
        const mockReq = {params: { id: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        jest.mock('../data_access/movies', () => ({ 
            getMovieDetailsById: jest.fn().mockReturnValue(getMovieDetailsByIdResponse),
            getMovieImagesById: jest.fn().mockReturnValue(getMovieImagesByIdResponse) 
        }));

        const MovieLogic = require('./movies').default;
        await MovieLogic.getMovieDataById(mockReq as any, mockRes as any);
        
        expect((mockRes.send.mock.calls[0][0]).title).toEqual('Inception');
        expect((mockRes.send.mock.calls[0][0]).year).toEqual('2019');
        expect((mockRes.send.mock.calls[0][0]).poster).toEqual('http://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg');
    });

});