const WIDHT = 1000;
const HEIGHT = 400;
MARGIN = 50;

function altura() {
    return d3.json("filtered_data.json").then(function(data) {    // Configuración del SVG
    const SVG1 = d3.create("svg")
        .attr("width", WIDHT)
        .attr("height", HEIGHT);


    const margin = { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN };
    const width = WIDHT - margin.left - margin.right;
    const height = HEIGHT - margin.top - margin.bottom;

    const svg = SVG1.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const BANDWIDTH = 35;

    const positions = ['PG', "PG-SG", "SG-PG", 'SG', "SG-SF", "SF-SG", 'SF', "SF-PF", "PF-SF", 'PF', "PF-C", "C-PF", 'C'];

    // Crear escalas
    const x = d3.scaleBand()
        .range([0, width])
        .domain(positions)
        .paddingInner(1)
        .paddingOuter(0.5);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.height), d3.max(data, d => d.height)])
        .nice()
        .range([height, 0]);

    // Eje X
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("class", "axis-label")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Eje Y
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("class", "axis-label");

    // Función para calcular estadísticas de cada grupo
    function calculateStats(d) {
        const q1 = d3.quantile(d, 0.25);
        const median = d3.quantile(d, 0.5);
        const q3 = d3.quantile(d, 0.75);
        const interQuantileRange = q3 - q1;
        const lowerFence = q1 - 1.5 * interQuantileRange;
        const upperFence = q3 + 1.5 * interQuantileRange;
        const min = Math.max(d3.min(d), lowerFence);
        const max = Math.min(d3.max(d), upperFence);
        return { q1, median, q3, interQuantileRange, lowerFence, upperFence, min, max };
    }

    // Pre-calcular estadísticas para cada grupo
    const statsByPosition = positions.map(position => {
        const heights = data.filter(d => d.position === position).map(d => d.height);
        const stats = calculateStats(heights);
        const outliers = heights.filter(h => h < stats.min || h > stats.max);
        return { position, stats, outliers };
    });

    // Crear contenedores para cada posición
    const boxplots = svg.selectAll(".boxplot")
        .data(statsByPosition)
        .enter().append("g")
        .attr("class", "boxplot")
        .attr("transform", d => `translate(${x(d.position)}, 0)`);

    // Caja
    boxplots.append("rect")
        .attr("class", "box")
        .attr("x", -BANDWIDTH / 2)
        .attr("y", d => y(d.stats.q3))
        .attr("height", d => y(d.stats.q1) - y(d.stats.q3))
        .attr("width", BANDWIDTH)
        .attr("fill", d => {
            // Colores distintos para cada posición
            const colorScale = d3.scaleOrdinal()
                .domain(positions)
                .range(d3.schemeCategory10);
            return colorScale(d.position);
        });

    // Mediana
    boxplots.append("line")
        .attr("class", "median")
        .attr("x1", -BANDWIDTH / 2)
        .attr("x2", BANDWIDTH / 2)
        .attr("y1", d => y(d.stats.median))
        .attr("y2", d => y(d.stats.median))
        .attr("stroke", "black");

    // Lower fence
    boxplots.append("line")
        .attr("class", "whisker")
        .attr("x1", -BANDWIDTH / 2)
        .attr("x2", BANDWIDTH / 2)
        .attr("y1", d => y(d.stats.lowerFence))
        .attr("y2", d => y(d.stats.lowerFence))
        .attr("stroke", "black");

    // Upper fence
    boxplots.append("line")
        .attr("class", "whisker")
        .attr("x1", -BANDWIDTH / 2)
        .attr("x2", BANDWIDTH / 2)
        .attr("y1", d => y(d.stats.upperFence))
        .attr("y2", d => y(d.stats.upperFence))
        .attr("stroke", "black");

    // Whiskers
    boxplots.append("line")
        .attr("class", "whisker")
        .attr("x", 0)
        .attr("y1", d => y(d.stats.lowerFence))
        .attr("y2", d => y(d.stats.q1))
        .attr("stroke", "black");

    boxplots.append("line")
        .attr("class", "whisker")
        .attr("x", 0)
        .attr("y1", d => y(d.stats.q3))
        .attr("y2", d => y(d.stats.upperFence))
        .attr("stroke", "black");

    // Outliers
    boxplots.selectAll(".outlier")
        .data(d => d.outliers.map(outlier => ({ position: d.position, outlier })))
        .enter().append("circle")
        .attr("class", "outlier")
        .attr("cx", 0)
        .attr("cy", d => y(d.outlier))
        .attr("r", 3)
        .attr("fill", "red");

    // Tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    // Estilo para las cajas
    svg.selectAll(".box")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .on("mouseover", function(event, d) {
        // Mostrar tooltip al pasar el mouse sobre la caja
        const stats = d.stats;
        const tooltipText = `
            Posición: ${d.position}<br>
            Q1: ${stats.q1.toFixed(2)}<br>
            Mediana: ${stats.median.toFixed(2)}<br>
            Q3: ${stats.q3.toFixed(2)}<br>
            Mínimo: ${stats.min.toFixed(2)}<br>
            Máximo: ${stats.max.toFixed(2)}<br>
        `;
        tooltip.html(tooltipText)
            .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        // Ocultar tooltip al retirar el mouse de la caja
        tooltip.style("visibility", "hidden");
    });

