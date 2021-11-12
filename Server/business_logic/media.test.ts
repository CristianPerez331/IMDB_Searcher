import { emptyGetMoviesByTitleResponse, getMoviesByTitleResponse } from '../mock_data/mockMovies';
import { emptyGetTVShowsByTitleResponse, getTVShowsByTitleResponse } from '../mock_data/mockTVShows';

describe('Media Business Logic Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating Media Business Logic Checks For Null Title', async () => {
        const mockReq = {params: {}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MediaLogic = require('./media').default;
        await MediaLogic.getMediaDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('Movie/TV Show Title Cannot Be Empty.');
    });

    it('Validating Media Business Logic Checks For Empty Title', async () => {
        const mockReq = {params: { title: ''}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MediaLogic = require('./media').default;
        await MediaLogic.getMediaDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.send).toBeCalledWith('Movie/TV Show Title Cannot Be Empty.');
    });

    it('Validating Media Business Logic Calls Data Access Layer Functions', async () => {
        const mockReq = {params: { title: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieAccess =  require('../data_access/movies');
        const TVShowAccess = require('../data_access/tvshows');
        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue({movie_results: []}) }));
        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue({tv_results: []}) }));

        const MediaLogic = require('./media').default;
        await MediaLogic.getMediaDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(MovieAccess.getMoviesByTitle).toHaveBeenCalledTimes(1);
        expect(TVShowAccess.getTVShowsByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Can Handle No Results Returned', async () => {
        const mockReq = {params: { title: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        const MovieAccess =  require('../data_access/movies');
        const TVShowAccess = require('../data_access/tvshows');
        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue(emptyGetMoviesByTitleResponse) }));
        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue(emptyGetTVShowsByTitleResponse) }));

        const MediaLogic = require('./media').default;
        await MediaLogic.getMediaDataByTitle(mockReq as any, mockRes as any);
        
        expect(mockRes.send).toBeCalledWith([]);
        expect(MovieAccess.getMoviesByTitle).toHaveBeenCalledTimes(1);
        expect(TVShowAccess.getTVShowsByTitle).toHaveBeenCalledTimes(1);
    });

    it('Validating Combines Both Movies and TVShows', async () => {
        const mockReq = {params: { title: 'Something'}};
        const mockRes = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        jest.mock('../data_access/movies', () => ({ getMoviesByTitle: jest.fn().mockReturnValue(getMoviesByTitleResponse) }));
        jest.mock('../data_access/tvshows', () => ({ getTVShowsByTitle: jest.fn().mockReturnValue(getTVShowsByTitleResponse) }));

        const MediaLogic = require('./media').default;
        await MediaLogic.getMediaDataByTitle(mockReq as any, mockRes as any);
        
        expect((mockRes.send.mock.calls[0][0] as any[]).some(x => x.imdb_id === 'tt1974203')).toBeTruthy();
        expect((mockRes.send.mock.calls[0][0] as any[]).some(x => x.imdb_id === 'tt2741602')).toBeTruthy();
        expect(mockRes.send.mock.calls[0][0]).toHaveLength(9);
    });

});