<h1> =================== Term 2 =================== </h1>

**Week 1**
This week and over the break I had planned to get a brand new feature done to get ahead, but was sapped of motivation and ended up forgoing that goal. I did however managed to fix the password hashing problem our team was having for our "create user" page. Users can now sign up and log in properly, and their passwords are stored in an encrypted format. I have also begun work on implementaing a "Navigation bar" feature, but have not uploaded anything to Github yet as it is not in any kind of usable state yet.

I also performed some management duties this week by assisting in task allocation and priority setting, as well as ensuring that the team is all on the same page in regards to what is expected of us this term. I ran a mini retrospective meeting to help the team understand what was good and bad about last term, as well as how we should be moving forward going into this next term.

<img width="1064" alt="Screenshot 2024-01-14 at 7 52 21 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/a66b308e-619a-4585-b50b-30a34e0528a6">


**Week 2**
This week, I unfortunatly didn't get nearly as much work done as I had hoped to due to a number of issues in other courses, combined with mental stress from them continually piling up. I attempted to get a dynamic nav bar working, but had enough issues that I had to cut my losses, with a static and untextured nav bar being pushed to the navbar branch (not to development as it is not in a state I would consider ready to be used on other machines). I ended up having to cut my losses and focus my efforts on other courses, allowing me to clear out a large chunk of work which will allow me to dedicate most of my time next week to completing the nav bar in its entirety.

<img width="1070" alt="Screenshot 2024-01-21 at 10 54 30 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/7b689ab6-10ae-4bf2-9aa8-d050feee7852">

**Week 3**
This was a hectic week for me. For my first feature, I completed the implementation on a dynamic navbar on all pages of our site, complete with proper cleary laid out linking to allow users to easily navigate the site. For my second feature, I completed work on the logout system, connecting it up with the rest of the site. In addition to my 2 primary tasks, as a bonus I also refined the login and create user pages/buttons to properly redirect to their respective endpoints without opening a new page, and I assissted team member in debugging numerous errors the encountered regarding dependancies for their featrues (such as Profile, Saved Content, and general Django-React functionality), as well as advising them on what parts of their featrues were functioning incorrectly, and how to fix them.

<img width="1064" alt="Screenshot 2024-01-28 at 9 42 34 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/10fc217f-f982-455f-b21c-03efde7d44c7">

**Week 4**
This week was the week of our first peer review, meaning I all my time prior to the review testing our site and fixing any bugs that were encountered, as well as assiting in the testing and bug fixing of the features of ther memebers as well. Beyond simply testing however, I also mangaed to squeeze in a few more minor features into the navbar before the Thursday peer review such as having the users email show up when logged in, altering some of the redirects to create a more cohesive and easily understood site layout, and I also added our site logo to the navbar.

Beyond the coding, I also ran 2 of our groups review sessions/evaluations, taking notes of what does and doesn't need to be improved in our site. I also reviewed another team this week, walking through their site and providing feedback on what works and what doesn't (from a user experience standpoint, but I also gave some coding tips).

<img width="1066" alt="Screenshot 2024-02-04 at 10 08 34 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/64bab111-81a9-4a31-baac-5f9df6124a13">

**Week 5**
This week I spent the majority of my time away from this project due to a combination of multiple midterms, as well as personal issues. I did still manage to get some progress made however, though it was primarily in the form of assisting other group members, such as researching and writing a starter test for Django for another group member. I also worked on documenting parts of our project and coordinating the group to assign tasks and features that need to be worked on. The majority of my time however was spent compiling the feedback from our heurstic evaulations from the week before into tasks that need to be done/features that need to be implemented/altered.

<img width="1066" alt="Screenshot 2024-02-11 at 9 19 36 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/a0ab03df-878f-4c43-a3db-98e90439881e">

**Week 6**
This week I spent my time primarily in other courses, getting work threr finished off so that I would only have Capstoen to worry about during the break. For actual capstone content, I was heavily involved in our group planning for the break, allocating tasks based on prefernces and setting multiple hard deadlines throughout the break to ensure that we make the most of this time. Finally, despite not spending much time on my own code (I helped other member get started on their respective parts), I still mamanged to make some head-way into implementing access control. I originally started work on making the navbar dynamic (as can be seen as temporary comments in my code) but that ended up being a MUCH bigger hurdle than I had anticipated due to the way our site generates pages, so I pivoted to complete the sites access control first.

<img width="1063" alt="Screenshot 2024-02-18 at 10 35 08 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/471ea09e-01c7-4e71-9bdd-89490ebb09ee">

**Week 7 & 8**
During week 7 (the break week), I fully implemented access control for our site, forcing all pages to redirect on load if the corresponding criteria for each page was not met. I also made the NavBar fully dynamic, changing what it shows the user based on whether they are logged in or not. I also began updating our testing feature after Lance failed to complete it on time, though I ended up not making a lot of changes aside from altering tests to search for users by email instead of username, as there is no rule that 2 or more users cannot have the same username.

During week 8, I updated our user profile to actually show the correct user based on who is logged in (it was originally set to only show the first user in the database). I also began work on having the user profile page show the users saved content, but hit a roadblock as I am still waiting on the ability to save content to be pushed to development.

<img width="1063" alt="Screenshot 2024-03-03 at 9 36 15 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/1cab1768-755a-421f-935d-2d1e302a0daa">

**Week 9**
This week was a bit of a scramble with the peer review and midterms in other courses all converging into the same week. An issue with the login token authentication popped up a few days before the review which ended up becoming a massive stressor, but I was able to resolve that issue fortunatly and our sites access control is air-tight once again. I also made some adjustments to the navBar, changing out the email to instead display the current users username. There was also a weird issue with the prompt page displaying links to pages it shouldn't have been able to (likely a github unintentional override of one of my previous additions) so I changed it back to ensure that no page gives you a link to a page you can't access. Finally, I did some very minor code clean up, just to make things a bit more readable for future work.
I also helped a number of other group members resolve various issues with their features, but we don't get marks for that so no real point mentioning it.

<img width="1062" alt="Screenshot 2024-03-10 at 11 23 34 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/4a01a9ec-d182-49cd-ab47-abea7de230db">

**Week 10**
This week was a rather slow one for me in regards to project (coding) progress, focusing on FINALLY wrapping up the last of my midterms in other courses. At the beginning of the week I had the team meet up to discuss current progress, and we compiled all our feedback from peer reviews into a list of new featrues for each of us to work on, with my tasks being updating the user profile page to include saved content, and updating the nav bar to be more consistent with other websites (i.e. having the logo be a link to home, having your username be displayed instead of your email, etc.). For what little time I had this week I focused my efforts on augmenting the navBar with the changes listed above, though some very odd errors have popped up regarding setting the user's name which I am currently looking into.

<img width="1065" alt="Screenshot 2024-03-17 at 9 03 48 PM" src="https://github.com/COSC-499-W2023/year-long-project-team-11/assets/71360902/d4a97360-2b45-4063-90c2-0db8aa605f8a">
