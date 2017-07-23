$.ns('Cls.Grid');
Cls.Grid = $.inherit($.util.Observable, {
    // ..
    elem_id:'',
    elem:null,
    action_read:$.noop,
    action_remove:$.noop,    
    // ..
    dataId:'data_id',
    emptyRowId:'empty_row',
    emptyRow: '\
        <tr id="empty_row" class="empty-row"> \
            <td>Записей нет</td> \
        </tr> \
    ',  
    templRow:null,
    currentrecord:null,
    // ..
    constructor : function(config){
        // ...
        $.extend(this, config);
        // ...
        this.elem = $('#'+this.elem_id+'__'+'elem');
        this.body = $('#'+this.elem_id+'__'+'body');
        this.mask = $('#'+this.elem_id+'__'+'mask');
        // ..
        Cls.Grid.superclass.constructor.call(this, config);

        this.onReady();

        // // ..onclick for all record
        // var list = this.list.children();
        // for (var i = 0; i < list.length; i++) {
        //     var item = $(list[i]);
        //     item.on('click',this,this.onRecord);
        // };

        // // ..activate first record
        // if (list.length > 0){
        //     var record = $(list[0]);
        //     this.activateRecord(record);
        // };

    },

    onReady:function(){
        this.mask.css('display','block');
        this.load();
    },

    // ..load
    // ===========================
    queryParam:function() {
        // ..
        return {}
    },

    load:function(){
        data = this.queryParam()
        this.action_read(data, this.loadSuccess, this.loadError, this);
    },

    loadSuccess:function (result, provider) {
        // ..
        var is_soft = true;
        var records = result.records;
        this.mask.css('display','none');
        // ..
        if (!records.length){
            this.body.append(this.emptyRow);
            return;
        };
        // ..
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            // ...
            this.body.append(this.templRow.compile(record, is_soft));
        };
        // 
        var rows = this.body.children();
        for (var i = 0; i < rows.length; i++) {
            var item = $(rows[i]);
            item.on('click',this,this.onRecord);
        };  
     

    },

    loadError:function (result, request) {
        // ..
        var response = request.xhr.responseJSON;
        App.Alerts.show(response.message);
    },    


    // ...
    // =============================
    onRecord:function (e) {
        var me = e.data;
        var record = $(e.delegateTarget);
        var currentrecord = me.currentrecord;
        // ...
        if (!record.attr(me.dataId)){
            return;
        };
        if (currentrecord){
            if (record.attr(me.dataId) == currentrecord.attr(me.dataId)){
                return;
            };            
            // ..
            me.deactivateRecord(currentrecord);            
        };
        me.activateRecord(record)
    },

    deactivateRecord:function (record) {
        record.removeClass('info');
        record = null;
    },

    activateRecord:function (record) {
        record.addClass('info');
        this.currentrecord = record;
    },

    getCurrentRecord:function () {
        return this.currentrecord ;
    },

    appendRecord:function (record) {
        // ..
        var is_soft = true;        
        $('#empty_row').remove();
        var item = $(this.templRow.compile(record, is_soft));
        this.body.append(item);
        item.on('click',this,this.onRecord);
        // ..
        var currentrecord = this.currentrecord;
        if (currentrecord){        
            this.deactivateRecord(currentrecord);
        };
        this.activateRecord(item);
    },

    removeRecord:function(){
        // ..
        var currentrecord = this.getCurrentRecord();
        if (!currentrecord){
            App.Alerts.show('Укажите запись которую надо удалить','danger');
        };
        // ..
        var record_id = currentrecord.attr(this.dataId)
        this.action_remove(record_id, this.removeSuccess, this.removeError, this)
    },

    removeSuccess:function (result, provider) {
        // ...
        App.Alerts.show(result.message,'success');
        this.getCurrentRecord().remove();
    },

    removeError:function (result, request) {
        // ..
        var xhr = request.xhr;
        var response = xhr.responseJSON
        App.Alerts.show(response.message);
    }, 

});