// Estilo para los outliers
svg.selectAll(".outlier")
    .on("mouseover", function(event, d) {
        // Mostrar tooltip al pasar el mouse sobre el outlier
        const tooltipText = `
            Posición: ${d.position}<br>
            Outlier: ${d.outlier.toFixed(2)}
        `;
        tooltip.html(tooltipText)
            .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        // Ocultar tooltip al retirar el mouse del outlier
        tooltip.style("visibility", "hidden");
    });
    return SVG1.node(); // Devolver el nodo SVG
});
}

function wingspan() {
    return d3.json("filtered_data.json").then(function(data) {
        const SVG2 = d3.create("svg")
            .attr("width", WIDHT)
            .attr("height", HEIGHT);

        const margin = { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN };
        const width = WIDHT - margin.left - margin.right;
        const height = HEIGHT - margin.top - margin.bottom;

        const svg = SVG2.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const BANDWIDTH = 35;
        const positions = ['PG', "PG-SG", "SG-PG", 'SG', "SG-SF", "SF-SG", 'SF', "SF-PF", "PF-SF", 'PF', "PF-C", "C-PF", 'C'];

        // Crear escalas
        const x = d3.scaleBand()
            .range([0, width])
            .domain(positions)
            .paddingInner(1)
            .paddingOuter(0.5);

        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.wingspan), d3.max(data, d => d.wingspan)])
            .nice()
            .range([height, 0]);



        // Función para calcular estadísticas de cada grupo
        function calculateStats(d) {
            const q1 = d3.quantile(d, 0.25);
            const median = d3.quantile(d, 0.5);
            const q3 = d3.quantile(d, 0.75);
            const interQuantileRange = q3 - q1;
            const lowerFence = q1 - 1.5 * interQuantileRange;
            const upperFence = q3 + 1.5 * interQuantileRange;
            const min = Math.max(d3.min(d), lowerFence);
            const max = Math.min(d3.max(d), upperFence);
            return { q1, median, q3, interQuantileRange, lowerFence, upperFence, min, max };
        }

        // Pre-calcular estadísticas para cada grupo
        const statsByPosition = positions.map(position => {
            const times = data.filter(d => d.position === position).map(d => d.wingspan);
            const stats = calculateStats(times);
            const outliers = times.filter(t => t < stats.lowerFence || t > stats.upperFence);
            return { position, stats, outliers };
        });

        // Crear contenedores para cada posición
        const boxplots = svg.selectAll(".boxplot")
            .data(statsByPosition)
            .enter().append("g")
            .attr("class", "boxplot")
            .attr("transform", d => `translate(${x(d.position)}, 0)`);

        // Caja
        boxplots.append("rect")
            .attr("class", "box")
            .attr("x", -BANDWIDTH / 2)
            .attr("y", d => y(d.stats.q3))
            .attr("height", d => y(d.stats.q1) - y(d.stats.q3))
            .attr("width", BANDWIDTH)
            .attr("fill", d => {
                // Colores distintos para cada posición
                const colorScale = d3.scaleOrdinal()
                    .domain(positions)
                    .range(d3.schemeCategory10);
                return colorScale(d.position);
            });

        // Mediana
        boxplots.append("line")
            .attr("class", "median")
            .attr("x1", -BANDWIDTH / 2)
            .attr("x2", BANDWIDTH / 2)
            .attr("y1", d => y(d.stats.median))
            .attr("y2", d => y(d.stats.median))
            .attr("stroke", "black");

        // Lower fence
        boxplots.append("line")
            .attr("class", "whisker")
            .attr("x1", -BANDWIDTH / 2)
            .attr("x2", BANDWIDTH / 2)
            .attr("y1", d => y(d.stats.min))
            .attr("y2", d => y(d.stats.min))
            .attr("stroke", "black");

        // Upper fence
        boxplots.append("line")
            .attr("class", "whisker")
            .attr("x1", -BANDWIDTH / 2)
            .attr("x2", BANDWIDTH / 2)
            .attr("y1", d => y(d.stats.max))
            .attr("y2", d => y(d.stats.max))
            .attr("stroke", "black");

        // Whiskers
        boxplots.append("line")
            .attr("class", "whisker")
            .attr("x", 0)
            .attr("y1", d => y(d.stats.min))
            .attr("y2", d => y(d.stats.q1))
            .attr("stroke", "black");

        boxplots.append("line")
            .attr("class", "whisker")
            .attr("x", 0)
            .attr("y1", d => y(d.stats.q3))
            .attr("y2", d => y(d.stats.max))
            .attr("stroke", "black");

        // Outliers
        boxplots.selectAll(".outlier")
            .data(d => d.outliers.map(outlier => ({ position: d.position, outlier })))
            .enter().append("circle")
            .attr("class", "outlier")
            .attr("cx", 0)
            .attr("cy", d => y(d.outlier))
            .attr("r", 3)
            .attr("fill", "red");

        // Tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px");

        // Estilo para las cajas
        svg.selectAll(".box")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .on("mouseover", function(event, d) {
                // Mostrar tooltip al pasar el mouse sobre la caja
                const stats = d.stats;
                const tooltipText = `
                    Posición: ${d.position}<br>
                    Q1: ${stats.q1.toFixed(2)}<br>
                    Mediana: ${stats.median.toFixed(2)}<br>
                    Q3: ${stats.q3.toFixed(2)}<br>
                    Mínimo: ${stats.min.toFixed(2)}<br>
                    Máximo: ${stats.max.toFixed(2)}<br>
                `;
                tooltip.html(tooltipText)
                    .style("visibility", "visible");
            })
            .on("mousemove", function(event) {
                tooltip.style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                // Ocultar tooltip al retirar el mouse de la caja
                tooltip.style("visibility", "hidden");
            });

        // Estilo para los outliers
        svg.selectAll(".outlier")
            .on("mouseover", function(event, d) {
                // Mostrar tooltip al pasar el mouse sobre el outlier
                const tooltipText = `
                    Posición: ${d.position}<br>
                    Outlier: ${d.outlier.toFixed(2)}
                `;
                tooltip.html(tooltipText)
                    .style("visibility", "visible");
            })
            .on("mousemove", function(event) {
                tooltip.style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                // Ocultar tooltip al retirar el mouse del outlier
                tooltip.style("visibility", "hidden");
            });
            return SVG2.node(); // Devolver el nodo SVG
    });
}

