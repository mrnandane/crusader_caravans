# base image
FROM node:11

#Author of a file
MAINTAINER onkar.dhuri@synerzip.com

#Build base includes g++ and gcc and Make
#RUN apk --no-cache add python build-base 

#Set working directory inside container 
WORKDIR /usr/src/app

#Copy package*json from host into container(path ./) 
COPY package*.json ./

#Installing yarn
RUN npm install -g yarn

#Installing typescript(tsc)
RUN npm install tsc -g

# Installing grpc 
RUN npm install grpc
#Copy the current directory contents from host into container  
COPY . .

#Open 3000 port outside container as 3000 port mentioned in .env file
EXPOSE 3000

RUN yarn add @babel/plugin-transform-react-jsx
	
#Run yarn to install all the dependencies which are required for the app
RUN npm install 

#It starts application when container gets up/launch
CMD ["npm", "start"]