interface TodoItem {
  task: string;
}

let todos: TodoItem[] = [];

function addTodo(): void {
  const input = document.getElementById("taskInput") as HTMLInputElement;
  const task = input.value.trim();
   todos.push({ task });
  renderTodos();
  input.value = "";
}

function editTodo(index: number): void {
  const newTask = prompt("Edit your task:", todos[index].task);
  if (newTask === null) return; 
  todos[index].task = newTask.trim();
  renderTodos();
}

function deleteTodo(index: number): void {
  todos.splice(index, 1);
  renderTodos();
}

function renderTodos(): void {
  const list = document.getElementById("todoList") as HTMLUListElement;
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = todo.task;
    li.appendChild(taskText);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";
    editBtn.onclick = () => editTodo(index);
    li.appendChild(editBtn);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "5px";
    delBtn.onclick = () => deleteTodo(index);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
