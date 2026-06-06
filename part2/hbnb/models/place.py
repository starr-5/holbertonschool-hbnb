from .base_model import BaseModel


class Place(BaseModel):
    def __init__(
        self,
        title,
        description,
        price,
        latitude,
        longitude,
        owner
    ):
        super().__init__()

        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude

        self.owner = owner

        self.reviews = []
        self.amenities = []
        if price < 0:
    raise ValueError("invalid price")

    if latitude < -90 or latitude > 90:
    raise ValueError("invalid latitude")

    if longitude < -180 or longitude > 180:
    raise ValueError("invalid longitude")