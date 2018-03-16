Ext.define('app.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },
    onButtonLogin: function () {
        let form = this.getView();
        let me =this;
        if (form.isValid()) {
            form.submit({
                url: 'login',
                submitEmptyText: false,
                waitTitle: _('Please wait...'),
                waitMsg: _('Being logged in...'),
                success: function (form, action) {
                    Ext.getBody().mask();
                    // if (action.result.errno == 40017) {
                    //     Ext.Msg.alert(_("Notice"), _(action.result.msg), function () {
                    //         window.location = action.result.url;
                    //     });
                    // } else {
                        window.location = action.result.url;
                    // }
                },
                failure: function (form, action) {
                    me.onChangeImageText();
                    if (action.result) {
                        var msg = action.result.msg;
                            // errno = action.result.errno;
                        Ext.toast(_(msg), _('Notice'), 't', 'x-fa x-fa fa-exclamation-circle');
                        // if (errno == 40004) {
                        //     var id = action.result.id;
                        //     var window = new Admin.view.authentication.ResetPassword();
                        //     var userId = window.down("#userId");
                        //     userId.setValue(id);
                        // }
                    } else {
                        Ext.toast(_('sec_Connection failed, please refresh try to login again'), _('Notice'), 't', 'x-fa x-fa fa-exclamation-circle');
                    }
                }
            });
        }
    },

    onLoginButton: function() {
        let me = this;
        let imageTextInput = this.lookupReference('imageTextInput');
        let inputText = imageTextInput.value.toLowerCase();
        console.log(inputText);
        Ext.Ajax.request({
            url: 'login/text',
            method: 'GET',
            success: function (response, opts) {
                let text = response.responseText.toLowerCase();
                if(inputText==text){
                    Ext.toast('验证码正确');
                    // me.redirectTo('dashboard', true);
                    window.location = "ui";
                }else {
                    // Ext.MessageBox.alert('验证码错误');
                    Ext.toast('验证码错误');
                }
            },
            failure: function (response, opts) {
                console.log('response failure with status code ' + response.status);
            }
        });
        // this.redirectTo('dashboard', true);
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onAfterRender: function () {
        let imageTextBox = this.lookupReference('imageTextBox');
        let imageTextInput = this.lookupReference('imageTextInput');

        Ext.Ajax.request({
            url: 'login/img',
            method: 'GET',
            success: function (response, opts) {
                console.log('onChangeImageText');
                imageTextBox.setHtml(response.responseText);
                imageTextBox.focus(false);
                imageTextInput.setValue('');
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onChangeImageText: function () {
        let imageTextBox = this.lookupReference('imageTextBox');
        let imageTextInput = this.lookupReference('imageTextInput');
        Ext.Ajax.request({
            url: 'login/img',
            method: 'GET',
            success: function (response, opts) {
                // console.log('onChangeImageText');
                imageTextBox.setHtml(response.responseText);
                imageTextInput.setValue('');
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
});