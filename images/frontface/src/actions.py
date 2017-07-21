# -*- coding: utf-8 -*-
import urlparse 
from rpc import errors, utils
from db import validators


# Feedback
from models import Feedback
class FeedbackActions(object):

    def read(self, data, app):

        query = """
        SELECT 
            Feedback.id as feedback_id,
            Feedback.firstname as feedback_firstname,
            Feedback.lastname as feedback_lastname,
            Feedback.midname as feedback_midname,
            Feedback.phone as feedback_phone,
            Feedback.email as feedback_email,
            Feedback.comment as feedback_comment,
            City.id as city_id,
            City.name as city_name,
            Region.id as region_id,
            Region.name as region_name
        FROM
            Feedback
            JOIN City ON City.id = Feedback.city_id
            JOIN Region ON Region.id = City.region_id
        ORDER BY Feedback.id ASC
        """
        cursor = app.dbpool.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        records = [{
            'feedback_id':          item[0],
            'feedback_firstname':   item[1],
            'feedback_lastname':    item[2],
            'feedback_midname':     item[3],
            'feedback_phone':       item[4],
            'feedback_email':       item[5],
            'feedback_comment':     item[6],
            'city_id':              item[7],
            'city_name':            item[8],
            'region_id':            item[9],
            'region_name':          item[10],
        } for item in records]
        # ..
        return {
            'records':records,
        }     

    # ..
    def create(self, data, app):

        # ..
        error_data = {}
        record = dict(urlparse.parse_qsl(utils.uri_to_iri(data[0])))
        # ..
        phone = record.get('phone', None)
        if phone:
            phone = phone.replace(' ','')
            record['phone'] = phone
            validator = validators.Phone(phone)
            validator.check('phone', error_data)        

        # ..
        email = record.get('email', None)
        if email:
            validator = validators.Email(email)
            validator.check('email', error_data)
        # ..
        if error_data:
            raise errors.FormError(
                data=error_data
            ) 
        # ..
        cursor = app.dbpool.cursor()
        try:
            feedback = Feedback(cursor, **record)
            feedback.create()
            feedback = feedback.as_dict()
        except Exception as e:
            raise e
        app.dbpool.commit()
        # ..
        return {
            'message':'Feedback created successfully',
            'record':feedback,
        }


# Region
from models import Region
class RegionActions(object):
    # ..
    def read(self, data, app):
        # ..
        records = Region().all(app.dbpool)
        # ..
        return {
            'records':records,
        }        


# City
from models import City
class CityActions(object):
    # ..
    def read(self, data, app):
        # ..
        region_id = int(data[0]['region_id'])
        records = City().all(app.dbpool,
            region_id=region_id
        )
        # ..
        return {
            'records':records,
        }          