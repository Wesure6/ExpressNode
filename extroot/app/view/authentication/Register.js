Ext.define('app.view.authentication.Register',{
    extend: 'Ext.window.Window',
    xtype: 'register',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],

    title: 'User Registration',
});