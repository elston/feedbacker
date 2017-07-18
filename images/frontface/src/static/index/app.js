$(function($){

    // ..
    $.ns('App.FeedbackForm');
    App.FeedbackForm = new Cls.Form({
        form_id:'feedback-form',
        action:FeedbackActions.create,        
    });
   
    // ..
    $.ns('App.FeedbackList');
    App.FeedbackList = new Cls.List({
        list_id:'feedback-list',
    });    

    // ..
    $.ns('App.FeedbackToolbox');
    App.FeedbackToolbox = new Cls.Toolbox({
        toolbox_id:'feedback-toolbox',
        form:App.FeedbackForm,
        list:App.FeedbackList,
    });

    // // ....
    // $.ns('App.FeedbackListMask');
    // App.FeedbackListMask = new Cls.Mask({
    //     mask_id:'feedback-list-mask',
    // });    

});
