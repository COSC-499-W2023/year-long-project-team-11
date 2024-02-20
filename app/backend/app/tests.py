from django.test import TestCase
from app.models import AppUser
from django.test import Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        AppUser.objects.create(username="Test1", email="test1@example.com")
        AppUser.objects.create(username="Test2", email="test2@example.com")
        AppUser.objects.create(username="Test3", email="test3@example.com")

    def test_user_exists(self):
        """Users are correctly added to the database"""
        tester1 = AppUser.objects.get(email="test1@example.com")
        tester2 = AppUser.objects.get(email="test2@example.com")
        tester2 = AppUser.objects.get(email="test3@example.com")
        self.assertEqual(tester1.username, 'Test1')
        self.assertEqual(tester2.username, 'Test2')
        self.assertNotEqual(tester2.username, 'Test4')

    def test_user_email_unique(self):
        """Test if user emails are unique"""
        with self.assertRaises(AppUser.DoesNotExist):
            AppUser.objects.get(email="test1@example.com")

    def test_invalid_email_format(self):
        """Test if invalid email format is rejected"""
        with self.assertRaises(ValueError):
            AppUser.objects.create(username="Test4", email="invalid_email")

    def test_blank_email(self):
        """Test if blank email is rejected"""
        with self.assertRaises(ValueError):
            AppUser.objects.create(username="Test5", email="")

    def test_blank_username(self):
        """Test if blank username is rejected"""
        with self.assertRaises(ValueError):
            AppUser.objects.create(username="", email="test@example.com")

    def test_get_user_by_username(self):
        """Test retrieving user by username"""
        user = AppUser.objects.get(username="Test1")
        self.assertEqual(user.email, "test1@example.com")

    def test_get_user_by_email(self):
        """Test retrieving user by email"""
        user = AppUser.objects.get(email="test2@example.com")
        self.assertEqual(user.username, "Test2")

    def test_user_creation(self):
        """Test creating a new user"""
        user_count_before = AppUser.objects.count()
        AppUser.objects.create(username="Test6", email="test6@example.com")
        user_count_after = AppUser.objects.count()
        self.assertEqual(user_count_after, user_count_before + 1)

    def test_user_deletion(self):
        """Test deleting a user"""
        user_count_before = AppUser.objects.count()
        user = AppUser.objects.get(username="Test3")
        user.delete()
        user_count_after = AppUser.objects.count()
        self.assertEqual(user_count_after, user_count_before - 1)

    def test_user_update(self):
        """Test updating user information"""
        user = AppUser.objects.get(username="Test2")
        user.username = "UpdatedTest2"
        user.save()
        updated_user = AppUser.objects.get(username="UpdatedTest2")
        self.assertEqual(updated_user.username, "UpdatedTest2")
        
class LoginTestCase(TestCase):
    def setUp(self):
        # Setup any necessary data such as creating users in the database
        self.client = APIClient()

    def test_login_success(self):
        # Test successful login
        url = reverse('token_obtain_pair')  # Assuming you're using DRF JWT authentication
        data = {'email': 'test@example.com', 'password': 'password123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Add assertions to check if access and refresh tokens are returned in response data

    def test_login_invalid_credentials(self):
        # Test login with invalid credentials
        url = reverse('token_obtain_pair')
        data = {'email': 'invalid@example.com', 'password': 'invalidpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Add assertions to check error message or absence of tokens in response data

    # Add more test cases as needed
        
class LogoutTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_logout_clears_local_storage_and_redirects(self):
        response = self.client.post(reverse('logout'))  # Assuming '/logout' is the URL for logging out

        # Assert that the response status code is 302 (redirect)
        self.assertEqual(response.status_code, 302)

        # Assert that local storage is cleared
        self.assertNotIn('username', self.client.session)  # Assuming username is stored in session        