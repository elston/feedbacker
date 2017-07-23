# -*- coding: utf-8 -*-
import re
import errors

class Validator(object):

    regex = None
    errmsg = None

    def __init__(self, value):
        # ..
        self.value = value

    def check(self, field_name, error_data):
        if self.regex is not None:
            match = self.regex.match(self.value)
            if not match:
                error_data[field_name] = self.errmsg
        
# ..
class Email(Validator):

    regex = re.compile(
        r"(?P<name>^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"  # dot-atom
        r'|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*"' # quoted-string
        r')@(?P<domain>(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)$)'  # domain
        r'|\[(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}\]$', re.IGNORECASE)  # literal form, ipv4 address (SMTP 4.1.3)    

    errmsg = u'Email должен быть в формате «имя@субдомен.домен»'



class Phone(Validator):
    regex = re.compile(
        r'^\(\d{3,4}\)[\d\-]{3,15}'
    )
    errmsg = u'Номер телефона должен быть в формате «(код города) номер»'    
                