from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- Configuração do Banco de Dados ---
# Pega a URL do banco de dados da variável de ambiente que vamos configurar na Render
database_url = os.environ.get('DATABASE_URL')
# A Render usa 'postgres://', mas SQLAlchemy prefere 'postgresql://'
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Modelo da Tabela de Tarefas ---
# Define como a tabela de tarefas será estruturada no banco de dados


class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True,
                   default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "priority": self.priority,
            "createdAt": self.createdAt.isoformat(),
            "completed": self.completed
        }


# Cria a tabela no banco de dados se ela não existir
with app.app_context():
    db.create_all()

# --- Rotas da API (Agora usando o Banco de Dados) ---


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(
        title=data.get('title'),
        priority=data.get('priority'),
        # O campo createdAt enviado pelo frontend será usado aqui
        createdAt=datetime.fromisoformat(
            data.get('createdAt').replace('Z', '+00:00')),
        completed=False
    )
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

    # Atualiza a data a cada modificação
    task.createdAt = datetime.utcnow()

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
