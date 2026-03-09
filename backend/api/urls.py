from django.urls import path

from api.views.demo import CreateDemoPersonView, DeleteDemoPerson, DemoByIDPerson, DemoView, UpdateDemoPerson

urlpatterns = [
	path("demo/", DemoView.as_view()),
	path("demoByID/<str:record_id>", DemoByIDPerson.as_view()),
	path("delete-demoPerson/<str:record_id>", DeleteDemoPerson.as_view(), name="record-delete"),
	path("update-demoPerson/<str:record_id>", UpdateDemoPerson.as_view(), name="record-update"),
	path("create-demoPerson/", CreateDemoPersonView.as_view()),
]
