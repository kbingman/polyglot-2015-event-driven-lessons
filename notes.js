it('should transfer a payload', function() {
    $(document).trigger('testEvent', { isfun: true });

    expect(spy.args[0][1]).to.deep.equal({ isfun: true });
});
