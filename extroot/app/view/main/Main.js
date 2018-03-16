Ext.define('app.view.main.Main',{
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    cls: 'sencha-dash-viewport',
    itemId:'mainView',

    controller: 'main',
    viewModel: 'main',

    layout:{
        type:'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 60,
            itemId: 'headerBar',
            style: 'background:#32404E',
            //32404e DEB887
            items: [
                {
                    //Logo
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    // style: 'background:#3c8dbc',
                    html: '<div class="main-logo"><img src="../../../resources/images/company-logo.png">Wesure</div>',
                    width: 220
                },
                {
                    //切换NavigationSize
                    margin: '0 0 0 6',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },

                '->',

                {
                    iconCls:'x-fa fa-search',
                    ui: 'header',
                    href: '#searchresults',
                    hrefTarget: '_self',
                    tooltip: 'See latest search'
                },
                {
                    iconCls:'x-fa fa-envelope',
                    ui: 'header',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    iconCls:'x-fa fa-question',
                    ui: 'header',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Help / FAQ\'s'
                },
                {
                    iconCls:'x-fa fa-th-large',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    text: 'Goff Smith',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: 'resources/images/user-profile/2.png'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 220,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});