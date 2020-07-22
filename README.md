# Simple Kubernetes Cluster via Kops


## Set up Kops environment variables

```
sudo su
echo "export s3bucketname=kops-poc-s3"
echo "export KOPS_STATE_STORE=s3://$s3bucketname"
echo "export KOPS_CLUSTER_NAME=kubecluster.k8s.local"
echo "export awsregion=us-east-1"
echo "export clusterkey=test"
echo "export mastertype=t2.medium"
echo "export nodetype=t2.medium"
```


## Install kops

```
curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/bin/kops
sudo echo "export PATH=$PATH:/usr/bin/kops"
```

## Install kubectl

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/bin/kubectl
sudo echo "export PATH=$PATH:/usr/bin/kubectl"
```

## Setup IAM Role Manually
Create an IAM role with the below permissions and assign it to the instance from where you are executing the kops commands.

```
AmazonEC2FullAccess
AmazonRoute53FullAccess
AmazonS3FullAccess
IAMFullAccess
AmazonVPCFullAccess
```

## Setup S3

```
aws s3api create-bucket --bucket $s3bucketname --region $awsregion
aws s3api put-bucket-versioning --bucket $s3bucketname --versioning-configuration Status=Enabled
aws s3api put-bucket-encryption --bucket $s3bucketname  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

## Create Cluster Config

```
sudo kops create cluster \
--cloud=aws \
--state=${KOPS_STATE_STORE} \
--node-count=1 \
--master-count=1 \
--master-size=${mastertype} \
--node-size=${nodetype} \
--zones=us-east-1a,us-east-1b,us-east-1e \
--name=${KOPS_CLUSTER_NAME} \
--networking=amazon-vpc-routed-eni \
--ssh-public-key=~/.ssh/${clusterkey}.pub
```

## Update the cluster

```
sudo kops update cluster --name ${KOPS_CLUSTER_NAME} --state ${KOPS_STATE_STORE} --yes
```

## Test the cluster

```
kubectl get nodes
```

*Note: In the above example I haven't specified the networking components like netowrk cidr or the vpc and subnets to use with the cluster. We can alternatively pass them as parameters to kops cli command while creating the cluster.
For Eg.*

```
sudo kops create cluster \
--cloud=aws \
--state=${KOPS_STATE_STORE} \
--node-count=1 \
--master-count=1 \
--master-size=${mastertype} \
--node-size=${nodetype} \
--zones=us-east-1a,us-east-1b,us-east-1e \
--name=${KOPS_CLUSTER_NAME} \
--vpc=${vpcid} \
--subnets=${privsubnet1},${privsubnet2},${privsubnet3} \
--associate-public-ip=false \
--utility-subnets=${pubsubnet1},${pubsubnet2},${pubsubnet3} \
--topology=private \
--networking=amazon-vpc-routed-eni \
--network-cidr=${networkcidr} \
--api-loadbalancer-type=internal \
--ssh-public-key=~/.ssh/${clusterkey}.pub

``
