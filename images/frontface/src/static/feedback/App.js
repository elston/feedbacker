$(function($){

    // ....
    $.ns('App.RegionComboField');
    App.RegionComboField = new Cls.RegionComboField({
        elem_id:'field-region',
        action:RegionActions.read,
        // ..
        city_elem_id:'field-city',
    });

    // ....
    $.ns('App.CityComboField');
    App.CityComboField = new Cls.CityComboField({
        elem_id:'field-city',
        action:CityActions.read,
        // ..
        region_elem_id:'field-region',        
    });    

    // ..
    $.ns('App.FeedbackForm');
    App.FeedbackForm = new Cls.FeedbackForm({
        elem_id:'feedback-form',
        action:FeedbackActions.create,
        list_name:'FeedbackList',
        // ..
        region_field:App.RegionComboField,
    });
   
    // ..
    $.ns('App.FeedbackList');
    App.FeedbackList = new Cls.List({
        elem_id:'feedback-list',
        action:FeedbackActions.read,        
    });    

    // ..
    $.ns('App.FeedbackToolbox');
    App.FeedbackToolbox = new Cls.Toolbox({
        elem_id:'feedback-toolbox',
        form:App.FeedbackForm,
        list:App.FeedbackList,
    });

 

});
