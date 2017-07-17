$(function($){

    // ..
    $.ns('App.CreateFeedbackForm');
    App.CreateFeedbackForm = new Cls.Form({
        form_id:'create-feedback-form',
        action:FeedbackActions.create,        
    });
   
    // // ..
    // $.ns('App.FeedbackList');
    // App.FeedbackList = new Cls.List({
    //     list_id:'feedback-list',
    // });    

    // // ..
    // $.ns('App.FeedbackListToolbox');
    // App.FeedbackListToolbox = new Cls.Toolbox({
    //     toolbox_id:'feedback-list-toolbox',
    //     form:App.CreateFeedbackForm,
    //     list:App.FeedbackList,
    // });

    // // ....
    // $.ns('App.FeedbackListMask');
    // App.FeedbackListMask = new Cls.Mask({
    //     mask_id:'feedback-list-mask',
    // });    

});
