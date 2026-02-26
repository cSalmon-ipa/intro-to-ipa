from django.db import models


class DemoPerson(models.Model):
	id = models.BigAutoField(primary_key=True)
	username = models.EmailField(unique=True, blank=False, max_length=254)
	name = models.CharField(max_length=100, blank=False)
	age = models.IntegerField(default=18)
