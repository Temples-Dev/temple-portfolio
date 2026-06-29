import cloudinary
import cloudinary.uploader
import requests

from django.core.files.base import ContentFile
from django.core.files.storage import Storage


class CloudinaryMediaStorage(Storage):
    def _save(self, name, content):
        result = cloudinary.uploader.upload(
            content,
            use_filename=True,
            unique_filename=True,
            overwrite=False,
            resource_type='auto',
        )
        return result['secure_url']

    def url(self, name):
        if not name:
            return ''
        if name.startswith('http'):
            return name
        return cloudinary.CloudinaryImage(name).build_url(secure=True)

    def exists(self, name):
        return False

    def delete(self, name):
        try:
            public_id = name.rsplit('/', 1)[-1].rsplit('.', 1)[0]
            cloudinary.uploader.destroy(public_id)
        except Exception:
            pass

    def _open(self, name, mode='rb'):
        url = self.url(name)
        response = requests.get(url)
        f = ContentFile(response.content)
        f.name = name
        return f

    def size(self, name):
        return 0
