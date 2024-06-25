function createCirclePacking(csvFilePath, svgSelector) {
    d3.csv(csvFilePath).then(function(csvData) {
      // Transformar datos CSV en estructura jerárquica
      const data = {
        "name": "NBA Players",
        "children": []
      };
      const positions = {};
  
      csvData.forEach(row => {
        if (!positions[row.position]) {
          positions[row.position] = {
            "name": row.position,
            "children": []
          };
          data.children.push(positions[row.position]);
        }
  
        positions[row.position].children.push({
          "name": row.player_name,
          "size": row.numberPickOverall || 100,
          "drafted": row.drafted === "True",
          "team": row.team
        });
      });
  
      // Layout de empaquetado circular
      const pack = d3.pack()
        .size([960, 600])
        .padding(10);
  
      // Crear la jerarquía de datos y calcular el layout
      const root = d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.value - a.value);
  
      pack(root);
  
      // Dibujar los círculos y texto
      const svg = d3.select(svgSelector);
  
      // Zoom y Panning
      const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", zoomed);
  
      svg.call(zoom);
  
      // Escala de color para las posiciones
      const positionColor = d3.scaleOrdinal(d3.schemeCategory10);
      const teamColor = d3.scaleOrdinal(d3.schemeCategory20);
  
      // Tooltips
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
      // Crear grupo 'nodes' para facilitar el arrastre y el zoom
      const nodes = svg.append("g")
        .attr("transform", "translate(0,0)");
  
      const node = nodes.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", d => d.children ? "node" : "leaf node")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
      node.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => d.children ? positionColor(d.data.name) : teamColor(d.data.team))
        .on("mouseover", function(d) {
          // Mostrar tooltip
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(`<b>${d.data.name}</b><br/>
                        ${d.children ? "Posición" : "Selección:"} ${d.children ? d.data.name : d.data.size}<br/>
                        ${d.data.drafted ? "Reclutado" : "No reclutado"}
                        ${d.data.team ? "<br/>Equipo: " + d.data.team : ""}`) // Mostrar equipo si existe
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          // Ocultar tooltip
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
  
        node.filter(d => !d.children).append("text")
        .attr("dy", "0.3em")
        .text(d => d.data.name.substring(0, d.r / 3)); 

        // Funciones para el arrastre de nodos
        function dragstarted(d) {
            if (!d3.event.active) pack.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) pack.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    });
  }
  
  // Llamada a la función para crear la visualización
  
  