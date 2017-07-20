# -*- coding: utf-8 -*-
# ..
import os
import re
import logging
# ...
from wsgiref import simple_server
from string import Template
# ..

class App(object):
    """
    App
    """

    def init_logger(self):
        # ..
        logging.basicConfig(
            format="==> %(asctime)s [%(levelname)s] %(message)s'", 
            level=logging.DEBUG)        
        # ...
        self.logger = logging.getLogger(self.config.NAME)


    def not_found(self, environ, start_response):
        # ..
        start_response('404 NOT FOUND', [('Content-Type', 'text/plain')])
        return ['Not Found']

    def router(self, environ, start_response):
        # ..
        path = environ.get('PATH_INFO', '').lstrip('/')
        # ...
        for regex, callback in self.urls:
            match = re.search(regex, path)
            if match is not None:
                environ['app.url_args'] = match.groups()
                return callback(self, environ, start_response)
        # ...
        return self.not_found(environ, start_response)        

    def run(self, host=None, port=None):
        # ..
        self.logger.info('Server Starts - %s:%s (Press CTRL+C to quit)'%(
            host, port
        ))
        # ...
        httpd = simple_server.make_server(host, port, self.router)
        # ..
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        httpd.server_close()     

        # ..
        self.logger.info('Server Stops - %s:%s '%(host, port))        


    def render(self, name, context={}, start_response=None):
        # ...
        template_file = os.path.join(
            self.config.TEMPLATES_DIR, name
        )
        # ..
        with open(template_file, 'r') as html_file:
            tmpl = Template(html_file.read())
        # ...
        start_response('200 OK', [('Content-Type', 'text/html')])        
        # ...
        return [tmpl.substitute(context)]