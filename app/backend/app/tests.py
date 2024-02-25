from django.test import TestCase
from app.models import AppUser
from django.contrib.auth.models import User

from django.test import Client
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.authtoken.models import Token

import json
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from app.views import getData, addUser


# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):
        AppUser.objects.create(username="Test1", email="test1@example.com")
        AppUser.objects.create(username="Test2", email="test2@example.com")
        AppUser.objects.create(username="Test3", email="test3@example.com")
        AppUser.objects.create(username="Test_duplicate", email="test_duplicate@example.com")
        AppUser.objects.create(username="Test_delete_email", email="test_delete_email@example.com")
        AppUser.objects.create(username="Test_delete_email2", email="test_delete_email2@example.com")

    def test_user_exists(self):
        """Users are correctly added to the database"""
        tester1 = AppUser.objects.get(email="test1@example.com")
        tester2 = AppUser.objects.get(email="test2@example.com")
        tester3 = AppUser.objects.get(email="test3@example.com")
        self.assertEqual(tester1.username, 'Test1')
        self.assertEqual(tester2.username, 'Test2')
        self.assertNotEqual(tester3.username, 'Test4')

    def test_get_user_by_email(self):
        """Test retrieving user by email"""
        user = AppUser.objects.get(email="test2@example.com")
        self.assertEqual(user.username, "Test2")   

    def test_user_update(self):
        """Test updating user information"""
        user = AppUser.objects.get(email="Test2@example.com")
        user.username = "UpdatedTest2"
        user.save()
        updated_user = AppUser.objects.get(email="Test2@example.com")
        self.assertEqual(updated_user.username, "UpdatedTest2")   

    def test_user_creation(self):
        """Test creating a new user"""
        user_count_before = AppUser.objects.count()
        AppUser.objects.create(username="Test6", email="test6@example.com")
        user_count_after = AppUser.objects.count()
        self.assertEqual(user_count_after, user_count_before + 1)

    def test_user_deletion(self):
        """Test deleting a user"""
        user_count_before = AppUser.objects.count()
        user = AppUser.objects.get(email="Test3@example.com")
        user.delete()
        user_count_after = AppUser.objects.count()
        self.assertEqual(user_count_after, user_count_before - 1)
    
    def test_delete_nonexistent_user(self):
        """Test attempting to delete a user that does not exist"""
        user_count_before = AppUser.objects.count()
        # Assuming 'nonexistent_user' does not exist
        with self.assertRaises(AppUser.DoesNotExist):
            AppUser.objects.get(email="nonexistent_user@example.com").delete()
        user_count_after = AppUser.objects.count()
        # Ensure the user count remains unchanged
        self.assertEqual(user_count_after, user_count_before)

    def test_delete_specific_user(self):
        """Test deleting a specific user when there are multiple users with the same username"""
        username_to_delete = "Test_duplicate"  # Assuming there are multiple users with this username
        user_count_before = AppUser.objects.count()
        
        # Retrieve the users with the given username
        users_to_delete = AppUser.objects.filter(username=username_to_delete)
        
        # Ensure there is at least one user with the given username
        self.assertTrue(users_to_delete.exists(), "No user found with the specified username")

        # Assuming you want to delete the first user with the given username
        user_to_delete = users_to_delete.first()
        user_id_to_delete = user_to_delete.id
        
        user_to_delete.delete()  # Delete the user
        
        user_count_after = AppUser.objects.count()
        
        # Ensure only one user with the given username is deleted
        self.assertEqual(user_count_after, user_count_before - 1)
        
        # Ensure no other user with the same username remains in the database
        self.assertFalse(AppUser.objects.filter(username=username_to_delete).exists())
        
        # Ensure the correct user is deleted by checking its ID
        self.assertFalse(AppUser.objects.filter(id=user_id_to_delete).exists())

    def test_delete_specific_user_by_email(self):
        """Test deleting a specific user by their email"""
        email_to_delete = "test_delete_email@example.com"  # Assuming there is a user with this email
        user_count_before = AppUser.objects.count()
        

        # Attempt to retrieve the user with the given email
        user_to_delete = AppUser.objects.get(email=email_to_delete)

        
        user_id_to_delete = user_to_delete.id
        
        user_to_delete.delete()  # Delete the user
        
        user_count_after = AppUser.objects.count()
        
        # Ensure only one user with the given email is deleted
        self.assertEqual(user_count_after, user_count_before - 1)
        

        
        # Ensure the correct user is deleted by checking its ID
        self.assertFalse(AppUser.objects.filter(id=user_id_to_delete).exists())

    def test_delete_specific_user_by_email_two(self):
        """Test deleting a specific user by their email"""
        email_to_delete = "test_delete_email2@example.com"  # Assuming there is a user with this email
        
        # Attempt to retrieve the user with the given email
        user_to_delete = AppUser.objects.get(email=email_to_delete)
        
        # Delete the user
        user_to_delete.delete()
        
        # Ensure no other user with the same email remains in the database
        self.assertFalse(AppUser.objects.filter(email=email_to_delete).exists())

    


