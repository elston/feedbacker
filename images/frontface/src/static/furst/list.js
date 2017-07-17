$.ns('Cls.List');
Cls.List = $.inherit($.util.Observable, {
    // ..
    list_id:'',
    list:null,
    currentrecord:null,
    
    // ..
    constructor : function(config){
        // ...
        $.extend(this, config);
        // ...
        this.list = $('#' + this.list_id);
        // ..
        Cls.List.superclass.constructor.call(this, config);
        // ..
        var list = this.list.children();
        for (var i = 0; i < list.length; i++) {
            var item = $(list[i]);
            item.on('click',this,this.onRecord);            
        };
        // ..
        if (list.length > 0){
            var record = $(list[0]);
            this.activateRecord(record);
        };

    },

    onRecord:function (e) {
        var me = e.data;
        var record = $(e.delegateTarget);
        var currentrecord = me.currentrecord;
        // ...
        if (currentrecord){
            if (record.attr('data-id') == currentrecord.attr('data-id')){
                return;
            };            
            // ..
            me.deactivateRecord(currentrecord);            
        };
        me.activateRecord(record)
    },

    deactivateRecord:function (record) {
        record.removeClass('active');
        record = null;
    },

    activateRecord:function (record) {
        record.addClass('active');
        this.currentrecord = record;
    },

    getCurrentRecord:function () {
        return this.currentrecord ;
    },

});