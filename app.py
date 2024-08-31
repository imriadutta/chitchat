from flask import Flask, render_template, request, jsonify
from redis import Redis
from celery import Celery
import json
from datetime import datetime


app = Flask(__name__)

# initialize Redis
redis = Redis(host="localhost", port=6379, db=0)

# initialize Celery
celery = Celery(
    app.name,
    broker="redis://localhost:6379/0",
)
celery.conf.update(app.config)


@celery.task
def store_message(channel, payload):
    message = json.dumps(payload)

    redis.publish(channel, message)
    redis.rpush(channel, message)


@app.route("/send_message", methods=["POST"])
def send_message():
    channel = request.form.get('channel', 'general')

    username = request.form.get('username')
    message = request.form.get('message')

    if not username:
        return jsonify({'status': 'No username entered.'})

    if not message:
        return jsonify({'status': 'No message entered.'})

    # create message payload
    payload = {
        'username': username,
        'message': message,
        'created_at': datetime.now().strftime('%d-%m-%Y %H:%M:%S'),
    }

    # send message through Celery
    store_message.delay(channel, payload)

    return jsonify({'status': 'Message sent!'})


@app.route("/get_messages/<channel>", methods=["GET"])
def get_messages(channel):
    messages = redis.lrange(channel, 0, -1)
    return jsonify([json.loads(msg) for msg in messages])


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
