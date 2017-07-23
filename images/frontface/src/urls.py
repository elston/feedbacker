# -*- coding: utf-8 -*-
import views
from router import router

urls = {
    (r'^$', views.index),
    (r'^methods$', router.methods),
    (r'^api$', router.api),
    (r'^stat$', views.stat),
    (r'^stat/region/(?P<region_id>\d+)$', views.stat_region),    
}

# .
def init(app):
    # ..
    if getattr(app, 'urls', None):
        return;
    # ..
    setattr(app, 'urls', urls)