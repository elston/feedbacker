# -*- coding: utf-8 -*-
from string import Template
import models

def index(app, environ, start_response):
    # ...
    return app.render('index.html',start_response=start_response)


def stat(app, environ, start_response):

    tmplRow = '''
    <tr>
        <td style="text-align: center;">${region_id}</td>
        <td style="text-align: center;"> 
            <a target="_blank" href="/stat/region/${region_id}">
                ${region_name}
            </a>
        </td>
        <td style="text-align: center;">${cnt}</td>        
    </tr>
    '''

    query = """
    SELECT 
        Region.id as region_id,
        Region.name as region_name,
        count(*) as cnt
    FROM
        Feedback
        JOIN City ON City.id = Feedback.city_id
        JOIN Region ON Region.id = City.region_id
    GROUP BY
        Region.id
    -- HAVING count(*) > 5
    ORDER BY count(*) ASC    
    """
    cursor = app.dbpool.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    records = [{
        'region_id':    item[0],
        'region_name':  item[1],
        'cnt':          item[2],        
    } for item in records]
    # print(records)
    tmpl = Template(tmplRow)
    tbody = []
    for record in records:
        tbody.append(tmpl.substitute({
            'region_id':record['region_id'],
            'region_name':record['region_name'].encode('utf-8'),
            'cnt':record['cnt'],
        }))
    # ..
    context = {
        'tbody': ''.join(tbody),
    }
    return app.render('stat.html', context=context, start_response=start_response)


def stat_region(app, environ, start_response):
    # ..
    (region_id, ) = environ['app.url_args']
    # ..
    cursor = app.dbpool.cursor()
    # ..
    region = models.Region(cursor)
    region = region.get(id=region_id)    
    region = region.as_dict()    

    # ..
    tmplRow = '''
    <tr>
        <td style="text-align: center;">${city_id}</td>
        <td style="text-align: center;"> ${city_name}</td>
        <td style="text-align: center;">${cnt}</td>        
    </tr>
    '''

    query = """
    SELECT 
        City.id as city_id,
        City.name as city_name,
        count(*) as cnt
    FROM
        Feedback
        JOIN City ON City.id = Feedback.city_id
    WHERE
        City.region_id = {region_id}
    GROUP BY
        City.id
    -- HAVING count(*) > 5
    ORDER BY count(*) ASC    
    """.format(region_id=region_id)
    # ..
    cursor.execute(query)
    records = cursor.fetchall()
    records = [{
        'city_id':    item[0],
        'city_name':  item[1].encode('utf-8'),
        'cnt':          item[2],        
    } for item in records]
    # print(records)
    tmpl = Template(tmplRow)
    tbody = [tmpl.substitute(record) for record in records]
    # ...
    context = {
        'region_name':region['name'].encode('utf-8'),
        'tbody':''.join(tbody),
    }
    return app.render('stat_region.html',context=context, start_response=start_response)