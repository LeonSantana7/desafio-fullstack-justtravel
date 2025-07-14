from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import uuid
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

database_url = os.environ.get('DATABASE_URL')
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime(
        timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    completed = db.Column(db.Boolean, nullable=False, default=False)

    startTime = db.Column(db.DateTime(timezone=True), nullable=True)
    endTime = db.Column(db.DateTime(timezone=True), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "priority": self.priority,
            "createdAt": self.createdAt.strftime('%Y-%m-%d'),
            "completed": self.completed,
            "startTime": self.startTime.isoformat().replace('+00:00', 'Z') if self.startTime else None,
            "endTime": self.endTime.isoformat().replace('+00:00', 'Z') if self.endTime else None
        }


with app.app_context():
    db.create_all()


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.createdAt.desc()).all()
    return jsonify([task.to_dict() for task in tasks])


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(
        title=data.get('title'),
        priority=data.get('priority'),
        completed=False
    )

    if data.get('startTime'):
        new_task.startTime = datetime.fromisoformat(
            data.get('startTime').replace('Z', '+00:00'))
    if data.get('endTime'):
        new_task.endTime = datetime.fromisoformat(
            data.get('endTime').replace('Z', '+00:00'))

    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201


@app.route('/tasks/<task_id>', methods=['PATCH'])
def update_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    data = request.json
    if 'title' in data:
        task.title = data['title']
    if 'completed' in data:
        task.completed = data['completed']
    if 'startTime' in data:
        task.startTime = datetime.fromisoformat(data.get('startTime').replace(
            'Z', '+00:00')) if data.get('startTime') else None
    if 'endTime' in data:
        task.endTime = datetime.fromisoformat(data.get('endTime').replace(
            'Z', '+00:00')) if data.get('endTime') else None

    task.createdAt = datetime.now(timezone.utc)

    db.session.commit()
    return jsonify(task.to_dict())


@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = db.session.get(Task, task_id)
    if not task:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Tarefa deletada'})


@app.route('/')
def index():
    return "API de Tarefas com Banco de Dados está online!"


if __name__ == '__main__':
    app.run(debug=False)
