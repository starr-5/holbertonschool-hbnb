from .base_model import BaseModel


class Review(BaseModel):
    def __init__(self, text, user, place):
        super().__init__()

        self.text = text
        self.user = user
        self.place = place
        if not text:
    raise ValueError("text required")