Ext.define('app.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

    requires : [
        'Ext.layout.container.HBox'
    ],

    scrollable: 'y',

    layout: {
        type: 'hbox',
        align: 'stretchmax',

        // Tell the layout to animate the x/width of the child items.
        animate: true,
        //the child panels to animate to their proper size and position after a collapse/expand event.
        animatePolicy: {
            x: true,
            width: true
        }
    },

    beforeLayout : function() {

        var me = this,
            height = Ext.Element.getViewportHeight() - 60,  // offset by topmost toolbar height
            //通过 itemId 获取控件
            navTree = me.getComponent('navigationTreeList');

        me.minHeight = height;

        navTree.setStyle({
            'min-height': height + 'px'
        });

        me.callParent(arguments);
    }
});
