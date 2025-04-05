#PROJECT SETUP COMMAND

# CLONE THE REPOSITORY USING THIS COMMAND
https://github.com/zeyakarim/tasks-management.git

# INSTALL DEPENDENCIES
npm i

# CREATE .env file add this KEY and your own value

PORT=3000
NODE_ENV=production
PG_FORCE_NATIVE=true
NODE_OPTIONS=--dns-result-order=ipv4first
PGDB=[database_name]
PGUSER=[database_user]
PGPASSWORD=[database_password]
PGHOST=[database_host] (like rds, local)
JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_COOKIE_EXPIRES_IN=7d

# After performing above command start the server using this command
npm run dev
