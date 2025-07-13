# Documentação da API - Minha Lista de Tarefas

**URL Base:** `https://desafio-fullstack-justtravel-api.onrender.com`

---

## Tarefas

### GET *(/tasks)*

Retorna uma lista com todas as tarefas existentes.

**Entrada**

```
Nenhum corpo de requisição é necessário.
```

**Saída (200)**

```typescript
[
  {
    "id": "string",
    "title": "string",
    "priority": "string", // "low", "medium", ou "high"
    "createdAt": "string", // Formato ISO 8601
    "completed": "boolean"
  }
]
```

---

### POST *(/tasks)*

Cria uma nova tarefa no banco de dados.

**Entrada**

```typescript
{
  "title": "string",
  "priority": "string", // "low", "medium", ou "high"
  "createdAt": "string" // Formato ISO 8601
}
```

**Saída (201)**

```typescript
{
  "id": "string",
  "title": "string",
  "priority": "string",
  "createdAt": "string",
  "completed": "boolean" // Sempre será 'false' na criação
}
```

---

### PATCH *(/tasks/:task\_id)*

Atualiza parcialmente uma tarefa existente. A data de modificação é atualizada automaticamente.

**Entrada**

```typescript
// Envie apenas os campos que deseja alterar.
// Exemplo 1: Marcar como concluída
{
  "completed": boolean
}

// Exemplo 2: Alterar o título
{
  "title": "string"
}
```

**Saída (200)**

```typescript
{
  "id": "string",
  "title": "string",
  "priority": "string",
  "createdAt": "string", // Data da última modificação
  "completed": "boolean"
}
```

**Tarefa não encontrada (404)**

```typescript
{
    "error": "Tarefa não encontrada"
}
```

---

### DELETE *(/tasks/:task\_id)*

Remove permanentemente uma tarefa do banco de dados.

**Entrada**

```
Nenhum corpo de requisição é necessário.
```

**Saída (200)**

```typescript
{
    "message": "Tarefa deletada"
}
```

**Tarefa não encontrada (404)**

```typescript
{
    "error": "Tarefa não encontrada"
}
```