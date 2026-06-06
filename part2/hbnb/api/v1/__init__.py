from flask_restx import Api

api = Api(
    title='HBnB API',
    version='1.0'
)
from .users import api as users_ns
from .amenities import api as amenities_ns
from .places import api as places_ns