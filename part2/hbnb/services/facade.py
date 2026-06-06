from hbnb.persistence.repository import InMemoryRepository


class HBnBFacade:

    def __init__(self):
        self.repo = InMemoryRepository()
            def create_user(self, user):
        self.repo.add(user)

    def get_user(self, user_id):
        return self.repo.get(user_id)

    def get_all_users(self):
        return self.repo.get_all()

    def update_user(self, user_id, user):
        self.repo.update(user_id, user)
    def create_amenity(self, amenity):
    self.repo.add(amenity)

    def get_amenity(self, amenity_id):
    return self.repo.get(amenity_id)

    def get_all_amenities(self):
    return self.repo.get_all()

    def update_amenity(self, amenity_id, amenity):
    self.repo.update(amenity_id, amenity)