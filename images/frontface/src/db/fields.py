# -*- coding: utf-8 -*-
import datetime
import sys
import types

PY2 = sys.version_info[0] == 2
PY3 = sys.version_info[0] == 3


if PY3:
    string_types = str,
    integer_types = int,
    class_types = type,
    text_type = str
    binary_type = bytes

else:
    string_types = basestring,
    integer_types = (int, long)
    class_types = (type, types.ClassType)
    text_type = unicode
    binary_type = str


class Field(object):
    """
    class for all Fields.
    """

    def __init__(self):
        # ..
        self._value = None

    def get(self):
        return self._value

    def set(self, value):
        self._value = self.to_python(value)


class Boolean(Field):
    """
    Boolean
    """

    def to_python(self, value):
        return bool(value)

    def to_sql(self, name):
        return "{%s}"%(name)


class Integer(Field):
    """
    Integer
    """
    def to_python(self, value):
        # ...
        if value == None:
            return 0
        # ...
        return int(value)

    def to_sql(self, name):
        return "{%s}"%(name)


class String(Field):
    """
    String
    """

    def __init__(self, length=None):
        super(String, self).__init__()
        # ..
        self._length = length

    def to_python(self, value):
        # ..
        if value == None:
            return ''
        # ..
        return text_type(value)


    def to_sql(self, name):
        return "'{%s}'"%(name)


class Text(Field):
    """
    Text
    """
    def to_python(self, value):
        # ..
        if value == None:
            return ''        
        # ...
        return text_type(value)

    def to_sql(self, name):
        return "'{%s}'"%(name)


        
class DateTime(Field):
    """
    DateTime
    """

    def to_python(self, value):
        # ..
        if value == None:
            return None     
        # ...
        return value

    def to_sql(self, name):
        return "'{%s}'"%(name)