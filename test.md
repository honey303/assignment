# HelloFresh DevOps Test

Hi, please find below the steps to execute in order to run the app locally as well as on a kubernetes cluster.

## Code Configuration

- All the API(s) are built using **Flask RESTful** framework in **Python3**. 
- The configs are stored in **Mongodb** for persistent storage
- The unit test are written using **unittest** testing framework.

_Note: By default the app runs on port 5000._

## Instructions to run the app locally

1. Run the docker-compose.yml file to run the app locally using the below command
```sh
docker-compose up -d
```
2. The app is designed to use SERVE_PORT env variable, you can specify the port in the docker-compose.yml file to test the app locally.


## Running the unit tests
- You can execute the test cases by executing the below command.
```sh
python -m unittest unit-tests/api_test.py
```

_Note: Replace the **testurl** with the server ip & port you are running the app on._


## Deployment

*Assuming that you have a minikube cluster set up. Please follow the below steps to deploy the app to the cluster.*

- Run the script **deploy.sh** to deploy the app to the k8s cluster.

## Testing the API(s)

- `GET /configs`

```sh
curl http://$(minikube ip):$NODE_PORT/configs
```

- `POST /configs`

```sh
curl --location --request POST 'http://$(minikube ip):$NODE_PORT/configs' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "datacenter-1",
        "metadata": {
            "monitoring": {
                "enabled": "false"
            },
            "limits": {
                "cpu": {
                    "enabled": "true",
                    "value": "500m"
                }
            }
        }
    }'
```

- `GET /configs/{name}`

```sh
curl --location --request GET 'http://$(minikube ip):$NODE_PORT/configs/datacenter-1'
```

- `PUT //configs/{name}`

```sh
curl --location --request PUT 'http://$(minikube ip):$NODE_PORT/configs/datacenter-1' \
--header 'Content-Type: application/json' \
--data-raw '{
            "name": "datacenter-1",
            "metadata": {
                "monitoring": {
                    "enabled": "true"
                },
                "limits": {
                    "cpu": {
                        "enabled": "false",
                        "value": "300m"
                    }
                }
            }
        }'
```

- `DELETE /configs/{name}`

```sh
curl --location --request DELETE 'http://$(minikube ip):$NODE_PORT/configs/datacenter-2'
```

- `Query /search?metadata.key=value`

```sh
curl --location --request GET 'http://$(minikube ip):$NODE_PORT/search?metadata.monitoring.enabled=true'
```