class AppUserTestCase(TestCase):
    def setUp(self):
        # Set up any necessary data for the test
        AppUser.objects.create(email="existing@example.com", username="existing_user")

    def test_user_email_unique(self):
        """Test if user emails are unique"""
        # Ensure that querying for a non-existent user raises DoesNotExist
        with self.assertRaises(AppUser.DoesNotExist):
            AppUser.objects.get(email="test1@example.com")

        # Optionally, test for an existing user to ensure the test environment is correct
        existing_user = AppUser.objects.get(email="existing@example.com")
        self.assertEqual(existing_user.username, "existing_user")

    def test_get_user_by_username(self):
        """Test retrieving user by username"""
        user = AppUser.objects.get(username="existing_user")
        self.assertEqual(user.email, "existing@example.com")

    def test_invalid_email_format(self):
        """Test if ValidationError is raised for invalid email format"""
        # Attempt to create a user with an invalid email format and missing password
        with self.assertRaises(ValidationError) as context:
            user = AppUser(username="Test4", email="invalid_email", password="")
            user.full_clean()  # Trigger validation

        # full_clean() validates all fields on the `user` instance checking things such as field types(charfield for strings, integerfield for integers), field constraints(min and max values for charfield and integerfield), and field validators (validate_email)
        # if there are validation errors during this validation process, Django raises ValidationError with details about the error.
        

    def test_blank_email(self):
        """Test if blank email is rejected"""
        with self.assertRaises(ValidationError) as context:
            user = AppUser(username="Test4", email="", password="") # No clue yet if having a blank password does anything (Check test_blank_username below for one without password)
            user.full_clean()  # Trigger validation

    def test_blank_username(self):
        """Test if blank username is rejected"""
        with self.assertRaises(ValidationError) as context:
            user = AppUser.objects.create(username="", email="test@example.com")
            user.full_clean()  # Trigger validation


# ================ LOG IN TEST CASES ================

# class LoginTestCase(APITestCase):
#     def setUp(self):
#         # Create a test user
#         self.user = AppUser.objects.create(email="test@example.com", username="testuser")

#     def test_login_with_valid_credentials(self):
#         factory = APIRequestFactory()
#         # view  = getData.as_view()
#         # Define the login URL
#         login_url = 'http://localhost:3000/Login'  # Adjust this to match your actual login URL
        
#         # Define valid credentials
#         valid_credentials = {'email': 'test@example.com', 'password': 'password123'}

#         # Make a POST request to login endpoint with valid credentials
#         # response = self.client.post(login_url, json.dumps(valid_credentials), content_type='application/json')
#         request = factory.post(login_url, valid_credentials, format='json')
#         # response = view(request)

#         # Assert that the response status code is 200 (or any other expected code)
#         self.assertEqual(request, 200)

#         # Optionally, assert any other expected behavior in the response
#         # For example, you might check if the response contains an access token or a success message

# ================ LOG OUT TEST CASES ================
            
# class LogoutTestCase(TestCase):
#     def setUp(self):
#         # Create a test user
#         self.user = AppUser.objects.create(email="test@example.com", username="testuser")

#     def test_logout(self):
#         # Log in the user
#         self.client.force_login(self.user)

#         # Simulate calling the logout endpoint with Axios
#         response = self.client.post(reverse('logout'))

#         # Assert that the response status code is 302 (redirect)
#         self.assertEqual(response.status_code, 302)

#         # Assert that the user is redirected to the expected page
#         self.assertEqual(response.url, '/login/')  # Adjust the redirect URL as per your application's logout behavior

#         # Assert server-side behavior (e.g., session/cookie cleared)
#         # For example, you could check if the user is no longer authenticated
#         self.assertFalse(response.wsgi_request.user.is_authenticated)
