Ext.define('app.view.charts.Bar', {
    extend: 'app.view.charts.ChartBase',
    xtype: 'chartsbarpanel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.PanZoom',
        'app.view.charts.ChartsModel',
        'Ext.chart.series.Bar'
    ],

    title: 'Bar Chart',
    iconCls: 'x-fa fa-bar-chart',

    items: [{
        xtype: 'cartesian',
        colors: [
            '#6aa5db'
        ],
        // bind: '{barData}',
        store: {
            "data" :[
                {
                    "xvalue": 2004,
                    "yvalue": 239
                },
                {
                    "xvalue": 2005,
                    "yvalue": 402
                },
                {
                    "xvalue": 2006,
                    "yvalue": 706
                },
                {
                    "xvalue": 2007,
                    "yvalue": 432
                },
                {
                    "xvalue": 2008,
                    "yvalue": 200
                },
                {
                    "xvalue": 2009,
                    "yvalue": 763
                },
                {
                    "xvalue": 2010,
                    "yvalue": 550
                },
                {
                    "xvalue": 2011,
                    "yvalue": 630
                },
                {
                    "xvalue": 2012,
                    "yvalue": 278
                },
                {
                    "xvalue": 2013,
                    "yvalue": 312
                },
                {
                    "xvalue": 2014,
                    "yvalue": 600
                },
                {
                    "xvalue": 2015,
                    "yvalue": 283
                }
            ]
        },
        axes: [{
            type: 'category',
            fields: [
                'xvalue'
            ],
            hidden: true,
            position: 'bottom'
        },{
            type: 'numeric',
            fields: [
                'yvalue'
            ],
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },
            hidden: true,
            position: 'left'
        }],
        series: [{
            type: 'bar',
            xField: 'xvalue',
            yField: [
                'yvalue'
            ]
        }],
        platformConfig: {
            phone: {
                // On a phone the whole view becomes a vertical strip of charts,
                // which makes it impossible to scroll the view if touch action
                // started on a chart. So we use a custom touchAction config.
                touchAction: {
                    panX: true,
                    panY: true
                }
            },
            '!phone': {
                interactions: {
                    type: 'panzoom',
                    zoomOnPanGesture: true
                }
            }
        }
    }]
});
