# The PoC Application #

This is sample python app that exposes /version endpoint to display the python version.

## Prerequisites

Check valid versions on:
* aws cli configured (with appropriate permissions)
* docker
* docker-compose 


## Steps to run the app locally

```
docker-compose up -d 
```

## Accessing the app locally

```
http://localhost/version
```

## Steps to push the docker image to ECR repo

* The script created the ECR repo.
* Builds the app and creates a docker image.
* Tags the image
* Pushes it to the ECR repo

```
Replace in ecr.sh file <aws-account-id> with your AWS account id and <region> with the region you want to create these resources.
sh ecr.sh
```





