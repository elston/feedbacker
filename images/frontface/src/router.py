# -*- coding: utf-8 -*-

from rpc import RpcRouter

# ...
router = RpcRouter()

# Feedback
from actions import FeedbackActions
router.actions['FeedbackActions'] = FeedbackActions()