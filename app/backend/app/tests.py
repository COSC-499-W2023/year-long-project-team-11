from django.test import TestCase
from app.models import AppUser
from django.contrib.auth.models import User
from django.test import Client
# from django.urls import reverse
# from rest_framework.test import APIClient
# from rest_framework import status
# from django.test import TestCase
# from django.urls import reverse
# from rest_framework.test import APIClient
# from rest_framework import status
from django.core.exceptions import ValidationError


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
        tester2 = AppUser.objects.get(email="test3@example.com")
        self.assertEqual(tester1.username, 'Test1')
        self.assertEqual(tester2.username, 'Test3')
        self.assertNotEqual(tester2.username, 'Test4')

    def test_get_user_by_email(self):
        """Test retrieving user by email"""
        user = AppUser.objects.get(email="test2@example.com")
        self.assertEqual(user.username, "Test2")   

    def test_user_update(self):
        """Test updating user information"""
        user = AppUser.objects.get(username="Test2")
        user.username = "UpdatedTest2"
        user.save()
        updated_user = AppUser.objects.get(username="UpdatedTest2")
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
        user = AppUser.objects.get(username="Test3")
        user.delete()
        user_count_after = AppUser.objects.count()
        self.assertEqual(user_count_after, user_count_before - 1)
    
    def test_delete_nonexistent_user(self):
        """Test attempting to delete a user that does not exist"""
        user_count_before = AppUser.objects.count()
        # Assuming 'nonexistent_user' does not exist
        with self.assertRaises(AppUser.DoesNotExist):
            AppUser.objects.get(username="nonexistent_user").delete()
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
            #full_clean() validates all fields on the `user` instance checking things such as field types(charfield for strings, integerfield for integers), field constraints(min and max values for charfield and integerfield), and field validators (validate_email)
            #if there are validation errors during this validation process, Django raises ValidationError with details about the error.
        

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









        
# class LoginTestCase(TestCase):
#     def setUp(self):
#         # Setup any necessary data such as creating users in the database
#         self.client = APIClient()

#     def test_login_success(self):
#         # Test successful login
#         url = reverse('token_obtain_pair')  # Assuming you're using DRF JWT authentication
#         data = {'email': 'test@example.com', 'password': 'password123'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # Add assertions to check if access and refresh tokens are returned in response data

#     def test_login_invalid_credentials(self):
#         # Test login with invalid credentials
#         url = reverse('token_obtain_pair')
#         data = {'email': 'invalid@example.com', 'password': 'invalidpassword'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#         # Add assertions to check error message or absence of tokens in response data

#     # Add more test cases as needed
        
# class LogoutTestCase(TestCase):
#     def setUp(self):
#         self.client = Client()

#     def test_logout_clears_local_storage_and_redirects(self):
#         response = self.client.post(reverse('logout'))  # Assuming '/logout' is the URL for logging out

#         # Assert that the response status code is 302 (redirect)
#         self.assertEqual(response.status_code, 302)

#         # Assert that local storage is cleared
#         self.assertNotIn('username', self.client.session)  # Assuming username is stored in session        