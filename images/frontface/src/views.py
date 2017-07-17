# -*- coding: utf-8 -*-

def index(app, environ, start_response):
    # ...
    return app.render('index.html',start_response=start_response)