$.ns('Cls.Form');
Cls.Form = $.inherit($.util.Observable, {
    // ...
    form_id:null,
    action:$.noop,
    templErrField: new Cls.Template('\
        <div class="error" style="color: red;">\
            {{error}} \
        </div>\
    '),
    // ..
    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.form_el        = $("#"+this.form_id);
        this.shdowing_el    = $("#shdowing");
        this.box_el         = $('#'+this.form_id+'__box');
        this.btnClose       = $('#'+this.form_id+'__close-btn');

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
        me.removeErrLabel().reset();        
    },

    submit:function (e) {
        var me = e.data;
        var data = me.form_el.serialize();        
        // ..
        me.removeErrLabel();
        me.action(data, me.success, me.error, me);
        return false;
    },

    reset:function () {
        this.form_el[0].reset();
        return this;
    },

    success:function (result,provider) {
        // ...
        App.Alerts.show(result.message,'success');
        this.reset().close();
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
        for (var k in param) {
            this.form_el
                .find('input[name=' + k + ']')
                .before(this.templErrField.compile({
                    error:param[k]
                }));
        }; 
    },  

    removeErrLabel:function (argument) {
        this.form_el
            .find('.error')
            .remove();
        return this;
    },
});

