from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.demoperson import DemoPerson
from api.serializers.demo import DemoSerializer


class DemoView(generics.GenericAPIView):
	serializer_class = DemoSerializer

	def get(self, request):
		hold = DemoPerson.objects.all()
		print(hold)
		print(hold[0])
		print(hold[0].name)
		serializer = self.serializer_class(hold, many=True)
		return Response({"message": "success", "data": serializer.data}, status=status.HTTP_200_OK)


