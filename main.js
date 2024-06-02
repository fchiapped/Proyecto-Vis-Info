// El archivi incluye reproducciónn de música. 
// Al final se explica como apagarlo por si acaso 😅
const SVG1 = d3.select("#vis-1").append("svg");
const SVG2 = d3.select("#vis-2").append("svg");
const SVG3 = d3.select("#vis-3").append("svg");

// Editar tamaños como estime conveniente
const WIDTH_VIS_1 = 800;
const HEIGHT_VIS_1 = 350;

const WIDTH_VIS_2 = 1000;
const HEIGHT_VIS_2 = 400;

const WIDTH_VIS_3 = 100;
const HEIGHT_VIS_3 = 400;

SVG1.attr("width", WIDTH_VIS_1).attr("height", HEIGHT_VIS_1);
SVG2.attr("width", WIDTH_VIS_2).attr("height", HEIGHT_VIS_2);
SVG3.attr("width", WIDTH_VIS_3).attr("height", HEIGHT_VIS_3);

const imgWidth = 250; // Ajusta el ancho de la imagen
const imgHeight = 400; // Ajusta la altura de la imagen




function vis1() {
    function clearVisualization() {
        SVG1.selectAll("*").remove();
        SVG1.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", WIDTH_VIS_1)
        .attr("height", HEIGHT_VIS_1)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5);
    }

    function updateLegend(type) {
        const legendContent = document.getElementById('legend-content');
        let content = '';

        switch (type) {
            case 'height':
                content = "La altura de una persona se mide desde la planta de los pies hasta la parte superior de la cabeza. Esta visualización comparará la altura de un jugador promedio de la NBA con la de una persona común."
                break;
            case 'wingspan':
                content = "La envergadura de una persona se mide desde la punta de un dedo medio hasta la punta del otro dedo medio con los brazos extendidos. Esta visualización comparará la envergadura de un jugador promedio de la NBA con la de una persona común."
                break;
            case 'widthHandInches':
                content = 'El tamaño de la mano se mide desde la base de la palma hasta la punta del dedo medio. Esta visualización comparará el tamaño de la mano de un jugador promedio de la NBA con el de una persona común.';
                break;
        }

        legendContent.textContent = content;
    }

    function altura() {
        clearVisualization();


        const image = SVG1.append("image")
            .attr("xlink:href", "height.jpeg")
            .attr("x", (100))
            .attr("y", (0))
            .attr("width", imgWidth)
            .attr("height", imgHeight);
    }

    function envergadura() {
        clearVisualization();

        const image = SVG1.append("image")
            .attr("xlink:href", "wingspan.jpg")
            .attr("x", (100))
            .attr("y", (0))
            .attr("width", imgWidth)
            .attr("height", imgHeight);
    }

    function mano() {
        clearVisualization();
        altura();
    }

    // Función para actualizar la visualización
    function updateVisualization(type) {
        updateLegend(type);
        switch (type) {
            case 'height':
                altura();
                break;
            case 'wingspan':
                envergadura();
                break;
            case 'widthHandInches':
                mano();
                break;

        }
    }

    // Event listeners para los botones
    document.getElementById('height').addEventListener('click', function() {
        updateVisualization('height');
    });

    document.getElementById('wingspan').addEventListener('click', function() {
        updateVisualization('wingspan');
    });

    document.getElementById('widthHandInches').addEventListener('click', function() {
        updateVisualization('widthHandInches');
    });

    updateVisualization('height');


}

document.addEventListener('DOMContentLoaded', function() {
    vis1();
});
