# -*- coding: utf-8 -*-
import sys, traceback, json
import codes as http

class JSONRPCError(Exception):
    """
    JSONRPCError class 
    """

    code = 0
    message = None
    status = None

    def __init__(self, message=None):
        # ...
        if message:
            self.message = message

    def dumps(self):
        # ...basic
        content = {
            'type':'exception',
            'status': self.status,
            'message': unicode(self.message),
        }

        # ..data
        data = getattr(self,'data', None)
        if data:
            content['data'] = data

        # ..status
        status = getattr(self,'status', None)
        if status:
            content['status'] = status

        # ...debug
        content['stack']      = traceback.format_exc()
        content['executable'] = sys.executable


        # ...
        return content


class OtherError(JSONRPCError):
    # ..
    message = 'Error missed by other exceptions'
    status = http.INTERNAL_SERVER_ERROR


class FormError(JSONRPCError):
    # ..
    message = u'Форма с ошибками'
    status = http.BAD_REQUEST
    # ..
    def __init__(self, data=None):
        self.data = data       