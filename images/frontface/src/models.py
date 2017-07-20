# -*- coding: utf-8 -*-
import os
import sqlite3
from db import models, fields

class Region(models.Model):
    # ..
    id = fields.Integer()
    name = fields.String(length=255)


class Sity(models.Model):
    # ..
    id = fields.Integer()
    name = fields.String(length=255)
    region_id = fields.Integer()

class Feedback(models.Model):
    # ..
    id = fields.Integer()
    firstname = fields.String(length=30)
    lastname = fields.String(length=30)
    midname = fields.String(length=30)
    sity_id = fields.Integer()
    phone = fields.String(length=30)
    email = fields.String(length=255)
    comment = fields.Text()


def executescript(dbpool, fname):
    # ..
    with open(fname, 'r') as query_file:
        query = query_file.read()
    # ..
    dbpool.executescript(query)
    dbpool.commit()    

def init(app):
    # ..
    if getattr(app, 'dbpool', None):
        return;
    # ..
    pathdb = app.config.DATABASE
    # ..
    is_new = True
    if os.path.isfile(pathdb):
        is_new = False
    # ...
    dbpool = sqlite3.connect(pathdb)
    setattr(app, 'dbpool', dbpool)
    # ..
    if not is_new:
        return 
    # ..
    executescript(dbpool,'models.sql')
    executescript(dbpool,'models_init.sql')
