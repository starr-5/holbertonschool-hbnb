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
    def create_place(self, place):
    self.repo.add(place)

    def get_place(self, place_id):
    return self.repo.get(place_id)

    def get_all_places(self):
    return self.repo.get_all()

    def update_place(self, place_id, place):
    self.repo.update(place_id, place)
    def create_review(self, review):
    self.repo.add(review)

    def get_review(self, review_id):
    return self.repo.get(review_id)

    def get_all_reviews(self):
    return self.repo.get_all()

    def update_review(self, review_id, review):
    self.repo.update(review_id, review)

    def delete_review(self, review_id):
    self.repo.delete(review_id)