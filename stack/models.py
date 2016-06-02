from django.db import models
from django.utils import timezone


class PlotPoint(models.Model):
    point_text = models.CharField(max_length=200)
    uses = models.IntegerField(default=0)
    deletes = models.IntegerField(default=0)
    pub_date = models.DateTimeField('date published', default=timezone.now)

    def __str__(self):
        return self.point_text

    def get_dict(self):
        """Returns a dictionary of the objects properties."""
        return {
            'id': self.pk,
            'point_text': self.point_text,
            'uses': self.uses,
            'pub_data': self.pub_date,
            'deletes': self.deletes
        }
