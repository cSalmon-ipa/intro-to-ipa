import datetime

from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from api.models.demoperson import DemoPerson


class Command(BaseCommand):
	def handle(self, *args, **options):

		try:
			DemoPerson.objects.create(name="Bob", age="25", username="bob@test.com")
		except Exception as e:
			print(e)

		try:
			DemoPerson.objects.create(name="Alice", age="30", username="alice@test.com")
		except Exception as e:
			print(e)

		try:
			DemoPerson.objects.create(name="Catherine", age="16", username="catherine@test.com")
		except Exception as e:
			print(e)

		try:
			DemoPerson.objects.create(name="Gary", age="50", username="gary@test.com")
		except Exception as e:
			print(e)

		try:
			DemoPerson.objects.create(name="Sam", age="20", username="sam@test.com")
		except Exception as e:
			print(e)
