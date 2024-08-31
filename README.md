# ChitChat

**ChitChat** is a simple real-time chat application built with Flask, Redis, and Celery. It allows multiple users to communicate instantly in a shared chatroom environment. The project demonstrates the use of asynchronous task queues, message broadcasting, and real-time updates using Python's popular web and messaging frameworks.

## Features

- **Real-Time Messaging**: Messages are broadcast instantly to all users in the chatroom.
- **Asynchronous Task Processing**: Celery is used to handle message storage and broadcasting without blocking the main application.
- **Persistent Storage**: Redis is used for storing messages, ensuring they persist and can be retrieved later.
- **Multi-User Support**: Multiple users can join the chat, each with their own unique username.
- **Simple and Responsive UI**: A clean and responsive user interface built with HTML, Bootstrap, and JavaScript.

## Technologies Used

- **Flask**: A lightweight web framework for Python.
- **Redis**: An in-memory data structure store used as a message broker and for persistent storage.
- **Celery**: An asynchronous task queue/job queue based on distributed message passing.
- **Bootstrap**: A CSS framework used to create a responsive front-end.
- **JavaScript & jQuery**: For handling real-time updates and DOM manipulation.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/chitchat.git
    cd chitchat
    ```

2. **Set up a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Start Redis server**:
    ```bash
    redis-server
    ```

5. **Start Celery worker**:
    ```bash
    celery -A app.celery worker --loglevel=info
    ```

6. **Run the Flask application**:
    ```bash
    python3 app.py
    ```

7. **Access the application**:
    Open your browser and go to `http://127.0.0.1:5000/`.

## Usage

- Visit the homepage to join the chat.
- Enter your username and start messaging.
- Messages will be broadcast to all users in real-time.

