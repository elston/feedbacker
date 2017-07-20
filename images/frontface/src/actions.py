# -*- coding: utf-8 -*-
from rpc import errors

# Feedback
class FeedbackActions(object):
    # ..
    def create(self, data, app):

        raise errors.FormError(
            data={
                'phone':u'Номер телефона должен быть в формате «(код города) номер»'
            }
        )        
        # ..
        return {
            'message':'Feedback created successfully',
            'record':{},
        }