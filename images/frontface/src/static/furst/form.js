$.ns('Cls.Form');
Cls.Form = $.inherit($.util.Observable, {
    // ...
    elem_id:null,
    action_create:$.noop,
    templErrField: new Cls.Template('\
        <div class="error" style="color: #a94442;">\
            {{error}} \
        </div>\
    '),
    // ..
    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.form_el        = $("#"+this.elem_id);
        this.shdowing_el    = $("#shdowing");
        this.box_el         = $('#'+this.elem_id+'__'+'box');
        this.btnClose       = $('#'+this.elem_id+'__'+'close-btn');
        // ..
        Cls.Form.superclass.constructor.call(this, config);
        // ..
        this.form_el.on('submit',this,this.submit);
        this.btnClose.on('click',this,this.close);
    },
    
    open: function (){
        // ..
        this.shdowing_el.css('display','block');
        this.box_el.css('display','block');
    },

    close: function (e){
        var me = this;
        if ((e)&&(e.data)){
            me = e.data;
        };
        // ...
        me.shdowing_el.css('display','none');
        me.box_el.css('display','none');
        // ...
        me.removeErrLabel();
        me.reset();        
    },

    // ..submit
    // ===================
    submit:function (e) {
        // ..
        e.preventDefault();        
        var me = e.data;
        var data = me.form_el.serialize();        
        // ..
        me.removeErrLabel();
        me.action_create(data, me.success, me.error, me);
        return false;
    },

    reset:function () {
        this.form_el[0].reset();
    },

    success:function (result,provider) {
        // ...
        App.Alerts.show(result.message,'success');
        this.appendRecordToList(result.record);
        this.reset();
        this.close();
    },

    error:function (result, request) {
        // ..
        var xhr = request.xhr;
        var response = xhr.responseJSON
        // ...
        App.Alerts.show(response.message);
        if (xhr.status == 400) {        
            this.markErrField(response.data);
        };
    },   

    markErrField:function (param) {
        // ..
        for (var k in param) {
            // ..
            var el = this.form_el.find('input[name=' + k + ']')
            var fgroup = el.parent().parent().parent();
            fgroup.addClass('has-error');
            fgroup.after(this.templErrField.compile({
                error:param[k]
            }));            
        }; 
    },  

    removeErrLabel:function (argument) {
        this.form_el.find('.error').remove();
        this.form_el.find('.has-error').removeClass('has-error');
    },

    appendRecordToList:function(record) {
        // ...
        var grid  = App[this.grid_name];        
        grid.appendRecord(record);
    },
});

