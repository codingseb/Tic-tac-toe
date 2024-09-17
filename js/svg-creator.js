function createSVGSymbol(type) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    if (type === 'X') {
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "20");
        line1.setAttribute("y1", "20");
        line1.setAttribute("x2", "80");
        line1.setAttribute("y2", "80");
        line1.classList.add("x-symbol");

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "80");
        line2.setAttribute("y1", "20");
        line2.setAttribute("x2", "20");
        line2.setAttribute("y2", "80");
        line2.classList.add("x-symbol");

        svg.appendChild(line1);
        svg.appendChild(line2);
    } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "30");
        circle.classList.add("o-symbol");

        svg.appendChild(circle);
    }

    return svg;
}