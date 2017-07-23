$.ns('Cls.FeedbackGrid');
Cls.FeedbackGrid = $.inherit(Cls.Grid, {
    // ...
    templRow: new Cls.Template(' \
        <tr data_id = "{{feedback_id}}"> \
            \
            <td class="col-md-1"> \
                {{feedback_id}} \
            </td> \
            \
            <td class="col-md-3"> \
                <p><b>{{feedback_lastname}}</b></p> \
                <p>{{feedback_firstname}} {{feedback_midname}} </p> \
                <i>{{region_name}}, {{city_name}}</i>\
            </td> \
            \
            <td class="col-md-2">\
                {{feedback_phone}}\
            </td> \
            \
            <td class="col-md-2">\
                {{feedback_email}}\
            </td> \
            \
            <td class="col-md-4">\
                {{feedback_comment}}\
            </td> \
        </tr> \
    '),
})