from django.test import TestCase
from app.models import AppUser

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