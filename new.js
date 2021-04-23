import Tab from "./js/Tab.js";
import Iframe from "./js/Iframe.js";

const btnAddIframe = document.querySelector(".tab-add");
const contenedorTabs = document.querySelector(".tabs");
const contenedorIframes = document.querySelector(".iframe-capa");

let openedTabs = [];
function saveOpenTabs() {
	let arr = [];
	document.querySelectorAll(".tab-btn i").forEach((el) => {
		arr.push(el.textContent);
	});
	localStorage.setItem("open-tabs", JSON.stringify(arr));
}


function addNewTab(e, link) {
	let tabs = document.querySelectorAll(".tab-btn");
	let lastId;
	if (tabs.length >= 1)
		lastId = Number(tabs[tabs.length - 1].getAttribute("data-id")) + 1;
	else lastId = 1;
	let url = link || "http://" + location.host + "/newpage.html";
	let miIframe = new Iframe(lastId, url);
	let tab = new Tab(lastId, url);
	contenedorIframes.appendChild(miIframe.iframe);
	contenedorTabs.insertBefore(tab.btnClose, btnAddIframe);
	openedTabs.push({
		id: lastId,
		tab,
		miIframe,
	});
	// Guardando en local storage los que quedan
	saveOpenTabs();
	// Guardando en local storage el historial
	let historyTabs = JSON.parse(localStorage.getItem("history-tabs")) || [];
	historyTabs.push(url);
	let set = new Set(historyTabs);
	historyTabs = Array.from(set);
	if (historyTabs.length > 10) historyTabs.shift();
	localStorage.setItem("history-tabs", JSON.stringify(historyTabs));
}
btnAddIframe.addEventListener("click", addNewTab);


// Eventos de un Tab button
document.addEventListener("click", (e) => {
	let tg = e.target;
	if (tg.matches(".tab-btn") || tg.matches(".tab-btn i")) {
		let id =
			tg.getAttribute("data-id") || tg.parentNode.getAttribute("data-id");
		let text;
		if(tg.matches('.tab-btn')){
			text = tg.querySelector('i').textContent;
		} else {
			text = tg.textContent;
		}
		openedTabs.filter((process) => process.id == id)[0].tab.onclick(text);
	}

	if (tg.matches(".tab-btn span")) {
		let id = Number(tg.parentNode.getAttribute("data-id"));
		openedTabs.filter((t) => t.id === id)[0].tab.delete();
		openedTabs = openedTabs.filter((t) => t.id !== id);

		saveOpenTabs();
	}
});

// Agregar iframes al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
	let tabsGuardados = JSON.parse(localStorage.getItem("open-tabs")) || [];
	if (tabsGuardados.length < 1) {
		tabsGuardados = [];
	}
	tabsGuardados.forEach((link) => addNewTab(null, link));
});
