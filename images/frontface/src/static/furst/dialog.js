$.ns('Cls.Dialog');
Cls.Dialog = $.inherit($.util.Observable, {
    dialog_id:null,    

    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.dialog_el      = $("#"+this.dialog_id);
        this.shdowing_el    = $("#shdowing");
        this.box_el         = $('#'+this.dialog_id+'__'+'box');
        this.btnClose       = $('#'+this.dialog_id+'__'+'close-btn');        
        // ..
        Cls.Dialog.superclass.constructor.call(this, config);
        // ..
        this.btnClose            
            .on('click',this,this.close);
    },    

    open: function (){
        // ..
        this.shdowing_el.css('display','block');
        this.box_el.css('display','block');
    },

    close: function (e){
        var me = this;                    
        if ((e)&&(e.data)){
            me = e.data;};
        // ...
        me.shdowing_el.css('display','none');
        me.box_el.css('display','none');
        // ...
    },


});