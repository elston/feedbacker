// ..
$.ns('Cls.RegionComboField');
Cls.RegionComboField = $.inherit(Cls.ComboField, {
    // ..
    constructor : function(config){
        // ..
        Cls.RegionComboField.superclass.constructor.call(this, config);
        // ..
        this.city_field    = $('#'+this.city_elem_id+'__'+'field');
        this.city_field_id = $('#'+this.city_elem_id+'__'+'field_id');        
    },

    onMenuItem:function(e){
        // ..
        var me = e.data;        
        var city_id = me.city_field_id.val();
        if (city_id){
            me.city_field_id.removeAttr('value');
            me.city_field.val('');            
        };        
        // ..
        Cls.RegionComboField.superclass.onMenuItem.call(this, e);        
    },
});

// ...
$.ns('Cls.CityComboField');
Cls.CityComboField = $.inherit(Cls.ComboField, {
    // ..
    constructor : function(config){
        // ..
        Cls.RegionComboField.superclass.constructor.call(this, config);
        // ..
        this.region_field    = $('#'+this.region_elem_id+'__'+'field');
        this.region_field_id = $('#'+this.region_elem_id+'__'+'field_id');        
    },    
    // ..
    showMenu:function(e){
        // body
        var me = e.data;
        // ..
        var region_id = me.region_field_id.val();
        if (!region_id){
            App.Alerts.show('Сначала нужно выбрать регион!');            
            return;
        };
        // ..
        Cls.CityComboField.superclass.showMenu.call(this, e);        
    },

    queryParam:function() {
        // ..
        var region_id = this.region_field_id.val();        
        return {
            'region_id':region_id,
        }
    },
});