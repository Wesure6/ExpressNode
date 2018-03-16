Ext.define('app.view.charts.Gauge', {
    extend: 'app.view.charts.ChartBase',
    xtype: 'chartsgaugepanel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Gauge',
        'app.view.charts.ChartsModel'
    ],

    title: 'Gauge Chart',
    iconCls: 'x-fa fa-wifi',

    items: [{
        xtype: 'polar',
        colors: [
            '#6aa5db',
            '#aed581'
        ],
        store: {
            data: [
                {
                    position: 40
                }
            ],

            fields: [
                {
                    name: 'position'
                }
            ],
        },

        series: [{
            type: 'gauge',
            angleField: 'position',
            needleLength: 100
        }],
        // series: [{
        //     type: 'gauge',
        //     minimum: 100,
        //     maximum: 800,
        //     value: 400,
        //     donut: 30,
        //     colors: ["#115fa6", "lightgrey"]
        // }],
        platformConfig: {
            phone: {
                // On a phone the whole view becomes a vertical strip of charts,
                // which makes it impossible to scroll the view if touch action
                // started on a chart. So we use a custom touchAction config.
                touchAction: {
                    panX: true,
                    panY: true
                }
            }
        }
    }]

});
