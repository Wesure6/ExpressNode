Ext.define('app.data.Simulated', {
    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    onClassExtended: function (cls, data) {
        var url = data.$className.toLowerCase().replace(/\./g, '/').
                    replace(/^app\/data/, '~api'),
            simlet = {
                type: 'json',
                data: data.data
            },
            registration = {};

        registration[url] = simlet;

        Ext.ux.ajax.SimManager.register(registration);
        console.log('has register data');
    }
},
function () {
    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    });
});
