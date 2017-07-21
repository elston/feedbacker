$.ns('Cls.Template');
Cls.Template = function(html){
    var me = this;
    me.html = html;

};
Cls.Template.prototype = {
    // ...
    compile:function (kwargs, soft) {
        var html = this.html;
        for (i in kwargs){
            var o = kwargs[i];
            var re = new RegExp('(\\{{\\ *'+i+'\\ *\\}})', 'g')
            // ..
            if (!soft){
                if(!re.test(html)){
                    throw('Not completed compile template with field "{{'+i+'}}"');
                };
            };
            html = html.replace(re,o)
        };
        return $(html);
    },    
};