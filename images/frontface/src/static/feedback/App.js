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
        action_create:FeedbackActions.create,
        grid_name:'FeedbackGrid',
        // ..
        region_field:App.RegionComboField,
        city_field:App.CityComboField,        
    });
   
    // ..
    $.ns('App.FeedbackGrid');
    App.FeedbackGrid = new Cls.FeedbackGrid({
        elem_id:'feedback-grid',
        action_read:FeedbackActions.read,
        action_remove:FeedbackActions.remove,
    });    

    // ..
    $.ns('App.FeedbackToolbox');
    App.FeedbackToolbox = new Cls.Toolbox({
        elem_id:'feedback-toolbox',
        form_name:'FeedbackForm',
        grid_name:'FeedbackGrid',
    });

 

});
