Ext.define('app.view.charts.Charts', {
    extend: 'Ext.container.Container',
    xtype: 'charts',

    requires: [
        'app.view.charts.Area',
        'app.view.charts.Bar',
        'app.view.charts.ChartsModel',
        'app.view.charts.Gauge',
        'app.view.charts.Pie3D',
        'app.view.charts.Polar',
        'app.view.charts.Stacked',
        'Ext.ux.layout.ResponsiveColumn'
    ],

    viewModel: 'charts',
    layout: 'responsivecolumn',

    defaults: {
        defaults: {
            animation : !Ext.isIE9m && Ext.os.is.Desktop
        }
    },

    items: [
        // {
        //     xtype: 'chartsareapanel',
        //     userCls: 'big-50 small-100'
        // },
        // {
        //     xtype: 'chartspie3dpanel',
        //     userCls: 'big-50 small-100'
        // },
        // {
        //     xtype: 'chartspolarpanel',
        //     userCls: 'big-50 small-100'
        // },
        // {
        //     xtype: 'chartsstackedpanel',
        //     userCls: 'big-50 small-100'
        // },
        {
            xtype: 'chartsbarpanel',
            userCls: 'big-50 small-100'     //or use  responsiveCls
            //responsiveCls responsivecolumn needed!!!
            // 50% width when viewport is big enough,
            // 100% when viewport is small
        },
        {
            xtype: 'chartsgaugepanel',
            userCls: 'big-50 small-100'
        }
    ]
});
