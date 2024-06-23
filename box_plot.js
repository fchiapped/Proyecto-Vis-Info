const WIDHT = 1000;
const HEIGHT = 400;
MARGIN = 50;
TOP_MARGIN = 10;

function drawBoxPlot(dataKey, svg) {
    return d3.csv("DraftCombine.csv").then(function(data) {        
        const margin = { top: TOP_MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN };
        const width = WIDHT - margin.left - margin.right;
        const height = HEIGHT - margin.top - margin.bottom;

        const svgGroup = svg.append("g")
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
            .domain([d3.min(data, d => d.height), d3.max(data, d => d.wingspan)])
            .nice()
            .range([height, 0]);

        // Eje X
        svgGroup.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("class", "axis-label")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Eje Y
        svgGroup.append("g")
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
            const values = data.filter(d => d.position === position).map(d => d[dataKey]);
            const stats = calculateStats(values);
            const outliers = values.filter(v => v < stats.lowerFence || v > stats.upperFence);
            return { position, stats, outliers };
        });

        // Crear contenedores para cada posición
        const boxplots = svgGroup.selectAll(".boxplot")
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
        svgGroup.selectAll(".box")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .on("mouseover", function(event, d) {
                // Mostrar tooltip al pasar el mouse sobre la caja
                const stats = d.stats;
                const tooltipText = `
                    <span style="font-weight: bold; color: black;">${dataKey === 'height' ? 'Altura' : 'Envergadura'}</span><br>
                    <hr>                    
                    Posición: ${d.position}<br>
                    Q1: ${(stats.q1.toFixed(0)) / 100} mts.<br>
                    Mediana: ${stats.median.toFixed(0) / 100} mts.<br>
                    Q3: ${stats.q3.toFixed(0) / 100} mts.<br>
                    Mínimo: ${stats.min.toFixed(0) / 100} mts.<br>
                    Máximo: ${stats.max.toFixed(0) / 100} mts.<br>
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
        svgGroup.selectAll(".outlier")
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
                tooltip.style("visibility", "hidden");
            });

        return Promise.resolve(svg.node());
    });
}

function altura() {
    const SVG1 = d3.create("svg")
        .attr("width", WIDHT)
        .attr("height", HEIGHT);
    return drawBoxPlot('height', SVG1);
}

function wingspan() {
    const SVG2 = d3.create("svg")
        .attr("width", WIDHT)
        .attr("height", HEIGHT);
    return drawBoxPlot('wingspan', SVG2);
}

let alturaSVG, wingspanSVG;

function renderSelectedSVG(selectedSVG, opacity) {
    const svgContainer = d3.select("#vis-3").select("svg");

    svgContainer.node().appendChild(selectedSVG);

    d3.select(selectedSVG).style("opacity", opacity);
}

document.addEventListener('DOMContentLoaded', function() {
    const alturaButton = document.getElementById('alturaButton');
    const wingspanButton = document.getElementById('wingspanButton');
    const alturavsenvergadura = document.getElementById('AlturavsEnvergadura');
    const envergaduravsaltura = document.getElementById('EnvergaduravsAltura');

    alturaButton.addEventListener('click', function() {
        renderSelectedSVG(alturaSVG, 1);
        d3.select(wingspanSVG).style("opacity", 0);
    });

    wingspanButton.addEventListener('click', function() {
        renderSelectedSVG(wingspanSVG, 1);
        d3.select(alturaSVG).style("opacity", 0);
    });

    alturavsenvergadura.addEventListener('click', function() {
        renderSelectedSVG(alturaSVG, 1);
        d3.select(wingspanSVG).style("opacity", 0.2);
    });

    envergaduravsaltura.addEventListener('click', function() {
        renderSelectedSVG(wingspanSVG, 1);
        d3.select(alturaSVG).style("opacity", 0.2);
    });


    Promise.all([altura(), wingspan()]).then(function([svg1, svg2]) {
        alturaSVG = svg1;
        wingspanSVG = svg2;

        renderSelectedSVG(alturaSVG, 1);
    });
});
