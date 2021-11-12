
describe('Media Router Tests', function () {
    
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('Validating Media Router Contains Correct Title Search Endpoint', () => {
        const express = require('express');
        const mediaLogic = require('../business_logic/media');
        const mockRouter = { get: jest.fn() };
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);
        jest.mock('../business_logic/media', () => ({ getMediaDataByTitle: () => jest.fn() }));

        require('./media');
        expect(mockRouter.get).toHaveBeenCalledWith('/:title?/search', mediaLogic.getMediaDataByTitle);
    });

});