$.ns('Cls.FeedbackForm');
Cls.FeedbackForm = $.inherit(Cls.Form, {
    // ...
    region_field:null,    
    // ...
    close:function(e){
        var me = this;
        if ((e)&&(e.data)){
            me = e.data;
        };
        // ..
        me.region_field.hideMenu();
        me.city_field.hideMenu();        
        // ..
        Cls.FeedbackForm.superclass.close.call(this, e);
    },

    reset:function () {
        Cls.FeedbackForm.superclass.reset.call(this);
        // ..
        this.region_field.field_id.removeAttr('value');
        this.city_field.field_id.removeAttr('value');        
    },

})