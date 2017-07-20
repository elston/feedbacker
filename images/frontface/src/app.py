#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ..
import logging, argparse

# ...
import yask, config, urls, models

app = yask.App()
# ...
config.init(app)
app.init_logger()
urls.init(app)
models.init(app)

# ...
if __name__ == "__main__":
    # ...
    parser = argparse.ArgumentParser(
                        description='Setup defaults')
    # ..
    parser.add_argument('--host', 
                        dest='host',
                        default=app.config.HOST,
                        help='Default hostname')
    # ...
    parser.add_argument('--port', 
                        dest='port',
                        type=int,
                        default=app.config.PORT,
                        help='Default port')
    # ..
    arguments = parser.parse_args()
    # ...
    app.run(host=arguments.host, port=arguments.port)
