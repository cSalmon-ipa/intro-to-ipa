from cgitb import lookup
from functools import partial

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.demoperson import DemoPerson
from api.serializers.demo import (
	CreateDemoPersonSerializer,
	DemoSerializer,
	UpdateDemoPersonSerializer,
)


class DemoView(generics.GenericAPIView):
	serializer_class = DemoSerializer

	def get(self, request):
		hold = DemoPerson.objects.all().order_by("id")
		# print(hold)
		# print(hold[0])
		# print(hold[0].name)
		serializer = self.serializer_class(hold, many=True)
		return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class DemoByIDPerson(APIView):
	serializer_class = DemoSerializer

	def get(self, request, record_id):

		if record_id != None:
			try:
				demo_person = DemoPerson.objects.get(id=record_id)
				serializer = self.serializer_class(demo_person)
			except DemoPerson.DoesNotExist:
				return Response({"msg": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
			return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class CreateDemoPersonView(APIView):
	serializer_class = CreateDemoPersonSerializer

	def post(self, request, format=None):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			username = serializer.data.get("username")
			name = serializer.data.get("name")
			age = serializer.data.get("age")
			queryset = DemoPerson.objects.filter(username=username)
			if queryset.exists():
				# To avoid duplicates. Check if necessary measure.
				return Response({"msg": "Username already in use"}, status=status.HTTP_409_CONFLICT)

			else:
				demo_person = DemoPerson(username=username, name=name, age=age)
				demo_person.save()
				return Response(DemoSerializer(demo_person).data, status=status.HTTP_201_CREATED)
		return Response({"Bad Request": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)


class DeleteDemoPerson(APIView):
	def delete(self, request, record_id):
		try:
			demo_person = DemoPerson.objects.get(id=record_id)
		except DemoPerson.DoesNotExist:
			return Response({"msg": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
		demo_person.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


class UpdateDemoPerson(APIView):
	serializer_class = UpdateDemoPersonSerializer

	def patch(self, request, record_id):
		try:
			demo_person = DemoPerson.objects.get(id=record_id)
		except DemoPerson.DoesNotExist:
			return Response({"msg": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
		serializer = UpdateDemoPersonSerializer(demo_person, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(DemoSerializer(demo_person).data, status=status.HTTP_201_CREATED)
		if not serializer.is_valid():
			print(serializer.errors)
			return Response({"Bad Request": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)
