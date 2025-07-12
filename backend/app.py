from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)


DATA_DIR = '/var/data'
TASKS_FILE = os.path.join(DATA_DIR, 'tasks.json')


os.makedirs(DATA_DIR, exist_ok=True)


def load_tasks():
    if not os.path.exists(TASKS_FILE):
        return []
    try:
        with open(TASKS_FILE, 'r') as f:
            content = f.read()
            if not content:
                return []
            return json.loads(content)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=4)


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(load_tasks())


@app.route('/tasks', methods=['POST'])
def add_task():
    tasks = load_tasks()
    data = request.json

    new_task = {
        'id': str(uuid.uuid4()),
        'title': data.get('title'),
        'priority': data.get('priority'),
        'createdAt': data.get('createdAt'),
        'completed': False
    }
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201


@app.route('/tasks/<task_id>', methods=['PATCH'])
def update_task(task_id):
    tasks = load_tasks()
    task_to_update = None
    for task in tasks:
        if str(task['id']) == str(task_id):
            task_to_update = task
            break

    if task_to_update:
        data = request.json
        for key, value in data.items():
            if key in task_to_update:
                task_to_update[key] = value

        task_to_update['createdAt'] = datetime.now().isoformat()

        save_tasks(tasks)
        return jsonify(task_to_update)

    return jsonify({'error': 'Tarefa não encontrada'}), 404


@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = load_tasks()
    tasks_before = len(tasks)

    tasks = [t for t in tasks if str(t['id']) != str(task_id)]

    if len(tasks) < tasks_before:
        save_tasks(tasks)
        return jsonify({'message': 'Tarefa deletada'})

    return jsonify({'error': 'Tarefa não encontrada'}), 404


if __name__ == '__main__':
    app.run(debug=False)
