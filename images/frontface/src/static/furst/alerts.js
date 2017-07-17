$.ns('Cls.Alerts');
Cls.Alerts = $.inherit($.util.Observable, {
    // ..
    ell:null,
    wrp_el:null,
    class:'alert',
    wrp_id:'message-wrapper',
    templ:new Cls.Template('\
        <div class="alert alert-{{type}} alert-message" role="alert"> \
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
                <i class="fa fa-times"></i> \
            </button> \
            {{message}} \
        </div> \
    '),
    // ..
    constructor : function(config){
        // ...
        this.ell = $("."+this.class);
        this.wrp_el = $("#"+this.wrp_id);
        // ..
        $.extend(this, config);
        Cls.Alerts.superclass.constructor.call(this, config);
        // ..
        if (this.ell){    
            var alerts = this.ell;
            setTimeout(function() {
                alerts.hide('slow');
            }, 5000);
        };          
    },


    show:function (msg,type) {
        if (!type){
            type = 'danger';
        };
        // ...
        var html = this.templ.compile({
            'type':type,
            'message':msg,
        });
        // ..
        this.wrp_el.append(html);
        setTimeout(function() {
            html.hide('slow',function() {
                html.remove();
            });
        }, 5000);        
    },


});





$(function($){

    // ..
    $.ns('App.Alerts');
    App.Alerts = new Cls.Alerts();    

});
