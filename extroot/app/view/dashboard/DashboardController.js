Ext.define('app.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],
    sendGet: function () {
        var me = this;

        Ext.Ajax.request({
            url: '/springboot/user/wesure',
            method: 'GET',
            params: {
            },

            success: function (resp, opts) {
                var respText = Ext.util.JSON.decode(resp.responseText);
                var causeid = respText.causeid;
                if (causeid == 14000) {
                    Ext.toast(respText.userList[0].name);

                } else {
                    Ext.toast(respText.cause);
                }
            },
            failure: function (resp, opts) {

            }
        });
    },
    onRefreshToggle: function(tool, e, owner) {
        var store, runner;

        if (tool.toggleValue){
            this.clearChartUpdates();
        } else {
            store = this.getStore('networkData');
            if (store.getCount()) {
                runner = this.chartTaskRunner;
                if (!runner) {
                    this.chartTaskRunner = runner = new Ext.util.TaskRunner();
                }
                runner.start({
                    run : function () {
                        // Move the first record to the end
                        var rec = store.first();
                        store.remove(rec);
                        store.add(rec);
                    },
                    interval : 200
                });
            }
        }

        // change the toggle value
        tool.toggleValue = !tool.toggleValue;
    },

    clearChartUpdates : function() {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner);
    },
    
    destroy: function () {
        this.clearChartUpdates();
        this.callParent();
    },
    
    onHideView: function () {
        this.clearChartUpdates();
    }
});
