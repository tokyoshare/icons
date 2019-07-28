FROM node:10.16.0

# set working directory
RUN mkdir /usr/src/app

# make work dir as user/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
ADD ./app /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install

# start app
CMD ["npm", "run", "start"]