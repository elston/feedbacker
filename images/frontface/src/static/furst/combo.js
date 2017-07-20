$.ns('Cls.Combo');
Cls.Combo = $.inherit($.util.Observable, {
    combo_id:null,    

    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.combo_el       = $("#"+this.combo_id);
        this.combo_field    = $('#'+this.combo_id+'__'+'field');
        this.combo_menu      = $('#'+this.combo_id+'__'+'menu');
        this.combo_botton   = $('#'+this.combo_id+'__'+'botton');
        // ..
        Cls.Combo.superclass.constructor.call(this, config);
        // ..
        this.combo_botton            
            .on('click',this, this.dropdown);
    },    

    dropdown: function (){
        // ..
        this.combo_menu.css('display','block');
    },


});