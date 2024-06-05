This is the home for any important notes about running the project.

<h1>Docker Notes</h1>
- When running the docker-compose file after it or the sql file have been changed, make sure to first use the command "docker-compose down -v". This will clear out any stashed volumes that would have run instead of the newest version of the file.