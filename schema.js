// schema.js – Gestructureerde en verbeterde versie

const App = {
    canvas: document.getElementById("schemaCanvas"),
    ctx: null,
    elements: [],
    wires: [],
    scale: 1,
    offset: { x: 0, y: 0 },
    selectedElement: null,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    mode: "select",

    init() {
        this.ctx = this.canvas.getContext("2d");
        this.setupEvents();
        this.startRenderLoop();
    },

    setupEvents() {
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("wheel", (e) => this.onWheel(e));
    },

    getWorldPos(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left - this.offset.x) / this.scale,
            y: (evt.clientY - rect.top - this.offset.y) / this.scale,
        };
    },

    onMouseDown(evt) {
        const pos = this.getWorldPos(evt);
        this.selectedElement = this.getElementAt(pos);
        if (this.selectedElement) {
            this.isDragging = true;
            this.dragStart = pos;
        }
    },

    onMouseMove(evt) {
        const pos = this.getWorldPos(evt);
        if (this.isDragging && this.selectedElement) {
            const dx = pos.x - this.dragStart.x;
            const dy = pos.y - this.dragStart.y;
            this.selectedElement.x += dx;
            this.selectedElement.y += dy;
            this.dragStart = pos;
        }
    },

    onMouseUp() {
        this.isDragging = false;
        this.selectedElement = null;
    },

    onWheel(evt) {
        evt.preventDefault();
        const zoom = evt.deltaY < 0 ? 1.1 : 0.9;
        const rect = this.canvas.getBoundingClientRect();
        const mx = evt.clientX - rect.left;
        const my = evt.clientY - rect.top;

        const wx = (mx - this.offset.x) / this.scale;
        const wy = (my - this.offset.y) / this.scale;

        this.scale *= zoom;
        this.scale = Math.max(0.25, Math.min(4, this.scale));

        this.offset.x = mx - wx * this.scale;
        this.offset.y = my - wy * this.scale;
    },

    getElementAt(pos) {
        return this.elements.find(
            el => Math.abs(pos.x - el.x) < 20 && Math.abs(pos.y - el.y) < 20
        );
    },

    drawGrid() {
        const ctx = this.ctx;
        const step = 20 * this.scale;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.save();
        ctx.clearRect(0, 0, w, h);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.scale(this.scale, this.scale);

        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1 / this.scale;
        for (let x = -this.offset.x / this.scale % 20; x < w / this.scale; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h / this.scale);
            ctx.stroke();
        }
        for (let y = -this.offset.y / this.scale % 20; y < h / this.scale; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w / this.scale, y);
            ctx.stroke();
        }

        ctx.restore();
    },

    drawElements() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.offset.x, this.offset.y);
        ctx.scale(this.scale, this.scale);

        for (const el of this.elements) {
            ctx.fillStyle = "#000";
            ctx.fillRect(el.x - 10, el.y - 10, 20, 20);
        }

        ctx.restore();
    },

    render() {
        this.drawGrid();
        this.drawElements();
    },

    startRenderLoop() {
        const loop = () => {
            this.render();
            requestAnimationFrame(loop);
        };
        loop();
    },

    addElement(x, y) {
        this.elements.push({ x, y, id: "el_" + Date.now() });
    }
};

window.addEventListener("DOMContentLoaded", () => App.init());
