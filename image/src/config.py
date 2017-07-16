# -*- coding: utf-8 -*-
import os, sys, importlib

class ImproperlyConfigured(Exception):
    """is somehow improperly configured"""
    pass

# ...
def get_env_variable(var_name, allow_none=False):
    try:
        return os.environ[var_name]
    except KeyError:
        if allow_none is False:
            err_msg = "Set the %s environment variable" \
                % var_name
            raise ImproperlyConfigured(err_msg)
        return None


class BaseConfig(object):
    # ...
    DEBUG = False
    TESTING = False

    # ...path
    # =====================================
    # ...dir
    BASE_DIR = os.path.dirname(
        os.path.abspath(__file__)
    )

    # ...templates
    TEMPLATES_DIR = os.path.join(
        BASE_DIR, 'templates'
    )

    # ...database
    # =====================================
    DATABASE = os.path.join(
        BASE_DIR, '.data/db.sqlite3'
    )

    # ....настройки реквизитов
    # .. server
    # =====================================
    HOST = get_env_variable('HOST')
    PORT = int(get_env_variable('PORT'))


class DevConfig(BaseConfig):
    DEBUG = True
    TESTING = False


class TestConfig(BaseConfig):
    DEBUG = False
    TESTING = True


config = {
    "base": "BaseConfig",
    "dev": "DevConfig",
    "test": "TestConfig",
}


class Config:

    def __init__(self):
        # ..
        config_name = os.getenv('CONFIGURATION', 'dev')
        config_class = config[config_name]
        module = importlib.import_module('config')
        # ..
        self._class = getattr(module,config_class)

    def __getattr__(self, attr):
        return getattr(self._class, attr)


def init(app):
    # ..
    if getattr(app, 'config', None):
        return;
    # ..
    config = Config()
    setattr(app, 'config', config)
