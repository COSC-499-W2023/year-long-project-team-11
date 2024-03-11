# Week 9 (March 4 - March 10)
This was the week of peer testing. In preparation for the peer test, I fixed our Preview feature, and worked with Arya on updating the database/models to include saved posts and comments, and we managed to finish the commenting feature in time for peer testing.
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/9e190f0b-a323-47e8-a4a8-494eb8c72bb8)


# Week 7/8 (Feb 19 - Feb 25/Feb 26 - March 3)
During the reading week I worked on and completed my feature of slide regeneration. This included writing a frontend for the feature, and coding an endpoint on our backend to be able to regenerate the slides. This also included prompt engineering a new prompt for regeneration, as well as improving on the old prompt. I also changed our model to gpt-3.5-turbo-0125 which is supposed to have better results for structured outputs. I also updated our LangChain code to use the new LCEL syntax. During week 8, I worked on cleaning up parts of the code, this included specifying constant variables in our Python code for readability, removing files that were not needed. I also worked on a frontend modal component for saving content to help with Arya's feature. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/029b7919-255f-45f5-b52a-7c740d197ce6)


# Week 6 (Feb 12 - Feb 18)
This week I worked with Arya on the preview feature, as well as the API key credit wraning feature. Arya and I ran into issues using react-doc-viewer with pptx files, since the files were being served by localhost, which was not https, and the library used Microsoft's "Office Web Viewer" which wouldn't allow connections to non https domains. This meant that the feature would not work in development. We are considering options to work around this. After doing research, there is no API way of getting the remaining credits for an API key, meaning that the only implementation would be to estimate usage, which would not be accurate. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/78c7b33b-d58a-46e4-baba-2e73ef1a9f95)


# Week 5 (Feb 5 - Feb 11)
This week I completed my feature of implementing a loading spinner for the AI generation page, although minor adjustments can still be made if we want to. I also worked on my feature of implementing re-generation of generated content. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/81b241aa-5f5d-4bee-ba66-566c5ef3e73e)

# Week 4 (Jan 29 - Feb 4)
This week I revamped the frontend for the Prompt.js page, implemented slide themes, and worked on getting both AI generation and user authentication working on the same build in time for our firs peer review. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/dee5bb65-a8c3-4d4f-af74-8e44ec3d8add)

# Week 3 (Jan 22 - Jan 28)
This week I completed my feature of slide generation, this included prompt engineering a prompt template for the AI to output in an XML format, writing a function to parse the generated XML into a powerpoint file, and writing a Django view to serve the file. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/1d134715-a9ba-470a-aac1-b31890730ed9)

# Week 2 (Jan 15 - Jan 21)
This week I completed my merge of my AI API feature, we were previously having trouble with. I also worked with Depar on sorting out how that feature would link with his Save Content feature. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/d60c3b5f-125a-468a-b9dc-1eb3195a609c)


# Week 1 (Jan 8 - Jan 14)
After talking with other teams during the Thursday session, I was informed of Python libraries that other teams were using for slide generation. So this week I ended up mostly researching those libraries for slide generation (python-pptx), as well as looking at the OpenAI assistant API which another group was using to process file uploads. 
![image](https://github.com/COSC-499-W2023/year-long-project-team-11/assets/41003728/cd3e0ea9-eac7-4eff-a2cf-af166c1a112a)
