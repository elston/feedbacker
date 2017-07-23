$.ns('Cls.Toolbox');
Cls.Toolbox = $.inherit($.util.Observable, {
    // ..
    elem_id:'',
    form:null,
    grid:null,
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
        this.btnCreate = $("#"+this.elem_id+"__"+this.btn_create_id);
        this.btnRemove = $("#"+this.elem_id+"__"+this.btn_remove_id);
        // ..
        this.form  = App[this.form_name];
        this.grid  = App[this.grid_name];        
        // ..
        Cls.Toolbox.superclass.constructor.call(this, config);
        // ..
        this.btnCreate.on('click',this,this.create);            
        this.btnRemove.on('click',this,this.remove);                    
    },

    create:function (e) {
        // ...
        var me = e.data;
        e.preventDefault();
        me.form.open();
    },

    remove:function (e) {
        // ..
        var me = e.data;
        e.preventDefault();        
        me.grid.removeRecord()
    },

});