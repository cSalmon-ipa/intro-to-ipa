from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.demoperson import DemoPerson
from api.serializers.demo import DemoSerializer, CreateDemoPersonSerializer


class DemoView(generics.GenericAPIView):
	serializer_class = DemoSerializer

	def get(self, request):
		hold = DemoPerson.objects.all()
		print(hold)
		print(hold[0])
		print(hold[0].name)
		serializer = self.serializer_class(hold, many=True)
		return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)

class CreateDemoPersonView(APIView):
	serialzer_class = CreateDemoPersonSerializer
	def post(self, request, format=None):
		if not self.request.session.exists(self.request.session.session_key):
			self.request.session.create()

		serializer = self.serialzer_class(data=request.data)
		if serializer.is_valid():
			username = serializer.data.get('username')
			name = serializer.data.get('name') 
			age = serializer.data.get('age')
			queryset = DemoPerson.objects.filter(username=username)
			if queryset.exists():
				demo_person = queryset[0]
				demo_person.name = name
				demo_person.age = age
				demo_person.save(update_fields=["name", "age"])
				return Response(DemoSerializer(demo_person).data, status=status.HTTP_200_OK)
			else:
				demo_person = DemoPerson(username=username, name=name, age=age)
				demo_person.save()
				return Response(DemoSerializer(demo_person).data, status=status.HTTP_201_CREATED)
		return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

