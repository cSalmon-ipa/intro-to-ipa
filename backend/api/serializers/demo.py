from rest_framework import serializers

from api.models.demoperson import DemoPerson


class DemoSerializer(serializers.ModelSerializer):
	class Meta:
		model = DemoPerson
		fields = ["name", "age"]
