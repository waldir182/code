export default class Iframe {
    constructor(id, src) {
        this.visible = false;
        this.iframe = document.createElement("iframe");
        this.iframe.id = "iframe-" + id;
        this.iframe.src = src;
        this.iframe.name = "iframe-" + id;
        this.iframe.classList.add("iframe", "active")
    }
}


