# -*- coding: utf-8 -*-
import errors
import fields

class Model(object):

    def __init__(self, txn=None, *args, **kwargs ):
        # ..
        self._txn = txn
        self._data = kwargs
        # ..

    def _bind(self, record):
        for name, item in self._fields():
            data = record.get(name, None)
            item.set(data)

    def as_dict(self):
        return { name:item.get()
            for name, item in self._fields()         
            if item.get()
        }

    def _fields(self):
        # ..
        return [
            (item, getattr(self, item))
            for item 
            in dir(self) 
            if isinstance(getattr(self, item), fields.Field)
        ]


    def _create_query(self):
        # ..
        fields = [(name, item) 
            for name, item in self._fields() 
            if name != 'id' and name in self._data.keys()]
        # ..
        header = ', '.join([ name for name, item in fields])
        values = ', '.join([ item.to_sql(name) for name, item in fields])
        query = u"INSERT INTO %s (%s) VALUES (%s)"%(
            self.__class__.__name__,
            header,
            values
        )
        # ..
        return query.format(**self._data)


    def create(self):
        # ..
        query = self._create_query()
        self._txn.execute(query)
        # ..
        record = {
            'id': self._txn.lastrowid
        }
        record.update(self._data)
        # ..
        self._bind(record)

    def _sql_where(self, *args, **kwargs):
        # ..
        where = ' and '.join(["{key} = {value}".format(
                key=key, value=getattr(self, key).to_sql(key)
            ) for key, value in  kwargs.items() if value])
        # ..
        if where:
            where = where.format(**kwargs)
        # ...
        if where:
            where = 'WHERE ' + where
        # ..
        return where

    def _get_query(self, *args, **kwargs):
        # ...
        # where = ' and '.join(["{key} = {value}".format(
        #         key=key, value=getattr(self, key).to_sql(key)
        #     ) for key, value in  kwargs.items() if value])
        # # ..
        # if where:
        #     where = where.format(**kwargs)
        # # ...
        # if where:
        #     where = 'WHERE ' + where
        where = self._sql_where(*args, **kwargs)
        # ...
        query = u"SELECT * FROM %s %s;"%(
            self.__class__.__name__,
            where
        )
        # ..
        return query

    def get(self, dbpool, *args, **kwargs):
        # ...
        query = self._get_query(*args, **kwargs)
        records = dbpool.runQuery(query)        
        # ..
        if not len(records) == 1:
            raise errors.DBError(
                'Query to get {model} '
                'return more then one or non records'.format(
                    model = self.__class__.__name__, 
                )
            )        
        # ..
        record = records[0]            
        self._bind(record)   
        # ...
        return self

    def get_or_none(self, dbpool, *args, **kwargs):
        # ...
        query = self._get_query(*args, **kwargs)
        records = dbpool.runQuery(query)
        # ..
        if not len(records) <= 1:
            raise errors.DBError(
                'Query to get {model} '
                'return more then one records'.format(
                    model = self.__class__.__name__, 
                )
            )        
        # ..
        if not records:
            return None
        # ...
        record = records[0]
        self._bind(record)
        # ..
        return self

    def all(self, dbpool, *args, **kwargs):
        # ..
        # query = u"SELECT * FROM %s ORDER BY 'id';"%(
        #     self.__class__.__name__,
        # )

        where = self._sql_where(*args, **kwargs)
        # ...
        query = u"SELECT * FROM %s %s ORDER BY 'id';"%(
            self.__class__.__name__,
            where
        )        
        # ...
        cursor = dbpool.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        # ...
        return self.fetchlist(records)

    def fetchrecord(self, fields, record):
        result = {}
        for index, item in fields:
            name, _ = item
            result[name] = record[index]
        return result

    def fetchlist(self, records):
        fields = list(enumerate(self._fields()))
        return [self.fetchrecord(fields,item) for item in records]

