# -*- coding: utf-8 -*-

import datetime

from decimal import Decimal
from urllib import quote, unquote

STRING_TYPES = (
    basestring,
)

PROTECTED_TYPES = (
    int, 
    long, 
    type(None), 
    float, 
    Decimal, 
    datetime.datetime, 
    datetime.date, 
    datetime.time,
)

def force_bytes(s, encoding='utf-8', strings_only=False, errors='strict'):
    # ..
    if isinstance(s, bytes):
        if encoding == 'utf-8':
            return s
        # ...
        return s.decode('utf-8', errors).encode(encoding, errors)
    # ...
    if strings_only and isinstance(s, PROTECTED_TYPES):
        return s
    # ...
    if not isinstance(s, STRING_TYPES):
        return bytes(s)
    # ..
    return s.encode(encoding, errors)

def repercent_broken_unicode(path):
    """
    As per section 3.2 of RFC 3987, step three of converting a URI into an IRI,
    we need to re-percent-encode any octet produced that is not part of a
    strictly legal UTF-8 octet sequence.
    """
    try:
        path.decode('utf-8')
    except UnicodeDecodeError as e:
        repercent = quote(path[e.start:e.end], safe=b"/#%[]=:;$&()+,!?*@'~")
        path = repercent_broken_unicode(
            path[:e.start] + force_bytes(repercent) + path[e.end:])
    # ...
    return path

def uri_to_iri(uri):
    """
    Converts a Uniform Resource Identifier(URI) into an Internationalized
    Resource Identifier(IRI).

    This is the algorithm from section 3.2 of RFC 3987.

    Takes an URI in ASCII bytes (e.g. '/I%20%E2%99%A5%20Django/') and returns
    unicode containing the encoded result (e.g. '/I \xe2\x99\xa5 Django/').
    """
    if uri is None:
        return uri
    # ...
    uri = force_bytes(uri)
    iri = unquote(uri)
    return repercent_broken_unicode(iri).decode('utf-8')