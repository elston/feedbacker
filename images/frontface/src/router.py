# -*- coding: utf-8 -*-

from rpc import RpcRouter

# ...
class Router(RpcRouter): pass
router = Router()

# Feedback
from actions import FeedbackActions
router.actions['FeedbackActions'] = FeedbackActions()