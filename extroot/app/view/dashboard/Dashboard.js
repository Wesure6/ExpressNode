Ext.define('app.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    cls: 'shadow',

    controller:'dashboard',
    items: [{
        //tab页
        xtype: 'tabpanel',
        layout: 'fit',
        bodyPadding: 10,

        items: [{
            title: _('Tab1'),
            xtype: 'container',
            layout: 'card',
            items: [
                {
                    xtype: 'PagedGrid',
                    // title: 'Tab1',
                    itemId: 'taskGrid',
                    activeId: true,
                    // disableSelection: true,//值为TRUE，表示禁止选择行
                    // frame: true,
                    // reference: 'tab1MessionGridReference',
                    columnLines: true,
                    serverCount: 0,

                    columns: [{
                        text: '学号',
                        dataIndex: 'id',
                        flex: 0.6
                    }, {
                        text: '姓名',
                        dataIndex: 'name',
                        // flex: 1
                    }, {
                        text: '性别',
                        dataIndex: 'sex',
                        // flex: 1
                    }, {
                        text: '年龄',
                        dataIndex: 'age',
                        // flex: 1
                    }, {
                        text: '联系电话',
                        dataIndex: 'phone',
                        flex: 1,
                    }, {
                        text: '邮箱',
                        dataIndex: 'email',
                        flex: 1
                    }],
                    selType: 'checkboxmodel',
                    pagingbarDock: 'top',
                    pagingbarDefaultValue: 15,
                    pagingbarConfig: {
                        fields: [{
                            name: 'val',
                            type: 'int'
                        }],
                        data: [{
                            val: 15
                        },
                            {
                                val: 30
                            },
                            {
                                val: 60
                            },
                            {
                                val: 100
                            },
                            {
                                val: 200
                            },
                            {
                                val: 500
                            }
                        ]
                    },
                    store: {
                        type: 'student'
                    }
                }]
        },
        {
            title: _('Tab2'),
            xtype: 'container',
            layout: 'card',
            items: [{
                    xtype: 'PagedGrid',
                    itemId: 'taskGrid',
                    // title: 'Tab21',
                    activeId: true,
                    columnLines: true,
                    serverCount: 0,

                    columns: [{
                        text: '学号',
                        dataIndex: 'id',
                        flex: 0.6
                    }, {
                        text: '姓名',
                        dataIndex: 'name',
                        // flex: 1
                    }, {
                        text: '性别',
                        dataIndex: 'sex',
                        // flex: 1
                    }, {
                        text: '年龄',
                        dataIndex: 'age',
                        // flex: 1
                    }, {
                        text: '联系电话',
                        dataIndex: 'phone',
                        flex: 1,
                    }, {
                        text: '邮箱',
                        dataIndex: 'email',
                        flex: 1
                    }],
                    selType: 'checkboxmodel',
                    pagingbarDock: 'top',
                    pagingbarDefaultValue: 15,
                    pagingbarConfig: {
                        fields: [{
                            name: 'val',
                            type: 'int'
                        }],
                        data: [{
                            val: 15
                        },
                            {
                                val: 30
                            },
                            {
                                val: 60
                            },
                            {
                                val: 100
                            },
                            {
                                val: 200
                            },
                            {
                                val: 500
                            }
                        ]
                    },
                    store: {
                        type: 'student'
                    },
                    // // 每页显示记录数
                    // pageSize: 15,
                    // proxy: {
                    //     type: 'ajax',
                    //     url: '/ccd/configcenter/backup/task/neTaskInfos',
                    //     reader: {
                    //         type: 'json',
                    //         rootProperty: 'BackupTasks',
                    //         totalProperty: 'totalCount'
                    //     },
                    //
                    // },
                    // listeners: {
                    //     selectionchange: 'onGridSelectionChange',
                    // },
                }],
        }]
    }]
});
