import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = os.environ.get("SECRET_KEY")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")

DEBUG = os.environ.get("DEBUG", False)

hosts = os.environ.get("DJANGO_ALLOWED_HOSTS")

if hosts is not None:
	ALLOWED_HOSTS = hosts.split(" ")
else:
	ALLOWED_HOSTS = "localhost 127.0.0.1 [::1]"

# Application definition

INSTALLED_APPS = [
	"django.contrib.admin",
	"django.contrib.auth",
	"django.contrib.contenttypes",
	"django.contrib.sessions",
	"django.contrib.messages",
	"rest_framework",
	"api",
]

REST_FRAMEWORK = {
	"DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
}

MIDDLEWARE = [
	"django.middleware.security.SecurityMiddleware",
	"whitenoise.middleware.WhiteNoiseMiddleware",
	"django.contrib.sessions.middleware.SessionMiddleware",
	"django.middleware.common.CommonMiddleware",
	"django.middleware.csrf.CsrfViewMiddleware",
	"django.contrib.auth.middleware.AuthenticationMiddleware",
	"django.contrib.messages.middleware.MessageMiddleware",
	"django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
	{
		"BACKEND": "django.template.backends.django.DjangoTemplates",
		"APP_DIRS": True,
		"OPTIONS": {
			"context_processors": [
				"django.template.context_processors.debug",
				"django.template.context_processors.request",
				"django.contrib.auth.context_processors.auth",
				"django.contrib.messages.context_processors.messages",
			],
		},
	},
]

WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
	"default": {
		"ENGINE": os.environ.get("DEMO_ENGINE"),
		"NAME": os.environ.get("DEMO_DATABASE"),
		"USER": os.environ.get("DEMO_USER"),
		"PASSWORD": os.environ.get("DEMO_PASSWORD"),
		"HOST": os.environ.get("DEMO_HOST"),
		"PORT": os.environ.get("DEMO_PORT"),
	},
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
	},
	{
		"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
	},
	{
		"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
	},
	{
		"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
	},
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
