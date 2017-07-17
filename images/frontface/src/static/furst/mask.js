$.ns('Cls.Mask');
Cls.Mask = $.inherit($.util.Observable, {
    mask_id:null,
    mask_el:null,    
    // ...
    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.mask_el      = $("#"+this.mask_id);
        // ..
        Cls.Mask.superclass.constructor.call(this, config);
        // ..
    },

    mask:function () {
        // ..
        this.mask_el.css('display','block');
    },

    unmask:function (argument) {
        // ...
        this.mask_el.css('display','none');        
    },
});    