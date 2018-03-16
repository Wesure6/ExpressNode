Ext.define('app.view.widgets.PlotWidgets', {
    extend: 'Ext.panel.Panel',
    xtype: 'widgets',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],

    layout: 'fit',
    width: 650,
    controller:'plotwidgets',
    tbar: {
        reference: 'toolbar',
        items: [
            '->',
            {
                text: 'Next function',
                handler: 'onRefresh'
            },
            {
                text: 'Preview',
                handler: 'onPreview'
            },
            {
                text: 'Reset pan/zoom',
                handler: 'onPanZoomReset'
            }
        ]
    },

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        height: 500,
        store: {
            type: 'plot'
        },
        padding: 10,
        insetPadding: 0,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        series: [
            {
                type: 'line',
                xField: 'x',
                yField: 'y1',
                style: {
                    lineWidth: 2,
                    strokeStyle: 'rgb(0, 119, 204)'
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['y1'],
                titleMargin: 20,
                title: {
                    text: 'f(x)',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                minimum: -4,
                maximum: 4,
                minorTickSteps: 3,
                style: {
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                floating: {
                    value: 0,
                    alongAxis: 1
                },
                grid: true
            },
            {
                type: 'numeric',
                position: 'bottom',
                fields: ['x'],
                titleMargin: 6,
                minorTickSteps: 3,
                style: {
                    minorTickSize: 4,
                    majorTickSize: 7
                },
                title: {
                    text: 'x',
                    fillStyle: 'rgb(255, 0, 136)'
                },
                floating: {
                    value: 0,
                    alongAxis: 0
                },
                grid: true
            }
        ]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }
});