const state = {
  taskList: [],
};

// DOM - document Object

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({ id, title, description, type, url }) => `
<div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
  <div class='card shdow-sm task__card'>
    <div class='card-header d-flex justify-content-end task__card__header'>
      <button type='button' class='btn btn-outline-info mr-2' name=${id}>
        <i class='fas fa-pencil-alt' name=${id}></i>
      </button>

      <button type='button' class='btn btn-outline-danger mr-2' name=${id}>
        <i class='fas fa-trash-alt' name=${id}></i>
      </button>
    </div>
    <div class='card-body'>
      ${url ? `<img
        width='100%'
        src=${url}
        alt='card image cap'
        class='card-image-top md-3 rounded-lg'
      />`
    :

    `<img
        width="100%"
        src="https://th.bing.com/th/id/OIP.MeQh5hhnjVOF84LECnV-7wHaGL?w=189&h=176&c=7&r=0&o=5&dpr=2&pid=1.7"
        alt="card image cap"
        class="img-fluid place__holder__image mb-3"
        />`
  }
      <h4 class='task__card__title'>${title}</h4>
      <p class='description trim-3-lines text-muted' data-gram_editor='false'>
        ${description}
      </p>
      <div class='tags text-white d-flex flex-wrap'>
        <span class='badge bg-primary m-1'>${type}</span>
      </div>
    </div>
    <div class='card-footer'>
      <button
        type='button'
        class='btn btn-outline-primary float-right'
        data-bs-toggle='modal'
        data-bs-target='#showTask'
        id=${id}
        onclick='openTask.apply(this, arguments)'
      >Open Task</button>
    </div>
  </div>
</div>

`;

const htmlModalContent = ({ id, title, description, url }) => {
  const data = new date(parseInt(id));
  return `
    <div id="${id}">
    ${url ? `<img
    width="100%"
    src="${url}"
    alt="card image cap"
    class="img-fluid place__holder__image mb-3"
    />`

      :

      `<img
    width="100%"
    src="https://th.bing.com/th/id/OIP.MeQh5hhnjVOF84LECnV-7wHaGL?w=189&h=176&c=7&r=0&o=5&dpr=2&pid=1.7"
    alt="card image cap"
    class="img-fluid place__holder__image mb-3"
    />`
    }
    <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p class="lead">${description}</p>
    </div>
      `;
};

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify({
    tasks: state.taskList,
  })
  );
};

const LoadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML('beforeend', htmlTaskContent(cardDate));
  });
};

const handleSubmit = () => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    type: document.getElementById("tags").value,

  };

  if (input.title === '' || input.description === '' || input.type === '') {
    return
  }

  taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
    ...input,
    id,
  })
  );

  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
}