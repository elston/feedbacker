# -*- coding: utf-8 -*-

# Feedback
class FeedbackActions(object):
    # ...
    def create(self, data):
        # ..
        return {
            'success':True,
            'message':'Feedback created successfully',
            'record':{},
        }