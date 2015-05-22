import $ from 'jquery';

describe('Basic Event Spying', function() {
    var spy;

    beforeEach(function() {
        spy = sinon.spy();
        $(document).on('testEvent', spy);
    });

    it('should listen for a triggered event', function() {
        $(document).trigger('testEvent');

        expect(spy.called).to.be.true;
    });

    it('should transfer a payload', function() {
        $(document).trigger('testEvent', { isfun: true });

        expect(spy.args[0][1]).to.deep.equal({ isfun: true });
    });

});
