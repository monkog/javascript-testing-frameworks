const { DateTimeHelper } = require('../../src/date-time-helper');
require('mocha');
const sinon = require('sinon');
const { assert } = require('./my-assert');

describe('DateTimeHelper', () => {
    it('should be a class', () => {
        assert(typeof DateTimeHelper === 'function');
        assert((/^class/).test( DateTimeHelper.toString()));
    });
    
    it('should handle asynchronous test', (done) => {
        DateTimeHelper.prototype.handler = function () {
            let diff = (Date.now() - this.startTime);
            this.stop();
            assert(true);
            done();
        }

        let uut = new DateTimeHelper();
        uut.start();
    });
    
    it('should use spied setInterval function', () => {
        const t = sinon.spy(global, 'setInterval');
        
        let uut = new DateTimeHelper();
        uut.start();
        assert(t.called);
        uut.stop();
    });
});