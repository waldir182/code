// Toggle al zona de salida
const closeZone = document.querySelector(".close-zone");
const outZone = document.querySelector(".output-zone");
let ts = 0,
	tm = 0,
	te = 0,
	sw = screen.width;

document.addEventListener("touchstart", (e) => {
	ts = e.touches[0].screenX;
});
document.addEventListener("touchmove", (e) => {
	if (ts > sw - 8) {
		tm = e.touches[0].screenX;
		let sob = sw - tm;
		let dis = 460 - sob;
		if (dis < 0) return;
		outZone.style.right = -dis + "px";
		closeZone.classList.add("active");
		document.getElementById("toggle-outzone").classList.add("hide");
	}
});
document.addEventListener("touchend", (e) => {
	te = e.changedTouches[0].screenX;
	if (ts > sw - 1 && te < sw - 5) {
		outZone.style.right = 0;
		closeZone.classList.add("active");
	} else {
		if (ts > sw - 8) {
			outZone.style.right = -460 + "px";
			closeZone.classList.remove("active");
			document.getElementById("toggle-outzone").classList.remove("hide");
		}
	}
	ts = 0;
	tm = 0;
	te = 0;
});

document.addEventListener("click", (e) => {
	if (e.target.matches(".close-zone")) {
		outZone.style.right = -460 + "px";
		closeZone.classList.toggle("active");
		document.getElementById("toggle-outzone").classList.remove("hide");
	}
	if (e.target.matches("#reload-cs") || e.target.matches("#reload-cs *")) {
		let codeServer = document.getElementById("code-server");
		codeServer.src = codeServer.src;
	}
	if (e.target.matches("#btn-theme") || e.target.matches("#btn-theme *")) {
		outZone.classList.toggle("light");
		if (outZone.classList[1] == "light") {
			localStorage.setItem("live-theme", "light");
		} else {
			localStorage.setItem("live-theme", "dark");
		}
	}
	if (e.target.matches("#toggle-outzone")) {
		outZone.style.right = 0;
		e.target.classList.add("hide");
		closeZone.classList.add("active");
	}
});

// Funciones de Botones
const iframeLive = document.querySelector(".iframe-live");
const input = document.getElementById("outLink");

const btnPlayLive = document.getElementById("play-live");
const btnBrowser = document.getElementById("browser");

function redirect(e, url) {
	let btnActive = document.querySelector(".tab-btn.active");
	let iframeActive = document.getElementById(
		`iframe-${btnActive.getAttribute("data-id")}`
	);
	iframeActive.src = url || iframeActive.src;
	input.value = url || iframeActive.src;
	btnActive.querySelector("i").textContent = url || iframeActive.src;
}

btnPlayLive.addEventListener("click", (e) => {
	// let url = "http://localhost:8000";
	// redirect(e, url);
	let iframe = document.querySelector('.iframe.active');
	iframe.contentWindow.postMessage("Hola desde 8080", "http://localhost:8080");
	console.log("Enviando desde 8080");
});
btnBrowser.addEventListener("click", (e) => {
	let url = "https://www.bing.com";
	redirect(e, url);
});

const btnReload = document.getElementById("reloader");
btnReload.addEventListener("click", (e) => {
	redirect(e);
});

input.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		redirect(e, e.target.value);
		let arr = [];
		document.querySelectorAll(".tab-btn i").forEach((el) => {
			arr.push(el.textContent);
		});
		localStorage.setItem("open-tabs", JSON.stringify(arr));
	}
});

//Cargar tema
document.addEventListener("DOMContentLoaded", e => {
	let tema = localStorage.getItem("live-theme");
	if(tema !== null) {
		if(tema == "light") outZone.classList.add('light');
	}
})
