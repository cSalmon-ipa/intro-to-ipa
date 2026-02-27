from django.urls import path

from api.views.demo import DemoView, CreateDemoPersonView

urlpatterns = [
	path("demo/", DemoView.as_view()),
	path("create-demoPerson/", CreateDemoPersonView.as_view())
]
