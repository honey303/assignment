# AWS ECS Cluster Terraform Module #

This Terraform module creates an AWS ECS cluster, ALB and IAM role for the ECS task execution.


## Prerequisites

* Run ecr.sh file to push the docker image to the ECR repo

Check valid versions on:
* Terraform version: v0.12.15
* aws provider version: v3.13.0
* aws cli configured

## Input values

* ECR Image URI 
* VPC ID
* 2 (min) pubic subnets (List of strings). For eg. ["subnet1-xxxx", "subnet2-xxxx"]
* (1 min) Security Groups (List of strings). For eg. ["sg-xxxx"].
*Note: HTTP (80) port must be open in the Security Group *

## Steps to run the Terraform scripts

```
terraform init
terraform apply

```




