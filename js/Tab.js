class Tab {
	constructor(id, url) {
		this.id = id;
		this.visible = false;
		this.btnClose = document.createElement("button");
		this.btnClose.setAttribute("data-id", id);
		this.btnClose.innerHTML = `<i>${url}</i><span>×</span`;
		this.removeClassAll();
		this.btnClose.classList.add("tab-btn", "active");
		document.getElementById('outLink').value = url;
	}

	removeClassAll() {
		this.getAllTabs().forEach((el) => el.classList.remove("active"));
	}

	activeClass() {
		this.btnClose.classList.add("active");
		this.getIframe(this.id).classList.add("active");
	}

	onclick(text) {
		this.getAllIframes().forEach((el) => el.classList.remove("active"));
		this.getAllTabs().forEach((el) => el.classList.remove("active"));
		this.activeClass(text);
		document.getElementById('outLink').value = text;
	}

	getAllTabs() {
		return document.querySelectorAll(".tab-btn");
	}

	getAllIframes() {
		return document.querySelectorAll(".iframe");
	}

	getIframe(id) {
		return document.getElementById(`iframe-${id}`);
	}

	getTab(id) {
		return document.querySelector(`[data-id="${id}"]`);
	}

	delete() {
		this.removeClassAll();
		if (this.getAllTabs().length >= 2) {
			let hermano =
				this.getTab(this.id).previousElementSibling ||
				this.getTab(this.id).nextElementSibling;
			hermano.classList.add("active");
			document.getElementById('outLink').value = hermano.querySelector('i').textContent;
		} else if (this.getAllTabs().length === 1)
			document.querySelector(".tab-btn").classList.add("active");
		this.btnClose.remove();
		this.getIframe(this.id).remove();
	}
}

export default Tab;
