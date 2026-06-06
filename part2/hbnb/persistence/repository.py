class InMemoryRepository:
    def __init__(self):
        self.storage = {}

    def add(self, obj):
        self.storage[obj.id] = obj

    def get(self, obj_id):
        return self.storage.get(obj_id)

    def get_all(self):
        return list(self.storage.values())

    def update(self, obj_id, obj):
        self.storage[obj_id] = obj

    def delete(self, obj_id):
        if obj_id in self.storage:
            del self.storage[obj_id]