# -*- coding: utf-8 -*-

from rpc import RpcRouter

# ...
router = RpcRouter()

# Feedback
from actions import FeedbackActions
router.actions['FeedbackActions'] = FeedbackActions()

# Region
from actions import RegionActions
router.actions['RegionActions'] = RegionActions()


# City
from actions import CityActions
router.actions['CityActions'] = CityActions()