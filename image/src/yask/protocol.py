
from SocketServer import ThreadingMixIn
from BaseHTTPServer import HTTPServer
# ...
from SimpleHTTPServer import SimpleHTTPRequestHandler


class WSGIHandler(SimpleHTTPRequestHandler):
    '''
    Protocol
    '''

    def do_HEAD(self):
        # ..
        import ipdb;ipdb.set_trace()
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

    def do_GET(self):
        # ..
        import ipdb;ipdb.set_trace()
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write("<html><head><title>Title goes here.</title></head>")
        self.wfile.write("<body><p>This is a test.</p>")
        self.wfile.write("<p>You accessed path: %s</p>" % self.path)
        self.wfile.write("</body></html>")


class WSGIServer(ThreadingMixIn, HTTPServer):
    '''
    Factory
    '''

    def __init__(self, server_address, callback):
        import ipdb;ipdb.set_trace()
        HTTPServer.__init__(self, ('localhost',8000), WSGIHandler)
        self.callback = callback
