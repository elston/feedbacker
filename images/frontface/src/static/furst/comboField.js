$.ns('Cls.ComboField');
Cls.ComboField = $.inherit($.util.Observable, {
    elem_id:null,    
    action:$.noop,    
    itemMenuInit: '\
        <li data-value=""> \
            &nbsp; \
            <span class="fa fa-spinner fa-spin fa-fw"></span> \
            <span class="loading-label">Loading...</span> \
        </li> \
    ',    
    itemMenu: new Cls.Template('\
        <li data_id="{{id}}" data_name="{{name}}" class="dropdown-menu-item"> \
            &nbsp; \
            {{name}}\
            &nbsp; \
        </li> \
    '),    

    constructor : function(config){
        // ..
        $.extend(this, config);

        // ...
        this.elem     = $("#"+this.elem_id+'__'+'elem');
        this.field    = $('#'+this.elem_id+'__'+'field');
        this.field_id = $('#'+this.elem_id+'__'+'field_id');
        this.menu     = $('#'+this.elem_id+'__'+'menu');
        this.botton   = $('#'+this.elem_id+'__'+'botton');
        // ..
        Cls.ComboField.superclass.constructor.call(this, config);
        // ..
        this.botton.on('click',this, this.showMenu);
    },    

    // ..menu
    // ===========================
    showMenu: function (e){
        // ..
        var me = this;
        if ((e)&&(e.data)){
            me = e.data;
        };        
        // ..
        if (me.isMenuOff()){
            me.menu.find('li').remove();
            me.menu.append(me.itemMenuInit);
            me.menu.removeClass('dropdown-menu-display-none');
            me.load();
        }else{
            me.menu.addClass('dropdown-menu-display-none');
        };
    },

    hideMenu:function(){
        this.menu.find('li').remove();        
        this.menu.addClass('dropdown-menu-display-none');
    },

    isMenuOff:function(){
        // ..
        var result = true;
        var idx = this.menu
            .attr('class')
            .indexOf('dropdown-menu-display-none');
        // ...
        if (idx == -1){
            result = false;
        };
        return result;
    },

    // ..
    onMenuItem:function(e){
        // ..
        var me = e.data;
        var record = $(e.delegateTarget);
        // ..
        me.field_id.val(record.attr('data_id'));
        me.field.val(record.attr('data_name'));
        // ...
        me.hideMenu();        
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
        this.menu.find('li').remove();
        // ..
        var records = result.records;
        for (var i = 0; i < records.length; i++) {
            // ..
            var record = records[i];
            // ..
            this.menu.append(this.itemMenu.compile({
                id:record.id,
                name:record.name,
            }));
        };
        // ..
        var list = this.menu.children();
        for (var i = 0; i < list.length; i++) {
            var item = $(list[i]);
            item.on('click', this, this.onMenuItem);
        }
    },

    loadError:function (result, request) {
        // ..
        var response = request.xhr.responseJSON;
        App.Alerts.show(response.message);
    },    



});