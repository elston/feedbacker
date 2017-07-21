$.ns('Cls.List');
Cls.List = $.inherit($.util.Observable, {
    // ..
    elem_id:'',
    elem:null,
    action:$.noop,    
    // ..
    itemListInit: '\
        <div id="empty-feedback-list" class="empty-list-box"> \
            There are no any records \
        </div> \
    ',  
    itemList: new Cls.Template(' \
        <li class="list-group-item" data_id = "{{feedback_id}}"> \
            <div class="list-group-item-counter"> \
                {{feedback_id}} \
            </div> \
            <div class="list-group-item-wrapper"> \
                    <h4 class="list-group-item-heading"> \
                        {{feedback_firstname}} \
                    </h4> \
                <p class="list-group-item-text"> \
                    {{feedback_lastname}} {{feedback_midname}} \
                </p> \
            </div> \
            <div class="list-group-item-status">\
                {{feedback_phone}}\
            </div> \
        </li> \
    '),
    // ..
    constructor : function(config){
        // ...
        $.extend(this, config);
        // ...
        this.elem = $('#'+this.elem_id+'__'+'elem');
        this.mask = $('#'+this.elem_id+'__'+'mask');        
        // ..
        Cls.List.superclass.constructor.call(this, config);

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
        this.action(data, this.loadSuccess, this.loadError, this);
    },

    loadSuccess:function (result, provider) {
        // ..
        var is_soft = true;
        var records = result.records;
        this.mask.css('display','none');
        // ..
        if (!records.length){
            this.elem.append(this.itemListInit);
            return;
        };
        // ..
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            // ...
            this.elem.append(this.itemList.compile(record, is_soft));
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

    appendRecord:function (record) {
        console.log(record)
    },

});