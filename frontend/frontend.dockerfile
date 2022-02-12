FROM node:17.3.1

# set working directory
WORKDIR /var/www/html

# add app
COPY src /var/www/html
EXPOSE 3000
# start app
CMD ["npm", "start"]