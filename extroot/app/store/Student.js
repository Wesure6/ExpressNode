Ext.define('app.store.Student', {
    extend: 'Ext.data.Store',

    alias: 'store.student',

    fields: [
        'name','email', 'phone', 'sex', 'age','id'
    ],

    data: { items: [
            { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111", sex:"男", age:"21",id:"2018031301"},
            { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222", sex:"女", age:"23",id:"2018031302"},
            { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333", sex:"女", age:"20",id:"2018031303"},
            { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444", sex:"男", age:"26",id:"2018031304"}
        ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
