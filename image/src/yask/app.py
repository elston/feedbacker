# -*- coding: utf-8 -*-
# ..
import time
# ..
from .protocol import WSGIServer

class App(object):
    """
    App
    """
    def __init__(self):
        # ..
        self.server = None

    # ..
    def index(environ, start_response):
        """This function will be mounted on "/" and display a link
        to the hello world page."""
        start_response('200 OK', [('Content-Type', 'text/html')])
        return ['''
            Hello World Application
            This is the Hello World application:
            `continue <hello/>`_
        ''']  

    def run(self, host=None, port=None):
        # ..
        if self.server:
            return
        # ..
        print '===> ', time.asctime(), " Server Starts - %s:%s" % (host, port)

        self.server = WSGIServer((host, port), self.index)
        self.server.serve_forever()