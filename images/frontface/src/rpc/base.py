# -*- coding: utf-8 -*-
import json


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

    def response(self, obj, start_response):
        start_response('200 OK', [('Content-Type', 'text/javascript')])
        return [obj]          

    def methods(self, app, environ, resp):
        # ..
        obj = json.dumps(self, cls=RpcRouterJSONEncoder)
        return self.response('jQuery.Rpc.addProvider(%s)' % obj, resp)

    def api(self, app, environ, resp):
        # ..
        obj = json.dumps({})
        return self.response(obj, resp)

