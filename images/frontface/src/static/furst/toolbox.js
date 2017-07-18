$.ns('Cls.Toolbox');
Cls.Toolbox = $.inherit($.util.Observable, {
    // ..
    toolbox_id:'',
    form:null,
    list:null,
    // ...
    btn_create_id:'create-btn',
    btn_remove_id:'remove-btn',    
    // ..
    btnCreate:null,
    btnRemove:null,    
    // ..
    constructor : function(config){
        // ...
        $.extend(this, config);
        // ...
        this.btnCreate = $("#"+this.toolbox_id+"__"+this.btn_create_id);
        this.btnRemove = $("#"+this.toolbox_id+"__"+this.btn_remove_id);

        // ..
        Cls.Toolbox.superclass.constructor.call(this, config);
        // ..
        this.btnCreate.on('click',this,this.create);            
        this.btnRemove.on('click',this,this.remove);                    
    },

    create:function (e) {
        // ...
        var me = e.data;
        // ...
        e.preventDefault();
        me.form.open();
    },

    remove:function (e) {
        var me  = e.data;
        if (me.list){
            var currentrecord = me.list.getCurrentRecord();
            if (currentrecord){
                console.log(currentrecord.attr('data-id'));
            };
        }else{
            App.Alerts.show('No records','danger');
        };
    },

});