from flask import Flask
import json

app = Flask(__name__)
clients = {'clients': ["Google", "Facebook", "Amazon", "Micrsoft", "Tesla", "Sonic", "MySense.ai", "Delta"]}

@app.route('/clients', methods=['GET'])
def getClients():
    return json.dumps(clients)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8087, debug=True)
