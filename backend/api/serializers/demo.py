from rest_framework import serializers

from api.models.demoperson import DemoPerson


class DemoSerializer(serializers.ModelSerializer):
	class Meta:
		model = DemoPerson
		fields = ["id", "username", "name", "age"]

class CreateDemoPersonSerializer(serializers.ModelSerializer):
	class Meta:
		model = DemoPerson
		fields = ("username", "name", "age")