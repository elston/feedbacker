# -*- coding: utf-8 -*-
import json
import utils
import errors
import codes

class RpcRouterJSONEncoder(json.JSONEncoder):
    """
    JSON Encoder for RpcRouter
    """
    def _encode_action(self, obj):
        output = []
        for method in dir(obj):
            if not method.startswith('_'):
                data = dict(name=method)
                output.append(data) 
        return output        

    # ..
    def default(self, obj):
        # ..
        if isinstance(obj, RpcRouter):
            output = {
                'url': obj.url,
                'actions': {},
                'enableBuffer': obj.enable_buffer,
                'maxRetries': obj.max_retries
            }
            # ...
            for name, action in obj.actions.items():
                output['actions'][name] = self._encode_action(action)
            return output
        # ...
        return super(RpcRouterJSONEncoder, self).default(obj)


class RpcRouter(object):
    """
    Router for jQuery.Rpc calls.
    """    
    def __init__(self, url='/api', actions={}, enable_buffer=100, max_retries=1):
        # ..
        self.url = url
        self.actions = actions
        self.enable_buffer = enable_buffer
        self.max_retries = max_retries

    def response(self, content, start_response, status=None):
        if not status:
            status = codes.OK
        start_response('{} {}'.format(*status), 
            [('Content-Type', 'text/javascript')])
        return [content]          

    def methods(self, app, environ, resp):
        # ..
        obj = json.dumps(self, cls=RpcRouterJSONEncoder)
        content = 'jQuery.Rpc.addProvider(%s)'%(obj)
        return self.response(content, resp)

    def api(self, app, environ, resp):
        # ..
        body= ''
        try:
            length= int(environ.get('CONTENT_LENGTH', '0'))
        except ValueError:
            length = 0
        # ...
        if length != 0:
            body = environ['wsgi.input'].read(length)
        # ...
        request = json.loads(utils.uri_to_iri(body))
        # ..
        try:
            output = self.call(request, app)
            status = codes.OK
        except Exception as e:
            if isinstance(e,errors.JSONRPCError):
                output = e.dumps()
            else:
                output  = errors.OtherError(e).dumps()
            # ..
            status = output['status']
        # ...
        content = {
            'tid': request['tid'],
            'action': request['action'],            
            'method': request['method'],            
        }
        # ..
        content.update(output)
        content = json.dumps(content)
        # ..
        return self.response(content, resp, status)

    def call(self, request, app):
        # ...
        content = {
            'type': 'rpc',
            'success':True,
        }
        # ..
        action = request.get('action',None)
        action = self.actions.get(action, None)
        if not action:
            raise errors.OtherError(
                'Not find action'
            )
        # ..
        method = request.get('method',None)
        method = getattr(action, method, None)
        if not method:
            raise errors.OtherError(
                'Not find method'
            )
        # ..
        content['result'] = method(request['data'], app)
        return content