Promise.all([altura(), wingspan()]).then(function([svg1, svg2]) {
    // Seleccionar el contenedor SVG existente en el DOM
    const svgContainer = d3.select("#vis-3").select("svg");

    // Agregar SVG1 a svgContainer usando foreignObject
    svgContainer.append('foreignObject')
        .attr('width', WIDHT)
        .attr('height', HEIGHT)
        .html(() => svg1.outerHTML); 

    // Agregar SVG2 a svgContainer usando foreignObject
    svgContainer.append('foreignObject')
        .attr('width', WIDHT)
        .attr('height', HEIGHT)
        .html(() => svg2.outerHTML);
});
function renderSelectedSVG(selectedSVG) {
    const svgContainer = d3.select("#vis-3").select("svg");

    svgContainer.selectAll("*").remove(); // Limpiar contenido existente

    // Agregar SVG seleccionado al contenedor
    svgContainer.node().appendChild(selectedSVG.svg.node());

    // Ajustar opacidad según la selección
    svgContainer.selectAll("svg")
        .attr('opacity', selectedSVG.opacity);
}

// Evento al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
    // Crear botones de selección
    const alturaButton = document.createElement('button');
    alturaButton.textContent = 'Altura';
    alturaButton.addEventListener('click', function() {
        createAlturaSVG().then(renderSelectedSVG);
    });

    const wingspanButton = document.createElement('button');
    wingspanButton.textContent = 'Envergadura';
    wingspanButton.addEventListener('click', function() {
        createWingspanSVG().then(renderSelectedSVG);
    });

    // Agregar botones al DOM
    document.body.appendChild(alturaButton);
    document.body.appendChild(wingspanButton);
});

document.getElementById('alturaButton').addEventListener('click', function() {
    console.log("alo")
    updateVisualization('height');
});

document.getElementById('wingspanButton').addEventListener('click', function() {
    updateVisualization('wingspan');
});
