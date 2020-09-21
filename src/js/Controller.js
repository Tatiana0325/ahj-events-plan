import Tasks from './Tasks';

export default class Controller {
	constructor() {
		this.taksValue = document.querySelector('.text-tasks');
    this.allTasksList = document.querySelector('.all-tasks-list');
		this.pinList = document.querySelector('.pinned-list');
		this.tasksNotFound = document.querySelector('.all-tasks').querySelector('.not-tasks');
		this.errorEnter = document.querySelector('.tasks').querySelector('.not-tasks');
		this.notPin = document.querySelector('.pinned').querySelector('.not-tasks');
		this.data = [];
    this.taskTag = 'li';
	}

	contain(data, search) {
		const clean = search.toLowerCase();
		return data.toLowerCase().includes(clean);
	}

	filterText(tasks, text) {
		return tasks.filter(item => this.contain(item.value, text));
	}

	buildTasksList(info, list, tag) {
		list.innerHTML = '';
		info.forEach((task, index) => {
			const el = document.createElement(tag);
			el.classList.add('task');
			el.innerHTML = `<span class="text">${task.value}</span>
											<div class="mark"></div>`;
	
			list.appendChild(el);
			const link = el.querySelector('.mark');
	
			link.addEventListener('click', (event) => {
				event.preventDefault();
	
				if (el.classList.contains('pinned')) {
					link.textContent = '';
					list.appendChild(el);
					this.data.push(task);
				} else {
					el.classList.add('pinned');
					link.textContent = 'V';
					this.pinList.appendChild(el);
					this.data.splice(index, 1);
				}
	
				if (this.pinList.children.length === 0) {
					this.notPin.classList.remove('vision');
				} else {
					this.notPin.classList.add('vision');
				}
			});
		});
	}

	tasksChange() {
		this.taksValue.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				if (this.taksValue.value !== '') {
					const task = new Tasks(this.taksValue.value);
					this.data.push(task);
					this.errorEnter.classList.add('vision');
					this.taksValue.value = '';
				} else {
					this.errorEnter.classList.remove('vision');
				}
				const filtered = this.filterText(this.data, this.taksValue.value);
				this.buildTasksList(filtered, this.allTasksList, this.taskTag);
				this.tasksNotFound.classList.add('vision');
			}
		});
		
		this.taksValue.addEventListener('input', () => {
			this.errorEnter.classList.add('vision');
			const filtered = this.filterText(this.data, this.taksValue.value);
			this.buildTasksList(filtered, this.allTasksList, this.taskTag);
		
			if (this.allTasksList.children.length === 0) {
				this.tasksNotFound.classList.remove('vision');
			} else {
				this.tasksNotFound.classList.add('vision');
			}
		});
	}
}
