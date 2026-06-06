from .base_model import BaseModel


class User(BaseModel):
    def __init__(self, first_name, last_name, email):
        super().__init__()

        self.first_name = first_name
        self.last_name = last_name
        self.email = email

        self.places = []
        self.reviews = []
        if not first_name:
    raise ValueError("first_name required")

    if not last_name:
    raise ValueError("last_name required")

    if not email:
    raise ValueError("email required")