function vis2() {
    const width_mapa = 960;
    const height_mapa = 500;

    const svg = d3.select("#map-container").append("svg")
        .attr("width", width_mapa)
        .attr("height", height_mapa);

    const contenedorMapa = svg.append("g");

    // Legend
    function updateLegend(type) {
        const legendContent = document.getElementById('legend-content');
        let content = '';

        switch (type) {
            case 'Mundo':
                content = "Visualización del mapa mundial.";
                break;
            case 'EstadosUnidos':
                content = "Visualización del mapa de Estados Unidos.";
                break;
        }
        legendContent.textContent = content;
    }

    // Limpiar visualización
    function clearVisualization() {
        const mapContainer = d3.select("#map-container").select("g"); // Seleccionar el grupo dentro del contenedor
        mapContainer.selectAll("*").remove(); 
    }
    // Función para el zoom
    function zoomed(event) {
        contenedorMapa.attr("transform", event.transform);
    }
    
    // Cargar datos CSV del mundo(debido a que me tirba error fetch al carga tanto json y csv, asi lo subi manualmente)
    const usaPlayersData_json ={
        
            "Kentucky": {
                "bench_reps": [
                    [
                        "Shelvin Mack"
                    ],
                    17.0
                ],
                "body_fat_pct": [
                    [
                        "Jordan Hamilton"
                    ],
                    9.8
                ],
                "born": [
                    [
                        "Shelvin Mack",
                        "Darius Miller"
                    ],
                    1990.0
                ],
                "height_x": [
                    [
                        "Jordan Hamilton"
                    ],
                    78.75
                ],
                "height_y": [
                    [
                        "Darius Miller"
                    ],
                    203.0
                ],
                "lengthHandInches": [
                    [
                        "Jordan Hamilton"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Shelvin Mack"
                    ],
                    39.0
                ],
                "reach_standing": [
                    [
                        "Jordan Hamilton"
                    ],
                    104.0
                ],
                "standing_vertical": [
                    [
                        "Darius Miller"
                    ],
                    33.0
                ],
                "timeLaneAgility": [
                    [
                        "Jordan Hamilton"
                    ],
                    11.47
                ]
            },
            "Missouri": {
                "bench_reps": [
                    [
                        "Anthony Tolliver"
                    ],
                    21.0
                ],
                "body_fat_pct": [
                    [
                        "Loren Woods"
                    ],
                    9.3
                ],
                "born": [
                    [
                        "Bradley Beal",
                        "Otto Porter",
                        "Ben McLemore"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Loren Woods"
                    ],
                    84.75
                ],
                "height_y": [
                    [
                        "Loren Woods"
                    ],
                    216.0
                ],
                "lengthHandInches": [
                    [
                        "Malcolm Thomas"
                    ],
                    9.5
                ],
                "max_vertical": [
                    [
                        "Ben McLemore"
                    ],
                    42.0
                ],
                "reach_standing": [
                    [
                        "Malcolm Thomas"
                    ],
                    107.5
                ],
                "standing_vertical": [
                    [
                        "Bradley Beal"
                    ],
                    33.0
                ],
                "timeLaneAgility": [
                    [
                        "Ben McLemore"
                    ],
                    11.87
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Ben McLemore"
                    ],
                    3.11
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Otto Porter"
                    ],
                    3.4
                ],
                "weight_x": [
                    [
                        "Otto Porter"
                    ],
                    197.6
                ],
                "weight_y": [
                    [
                        "Otto Porter"
                    ],
                    89.0
                ],
                "widthHandInches": [
                    [
                        "Ben McLemore"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Otto Porter"
                    ],
                    85.5
                ]
            },
            "New York": {
                "bench_reps": [
                    [
                        "Shelden Williams"
                    ],
                    25.0
                ],
                "body_fat_pct": [
                    [
                        "Jamaal Tinsley"
                    ],
                    13.6
                ],
                "born": [
                    [
                        "Andre Drummond",
                        "Maurice Harkless"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Brendan Haywood"
                    ],
                    83.75
                ],
                "height_y": [
                    [
                        "Brendan Haywood"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Andre Drummond"
                    ],
                    9.5
                ],
                "max_vertical": [
                    [
                        "Arnett Moultrie"
                    ],
                    37.5
                ],
                "reach_standing": [
                    [
                        "Andre Drummond"
                    ],
                    109.5
                ],
                "standing_vertical": [
                    [
                        "Arnett Moultrie"
                    ],
                    33.5
                ],
                "timeLaneAgility": [
                    [
                        "Kevin Jones"
                    ],
                    11.94
                ]
            },
            "Florida": {
                "bench_reps": [
                    [
                        "Theron Smith"
                    ],
                    25.0
                ],
                "body_fat_pct": [
                    [
                        "Jarron Collins"
                    ],
                    15.2
                ],
                "born": [
                    [
                        "Chandler Parsons",
                        "Larry Sanders"
                    ],
                    1988.0
                ],
                "height_x": [
                    [
                        "Jason Collins"
                    ],
                    82.25
                ],
                "height_y": [
                    [
                        "Larry Sanders"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Larry Sanders"
                    ],
                    9.75
                ],
                "max_vertical": [
                    [
                        "Chandler Parsons"
                    ],
                    31.5
                ],
                "reach_standing": [
                    [
                        "Larry Sanders"
                    ],
                    112.0
                ],
                "standing_vertical": [
                    [
                        "Chandler Parsons",
                        "Larry Sanders"
                    ],
                    25.5
                ],
                "timeLaneAgility": [
                    [
                        "Larry Sanders"
                    ],
                    12.49
                ]
            },
            "Illinois": {
                "bench_reps": [
                    [
                        "Luke Harangody"
                    ],
                    23.0
                ],
                "body_fat_pct": [
                    [
                        "Eddy Curry"
                    ],
                    16.5
                ],
                "born": [
                    [
                        "Richaun Holmes",
                        "Chasson Randle"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Eddy Curry"
                    ],
                    82.5
                ],
                "height_y": [
                    [
                        "Eddy Curry"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Quincy Miller"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Iman Shumpert"
                    ],
                    42.0
                ],
                "reach_standing": [
                    [
                        "Richaun Holmes"
                    ],
                    108.0
                ],
                "standing_vertical": [
                    [
                        "Iman Shumpert"
                    ],
                    36.5
                ],
                "timeLaneAgility": [
                    [
                        "Luke Harangody"
                    ],
                    11.83
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Richaun Holmes"
                    ],
                    3.31
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Robert Covington"
                    ],
                    3.34
                ],
                "weight_x": [
                    [
                        "Richaun Holmes"
                    ],
                    242.8
                ],
                "weight_y": [
                    [
                        "Anthony Brown",
                        "Richaun Holmes"
                    ],
                    111.0
                ],
                "widthHandInches": [
                    [
                        "Chasson Randle"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Robert Covington"
                    ],
                    85.75
                ]
            },
            "Texas": {
                "bench_reps": [
                    [
                        "Emeka Okafor"
                    ],
                    22.0
                ],
                "body_fat_pct": [
                    [
                        "LaMarcus Aldridge"
                    ],
                    8.7
                ],
                "born": [
                    [
                        "Jordan Mickey"
                    ],
                    1994.0
                ],
                "height_x": [
                    [
                        "Chris Bosh"
                    ],
                    82.25
                ],
                "height_y": [
                    [
                        "Chris Bosh",
                        "LaMarcus Aldridge",
                        "DeAndre Jordan"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Jimmy Butler",
                        "Wesley Johnson"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Jimmy Butler"
                    ],
                    39.0
                ],
                "reach_standing": [
                    [
                        "Wesley Johnson",
                        "Jordan Mickey"
                    ],
                    106.0
                ],
                "standing_vertical": [
                    [
                        "Jordan Mickey",
                        "Phil Pressey"
                    ],
                    33.0
                ],
                "timeLaneAgility": [
                    [
                        "Jordan Mickey"
                    ],
                    11.72
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Jordan Mickey"
                    ],
                    3.13
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Jordan Mickey"
                    ],
                    3.28
                ],
                "weight_x": [
                    [
                        "Jordan Mickey"
                    ],
                    238.0
                ],
                "weight_y": [
                    [
                        "Jordan Mickey"
                    ],
                    106.0
                ],
                "widthHandInches": [
                    [
                        "Phil Pressey"
                    ],
                    9.75
                ],
                "wingspan": [
                    [
                        "Jordan Mickey"
                    ],
                    87.25
                ]
            },
            "Wisconsin": {
                "bench_reps": [
                    [
                        "Carl Landry"
                    ],
                    21.0
                ],
                "body_fat_pct": [
                    [
                        "Sam Dekker",
                        "Carl Landry"
                    ],
                    7.5
                ],
                "born": [
                    [
                        "Sam Dekker"
                    ],
                    1994.0
                ],
                "height_x": [
                    [
                        "Sam Dekker"
                    ],
                    79.75
                ],
                "height_y": [
                    [
                        "Sam Dekker",
                        "Carl Landry"
                    ],
                    206.0
                ],
                "lengthHandInches": [
                    [
                        "Sam Dekker",
                        "Vander Blue"
                    ],
                    8.5
                ],
                "max_vertical": [
                    [
                        "Vander Blue"
                    ],
                    37.5
                ],
                "reach_standing": [
                    [
                        "Sam Dekker"
                    ],
                    106.0
                ],
                "standing_vertical": [
                    [
                        "Vander Blue"
                    ],
                    28.0
                ],
                "timeLaneAgility": [
                    [
                        "Sam Dekker"
                    ],
                    10.64
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Sam Dekker"
                    ],
                    2.96
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Sam Dekker"
                    ],
                    3.28
                ],
                "weight_x": [
                    [
                        "Sam Dekker"
                    ],
                    218.6
                ],
                "weight_y": [
                    [
                        "Sam Dekker"
                    ],
                    104.0
                ],
                "widthHandInches": [
                    [
                        "Vander Blue"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Sam Dekker"
                    ],
                    83.5
                ]
            },
            "Louisiana": {
                "bench_reps": [
                    [
                        "Jarell Martin"
                    ],
                    19.0
                ],
                "body_fat_pct": [
                    [
                        "Nate Williams"
                    ],
                    12.4
                ],
                "born": [
                    [
                        "Kelly Oubre"
                    ],
                    1995.0
                ],
                "height_x": [
                    [
                        "Greg Monroe"
                    ],
                    81.75
                ],
                "height_y": [
                    [
                        "Greg Monroe"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Kelly Oubre"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Marcus Thornton"
                    ],
                    43.0
                ],
                "reach_standing": [
                    [
                        "Greg Monroe"
                    ],
                    108.5
                ],
                "standing_vertical": [
                    [
                        "Marcus Thornton",
                        "Kelly Oubre"
                    ],
                    34.5
                ],
                "timeLaneAgility": [
                    [
                        "Greg Monroe"
                    ],
                    12.1
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Kelly Oubre"
                    ],
                    3.12
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Kelly Oubre"
                    ],
                    3.32
                ],
                "weight_x": [
                    [
                        "Jarell Martin"
                    ],
                    238.6
                ],
                "weight_y": [
                    [
                        "Jarell Martin"
                    ],
                    108.0
                ],
                "widthHandInches": [
                    [
                        "Jarell Martin"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Kelly Oubre"
                    ],
                    86.25
                ]
            },
            "Indiana": {
                "bench_reps": [
                    [
                        "Eric Gordon",
                        "Miles Plumlee"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Josh McRoberts"
                    ],
                    13.7
                ],
                "born": [
                    [
                        "Marquis Teague",
                        "Branden Dawson"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Mason Plumlee"
                    ],
                    83.25
                ],
                "height_y": [
                    [
                        "Miles Plumlee",
                        "Mason Plumlee"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Mason Plumlee"
                    ],
                    9.75
                ],
                "max_vertical": [
                    [
                        "Marquis Teague",
                        "Miles Plumlee"
                    ],
                    40.5
                ],
                "reach_standing": [
                    [
                        "Keith Benson"
                    ],
                    109.5
                ],
                "standing_vertical": [
                    [
                        "Miles Plumlee"
                    ],
                    34.0
                ],
                "timeLaneAgility": [
                    [
                        "Branden Dawson"
                    ],
                    12.22
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Branden Dawson"
                    ],
                    3.53
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Mason Plumlee"
                    ],
                    3.29
                ],
                "weight_x": [
                    [
                        "Mason Plumlee"
                    ],
                    238.2
                ],
                "weight_y": [
                    [
                        "Mason Plumlee"
                    ],
                    111.0
                ],
                "widthHandInches": [
                    [
                        "Mason Plumlee"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Branden Dawson",
                        "Mason Plumlee"
                    ],
                    83.0
                ]
            },
            "Virginia": {
                "bench_reps": [
                    [
                        "Meyers Leonard",
                        "Justin Harper"
                    ],
                    19.0
                ],
                "body_fat_pct": [
                    [
                        "Mike Scott"
                    ],
                    10.6
                ],
                "born": [
                    [
                        "Justin Anderson"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Meyers Leonard"
                    ],
                    83.75
                ],
                "height_y": [
                    [
                        "Meyers Leonard"
                    ],
                    216.0
                ],
                "lengthHandInches": [
                    [
                        "Jarvis Varnado",
                        "Meyers Leonard"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Justin Anderson"
                    ],
                    43.0
                ],
                "reach_standing": [
                    [
                        "Jarvis Varnado"
                    ],
                    109.5
                ],
                "standing_vertical": [
                    [
                        "Justin Anderson"
                    ],
                    38.0
                ],
                "timeLaneAgility": [
                    [
                        "Justin Harper"
                    ],
                    11.92
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Justin Anderson"
                    ],
                    2.88
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Justin Anderson"
                    ],
                    3.22
                ],
                "weight_x": [
                    [
                        "Justin Anderson"
                    ],
                    230.6
                ],
                "weight_y": [
                    [
                        "Justin Anderson"
                    ],
                    103.0
                ],
                "widthHandInches": [
                    [
                        "Justin Anderson"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Justin Anderson"
                    ],
                    83.75
                ]
            },
            "Michigan": {
                "bench_reps": [
                    [
                        "Charlie Bell",
                        "Jason Richardson",
                        "Robert Whaley",
                        "Steven Smith"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Draymond Green"
                    ],
                    11.3
                ],
                "born": [
                    [
                        "Devin Booker"
                    ],
                    1996.0
                ],
                "height_x": [
                    [
                        "JaVale McGee"
                    ],
                    83.0
                ],
                "height_y": [
                    [
                        "JaVale McGee"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Draymond Green"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Jordan Crawford",
                        "Devin Booker"
                    ],
                    34.5
                ],
                "reach_standing": [
                    [
                        "Draymond Green"
                    ],
                    105.0
                ],
                "standing_vertical": [
                    [
                        "Jordan Crawford"
                    ],
                    31.5
                ],
                "timeLaneAgility": [
                    [
                        "Jordan Crawford"
                    ],
                    11.03
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Devin Booker"
                    ],
                    2.75
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Devin Booker"
                    ],
                    3.28
                ],
                "weight_x": [
                    [
                        "Devin Booker"
                    ],
                    205.8
                ],
                "weight_y": [
                    [
                        "Devin Booker"
                    ],
                    93.0
                ],
                "widthHandInches": [
                    [
                        "Devin Booker"
                    ],
                    9.0
                ],
                "wingspan": [
                    [
                        "Devin Booker"
                    ],
                    80.25
                ]
            },
            "Oklahoma": {
                "bench_reps": [
                    [
                        "Blake Griffin"
                    ],
                    22.0
                ],
                "body_fat_pct": [
                    [
                        "Darnell Jackson"
                    ],
                    12.5
                ],
                "born": [
                    [
                        "Blake Griffin"
                    ],
                    1989.0
                ],
                "height_x": [
                    [
                        "Blake Griffin"
                    ],
                    80.5
                ],
                "height_y": [
                    [
                        "Blake Griffin"
                    ],
                    208.0
                ]
            },
            "Arizona": {
                "bench_reps": [
                    [
                        "Carrick Felix"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Jerryd Bayless"
                    ],
                    4.7
                ],
                "born": [
                    [
                        "Carrick Felix"
                    ],
                    1990.0
                ],
                "height_x": [
                    [
                        "Carrick Felix"
                    ],
                    76.75
                ],
                "height_y": [
                    [
                        "Carrick Felix"
                    ],
                    198.0
                ],
                "lengthHandInches": [
                    [
                        "Carrick Felix"
                    ],
                    8.5
                ],
                "max_vertical": [
                    [
                        "Carrick Felix"
                    ],
                    38.5
                ],
                "reach_standing": [
                    [
                        "Carrick Felix"
                    ],
                    103.5
                ],
                "standing_vertical": [
                    [
                        "Carrick Felix"
                    ],
                    32.0
                ],
                "timeLaneAgility": [
                    [
                        "Carrick Felix"
                    ],
                    11.16
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Carrick Felix"
                    ],
                    3.09
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Carrick Felix"
                    ],
                    3.25
                ],
                "weight_x": [
                    [
                        "Carrick Felix"
                    ],
                    202.6
                ],
                "weight_y": [
                    [
                        "Carrick Felix"
                    ],
                    91.0
                ],
                "widthHandInches": [
                    [
                        "Carrick Felix"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Carrick Felix"
                    ],
                    81.25
                ]
            },
            "Georgia": {
                "bench_reps": [
                    [
                        "Jae Crowder",
                        "Gani Lawal"
                    ],
                    20.0
                ],
                "body_fat_pct": [
                    [
                        "Dwight Howard"
                    ],
                    10.5
                ],
                "born": [
                    [
                        "Derrick Favors"
                    ],
                    1991.0
                ],
                "height_x": [
                    [
                        "Jason Smith"
                    ],
                    82.75
                ],
                "height_y": [
                    [
                        "Dwight Howard",
                        "Jason Smith"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Jae Crowder"
                    ],
                    9.5
                ],
                "max_vertical": [
                    [
                        "Travis Leslie"
                    ],
                    40.5
                ],
                "reach_standing": [
                    [
                        "Derrick Favors"
                    ],
                    110.0
                ],
                "standing_vertical": [
                    [
                        "Travis Leslie"
                    ],
                    33.0
                ],
                "timeLaneAgility": [
                    [
                        "Bernard James"
                    ],
                    11.84
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Lorenzo Brown"
                    ],
                    3.24
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Lorenzo Brown"
                    ],
                    3.4
                ],
                "weight_x": [
                    [
                        "Lorenzo Brown"
                    ],
                    189.2
                ],
                "weight_y": [
                    [
                        "Lorenzo Brown"
                    ],
                    85.0
                ],
                "widthHandInches": [
                    [
                        "Lorenzo Brown"
                    ],
                    8.5
                ],
                "wingspan": [
                    [
                        "Lorenzo Brown"
                    ],
                    79.0
                ]
            },
            "Massachusetts": {
                "bench_reps": [
                    [
                        "Demetris Nichols"
                    ],
                    16.0
                ],
                "body_fat_pct": [
                    [
                        "Pat Connaughton"
                    ],
                    10.2
                ],
                "born": [
                    [
                        "Pat Connaughton"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Michael Bradley"
                    ],
                    81.5
                ],
                "height_y": [
                    [
                        "Michael Bradley"
                    ],
                    208.0
                ],
                "lengthHandInches": [
                    [
                        "Pat Connaughton"
                    ],
                    8.5
                ],
                "max_vertical": [
                    [
                        "Pat Connaughton"
                    ],
                    44.0
                ],
                "reach_standing": [
                    [
                        "Michael Carter-Williams"
                    ],
                    101.0
                ],
                "standing_vertical": [
                    [
                        "Pat Connaughton"
                    ],
                    37.5
                ],
                "timeLaneAgility": [
                    [
                        "Michael Carter-Williams"
                    ],
                    10.68
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Michael Carter-Williams"
                    ],
                    3.7
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Michael Carter-Williams"
                    ],
                    3.22
                ],
                "weight_x": [
                    [
                        "Pat Connaughton"
                    ],
                    215.0
                ],
                "weight_y": [
                    [
                        "Pat Connaughton"
                    ],
                    93.0
                ],
                "widthHandInches": [
                    [
                        "Pat Connaughton"
                    ],
                    9.25
                ],
                "wingspan": [
                    [
                        "Pat Connaughton"
                    ],
                    80.0
                ]
            },
            "Colorado": {
                "bench_reps": [
                    [
                        "Eddie Gill"
                    ],
                    13.0
                ]
            },
            "New Jersey": {
                "bench_reps": [
                    [
                        "Derrick Caracter"
                    ],
                    22.0
                ],
                "body_fat_pct": [
                    [
                        "Eric Williams"
                    ],
                    13.0
                ],
                "born": [
                    [
                        "Tyshawn Taylor"
                    ],
                    1990.0
                ],
                "height_x": [
                    [
                        "Troy Murphy"
                    ],
                    81.75
                ],
                "height_y": [
                    [
                        "Darryl Watkins",
                        "Troy Murphy"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Derrick Caracter"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Tyshawn Taylor"
                    ],
                    36.5
                ],
                "reach_standing": [
                    [
                        "Kenneth Faried"
                    ],
                    108.0
                ],
                "standing_vertical": [
                    [
                        "Tyshawn Taylor"
                    ],
                    32.0
                ],
                "timeLaneAgility": [
                    [
                        "Derrick Caracter"
                    ],
                    12.78
                ]
            },
            "Minnesota": {
                "bench_reps": [
                    [
                        "Kris Humphries"
                    ],
                    22.0
                ],
                "body_fat_pct": [
                    [
                        "Cole Aldrich"
                    ],
                    8.5
                ],
                "born": [
                    [
                        "Rashad Vaughn",
                        "Tyus Jones"
                    ],
                    1996.0
                ],
                "height_x": [
                    [
                        "Mike Muscala"
                    ],
                    82.25
                ],
                "height_y": [
                    [
                        "Cole Aldrich",
                        "Mike Muscala"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Cole Aldrich"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Armon Johnson"
                    ],
                    38.5
                ],
                "reach_standing": [
                    [
                        "Cole Aldrich"
                    ],
                    111.5
                ],
                "standing_vertical": [
                    [
                        "Armon Johnson"
                    ],
                    31.5
                ],
                "timeLaneAgility": [
                    [
                        "Tyus Jones"
                    ],
                    11.84
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Rashad Vaughn"
                    ],
                    3.1
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Mike Muscala"
                    ],
                    3.44
                ],
                "weight_x": [
                    [
                        "Mike Muscala"
                    ],
                    230.2
                ],
                "weight_y": [
                    [
                        "Mike Muscala"
                    ],
                    108.0
                ],
                "widthHandInches": [
                    [
                        "Mike Muscala"
                    ],
                    9.0
                ],
                "wingspan": [
                    [
                        "Mike Muscala"
                    ],
                    85.0
                ]
            },
            "Alabama": {
                "bench_reps": [
                    [
                        "Rodney White"
                    ],
                    16.0
                ],
                "body_fat_pct": [
                    [
                        "Ken Johnson"
                    ],
                    9.9
                ],
                "born": [
                    [
                        "Eric Bledsoe"
                    ],
                    1989.0
                ],
                "height_x": [
                    [
                        "Ken Johnson"
                    ],
                    82.75
                ],
                "height_y": [
                    [
                        "Rodney White",
                        "Jamario Moon",
                        "Ken Johnson"
                    ],
                    203.0
                ],
                "lengthHandInches": [
                    [
                        "Eric Bledsoe"
                    ],
                    8.5
                ]
            },
            "Montana": {
                "bench_reps": [
                    [
                        "Adam Morrison"
                    ],
                    11.0
                ],
                "body_fat_pct": [
                    [
                        "Adam Morrison"
                    ],
                    6.8
                ],
                "born": [
                    [
                        "Adam Morrison"
                    ],
                    1984.0
                ],
                "height_x": [
                    [
                        "Adam Morrison"
                    ],
                    78.5
                ],
                "height_y": [
                    [
                        "Adam Morrison"
                    ],
                    203.0
                ]
            },
            "California": {
                "bench_reps": [
                    [
                        "Dan McClintock"
                    ],
                    20.0
                ],
                "body_fat_pct": [
                    [
                        "Jeremy Tyler"
                    ],
                    13.4
                ],
                "born": [
                    [
                        "Grant Jerrett"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Brook Lopez",
                        "Tyler Zeller"
                    ],
                    83.25
                ],
                "height_y": [
                    [
                        "Justin Hamilton",
                        "Dewayne Dedmon",
                        "Brook Lopez",
                        "Tyler Zeller"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Kawhi Leonard"
                    ],
                    9.75
                ],
                "max_vertical": [
                    [
                        "Damian Lillard"
                    ],
                    39.5
                ],
                "reach_standing": [
                    [
                        "Jeremy Tyler"
                    ],
                    110.5
                ],
                "standing_vertical": [
                    [
                        "Damian Lillard"
                    ],
                    34.5
                ],
                "timeLaneAgility": [
                    [
                        "Dewayne Dedmon"
                    ],
                    12.75
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Delon Wright"
                    ],
                    3.5
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Grant Jerrett"
                    ],
                    3.51
                ],
                "weight_x": [
                    [
                        "Dewayne Dedmon"
                    ],
                    238.8
                ],
                "weight_y": [
                    [
                        "Dewayne Dedmon"
                    ],
                    111.0
                ],
                "widthHandInches": [
                    [
                        "Dewayne Dedmon"
                    ],
                    11.0
                ],
                "wingspan": [
                    [
                        "Dewayne Dedmon"
                    ],
                    88.0
                ]
            },
            "Maryland": {
                "bench_reps": [
                    [
                        "Joey Dorsey",
                        "Michael Beasley"
                    ],
                    19.0
                ],
                "body_fat_pct": [
                    [
                        "Chris McCray"
                    ],
                    9.6
                ],
                "born": [
                    [
                        "Josh Selby",
                        "Reggie Bullock",
                        "Will Barton"
                    ],
                    1991.0
                ],
                "height_x": [
                    [
                        "Henry Sims"
                    ],
                    82.0
                ],
                "height_y": [
                    [
                        "Henry Sims"
                    ],
                    208.0
                ],
                "lengthHandInches": [
                    [
                        "Henry Sims"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Josh Selby"
                    ],
                    42.0
                ],
                "reach_standing": [
                    [
                        "Henry Sims"
                    ],
                    108.0
                ],
                "standing_vertical": [
                    [
                        "Reggie Bullock"
                    ],
                    31.0
                ],
                "timeLaneAgility": [
                    [
                        "Will Barton"
                    ],
                    12.5
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Reggie Bullock"
                    ],
                    3.3
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Reggie Bullock"
                    ],
                    3.31
                ],
                "weight_x": [
                    [
                        "Reggie Bullock"
                    ],
                    199.8
                ],
                "weight_y": [
                    [
                        "Reggie Bullock"
                    ],
                    92.0
                ],
                "widthHandInches": [
                    [
                        "Reggie Bullock"
                    ],
                    9.0
                ],
                "wingspan": [
                    [
                        "Reggie Bullock"
                    ],
                    80.75
                ]
            },
            "North Carolina": {
                "bench_reps": [
                    [
                        "David Noel",
                        "Chris Wilcox"
                    ],
                    20.0
                ],
                "body_fat_pct": [
                    [
                        "John Henson"
                    ],
                    8.6
                ],
                "born": [
                    [
                        "John Henson"
                    ],
                    1990.0
                ],
                "height_x": [
                    [
                        "Hassan Whiteside"
                    ],
                    82.5
                ],
                "height_y": [
                    [
                        "Hassan Whiteside"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "John Henson"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Hassan Whiteside"
                    ],
                    31.5
                ],
                "reach_standing": [
                    [
                        "Hassan Whiteside"
                    ],
                    113.0
                ],
                "standing_vertical": [
                    [
                        "Hassan Whiteside"
                    ],
                    27.0
                ],
                "timeLaneAgility": [
                    [
                        "Hassan Whiteside"
                    ],
                    11.83
                ]
            },
            "Pennsylvania": {
                "bench_reps": [
                    [
                        "Sean Singletary",
                        "DeJuan Blair"
                    ],
                    18.0
                ],
                "body_fat_pct": [
                    [
                        "DeJuan Blair"
                    ],
                    12.0
                ],
                "born": [
                    [
                        "Rondae Hollis-Jefferson"
                    ],
                    1995.0
                ],
                "height_x": [
                    [
                        "Eddie Griffin"
                    ],
                    81.25
                ],
                "height_y": [
                    [
                        "Brandon Davies",
                        "Eddie Griffin"
                    ],
                    208.0
                ],
                "lengthHandInches": [
                    [
                        "Brandon Davies",
                        "Michael Kidd-Gilchrist"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Rondae Hollis-Jefferson"
                    ],
                    38.0
                ],
                "reach_standing": [
                    [
                        "Brandon Davies"
                    ],
                    108.5
                ],
                "standing_vertical": [
                    [
                        "Michael Kidd-Gilchrist",
                        "Rondae Hollis-Jefferson"
                    ],
                    32.0
                ],
                "timeLaneAgility": [
                    [
                        "Michael Kidd-Gilchrist"
                    ],
                    11.77
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Rondae Hollis-Jefferson"
                    ],
                    3.19
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Brandon Davies"
                    ],
                    3.5
                ],
                "weight_x": [
                    [
                        "Brandon Davies"
                    ],
                    241.8
                ],
                "weight_y": [
                    [
                        "Brandon Davies"
                    ],
                    108.0
                ],
                "widthHandInches": [
                    [
                        "Brandon Davies"
                    ],
                    11.0
                ],
                "wingspan": [
                    [
                        "Rondae Hollis-Jefferson"
                    ],
                    86.0
                ]
            },
            "Delaware": {
                "bench_reps": [
                    [
                        "Joey Graham"
                    ],
                    26.0
                ]
            },
            "Tennessee": {
                "bench_reps": [
                    [
                        "Dominique Jones"
                    ],
                    19.0
                ],
                "body_fat_pct": [
                    [
                        "Kirk Haston"
                    ],
                    10.5
                ],
                "born": [
                    [
                        "Corey Brewer"
                    ],
                    1986.0
                ],
                "height_x": [
                    [
                        "Kirk Haston"
                    ],
                    80.0
                ],
                "height_y": [
                    [
                        "Corey Brewer",
                        "Kirk Haston"
                    ],
                    206.0
                ],
                "lengthHandInches": [
                    [
                        "Dominique Jones"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Dominique Jones"
                    ],
                    32.5
                ],
                "reach_standing": [
                    [
                        "Dominique Jones"
                    ],
                    101.0
                ],
                "standing_vertical": [
                    [
                        "Dominique Jones"
                    ],
                    26.0
                ],
                "timeLaneAgility": [
                    [
                        "Dominique Jones"
                    ],
                    10.88
                ]
            },
            "Washington": {
                "bench_reps": [
                    [
                        "Peyton Siva"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Spencer Hawes"
                    ],
                    13.0
                ],
                "born": [
                    [
                        "Tony Wroten"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Spencer Hawes"
                    ],
                    82.0
                ],
                "height_y": [
                    [
                        "Spencer Hawes"
                    ],
                    216.0
                ],
                "lengthHandInches": [
                    [
                        "Avery Bradley"
                    ],
                    8.25
                ],
                "max_vertical": [
                    [
                        "Peyton Siva"
                    ],
                    41.5
                ],
                "reach_standing": [
                    [
                        "Tony Wroten"
                    ],
                    101.0
                ],
                "standing_vertical": [
                    [
                        "Peyton Siva"
                    ],
                    33.5
                ],
                "timeLaneAgility": [
                    [
                        "Avery Bradley"
                    ],
                    11.47
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Peyton Siva"
                    ],
                    2.93
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Peyton Siva"
                    ],
                    3.16
                ],
                "weight_x": [
                    [
                        "Peyton Siva"
                    ],
                    180.6
                ],
                "weight_y": [
                    [
                        "Peyton Siva"
                    ],
                    83.0
                ],
                "widthHandInches": [
                    [
                        "Peyton Siva"
                    ],
                    9.75
                ],
                "wingspan": [
                    [
                        "Peyton Siva"
                    ],
                    75.0
                ]
            },
            "District of Columbia": {
                "bench_reps": [
                    [
                        "Patrick Patterson"
                    ],
                    17.0
                ],
                "body_fat_pct": [
                    [
                        "Delonte West",
                        "Quinn Cook"
                    ],
                    6.7
                ],
                "born": [
                    [
                        "Quinn Cook"
                    ],
                    1993.0
                ],
                "height_x": [
                    [
                        "Patrick Patterson"
                    ],
                    80.0
                ],
                "height_y": [
                    [
                        "Patrick Patterson"
                    ],
                    206.0
                ],
                "lengthHandInches": [
                    [
                        "Patrick Patterson"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Patrick Patterson"
                    ],
                    33.5
                ],
                "reach_standing": [
                    [
                        "Patrick Patterson"
                    ],
                    107.0
                ],
                "standing_vertical": [
                    [
                        "Patrick Patterson"
                    ],
                    28.5
                ],
                "timeLaneAgility": [
                    [
                        "Quinn Cook"
                    ],
                    11.44
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Quinn Cook"
                    ],
                    3.41
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Quinn Cook"
                    ],
                    3.38
                ],
                "weight_x": [
                    [
                        "Quinn Cook"
                    ],
                    179.0
                ],
                "weight_y": [
                    [
                        "Quinn Cook"
                    ],
                    83.0
                ],
                "widthHandInches": [
                    [
                        "Quinn Cook"
                    ],
                    8.75
                ],
                "wingspan": [
                    [
                        "Quinn Cook"
                    ],
                    76.0
                ]
            },
            "Ohio": {
                "bench_reps": [
                    [
                        "Brandon Hunter"
                    ],
                    25.0
                ],
                "body_fat_pct": [
                    [
                        "Erik Daniels"
                    ],
                    18.5
                ],
                "born": [
                    [
                        "Trey Burke",
                        "Shane Larkin"
                    ],
                    1992.0
                ],
                "height_x": [
                    [
                        "Byron Mullens"
                    ],
                    83.75
                ],
                "height_y": [
                    [
                        "Byron Mullens",
                        "John Edwards"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Tony Mitchell"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Shane Larkin"
                    ],
                    44.0
                ],
                "reach_standing": [
                    [
                        "Tony Mitchell"
                    ],
                    106.5
                ],
                "standing_vertical": [
                    [
                        "Shane Larkin"
                    ],
                    34.5
                ],
                "timeLaneAgility": [
                    [
                        "Tony Mitchell"
                    ],
                    11.82
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Tony Mitchell"
                    ],
                    3.25
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Tony Mitchell"
                    ],
                    3.52
                ],
                "weight_x": [
                    [
                        "Tony Mitchell"
                    ],
                    236.4
                ],
                "weight_y": [
                    [
                        "Gary Trent"
                    ],
                    113.0
                ],
                "widthHandInches": [
                    [
                        "Tony Mitchell"
                    ],
                    10.0
                ],
                "wingspan": [
                    [
                        "Tony Mitchell"
                    ],
                    86.5
                ]
            },
            "Mississippi": {
                "bench_reps": [
                    [
                        "Alton Ford"
                    ],
                    21.0
                ],
                "body_fat_pct": [
                    [
                        "Jackie Butler"
                    ],
                    16.3
                ],
                "born": [
                    [
                        "Isaiah Canaan"
                    ],
                    1991.0
                ],
                "height_x": [
                    [
                        "Alton Ford"
                    ],
                    80.25
                ],
                "height_y": [
                    [
                        "Josh Smith"
                    ],
                    213.0
                ],
                "lengthHandInches": [
                    [
                        "Isaiah Canaan"
                    ],
                    8.25
                ],
                "max_vertical": [
                    [
                        "Isaiah Canaan"
                    ],
                    40.5
                ],
                "reach_standing": [
                    [
                        "Isaiah Canaan"
                    ],
                    94.5
                ],
                "standing_vertical": [
                    [
                        "Isaiah Canaan"
                    ],
                    33.0
                ],
                "timeLaneAgility": [
                    [
                        "Isaiah Canaan"
                    ],
                    10.98
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Isaiah Canaan"
                    ],
                    2.89
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Isaiah Canaan"
                    ],
                    3.22
                ],
                "weight_x": [
                    [
                        "Isaiah Canaan"
                    ],
                    188.4
                ],
                "weight_y": [
                    [
                        "Isaiah Canaan"
                    ],
                    91.0
                ],
                "widthHandInches": [
                    [
                        "Isaiah Canaan"
                    ],
                    9.5
                ],
                "wingspan": [
                    [
                        "Isaiah Canaan"
                    ],
                    76.5
                ]
            },
            "Iowa": {
                "bench_reps": [
                    [
                        "Kirk Hinrich"
                    ],
                    10.0
                ],
                "body_fat_pct": [
                    [
                        "Nick Collison"
                    ],
                    17.0
                ],
                "born": [
                    [
                        "Kirk Hinrich"
                    ],
                    1981.0
                ],
                "height_x": [
                    [
                        "Nick Collison"
                    ],
                    80.75
                ],
                "height_y": [
                    [
                        "Nick Collison"
                    ],
                    208.0
                ]
            },
            "South Carolina": {
                "bench_reps": [
                    [
                        "Trevor Booker"
                    ],
                    22.0
                ],
                "body_fat_pct": [
                    [
                        "Kwame Brown"
                    ],
                    8.9
                ],
                "born": [
                    [
                        "Khris Middleton"
                    ],
                    1991.0
                ],
                "height_x": [
                    [
                        "Kwame Brown"
                    ],
                    82.0
                ],
                "height_y": [
                    [
                        "Kwame Brown"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Trevor Booker",
                        "Khris Middleton",
                        "Larry Nance"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Larry Nance"
                    ],
                    37.5
                ],
                "reach_standing": [
                    [
                        "Larry Nance"
                    ],
                    108.0
                ],
                "standing_vertical": [
                    [
                        "Trevor Booker"
                    ],
                    31.0
                ],
                "timeLaneAgility": [
                    [
                        "Khris Middleton"
                    ],
                    11.45
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Larry Nance"
                    ],
                    3.01
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Larry Nance"
                    ],
                    3.25
                ],
                "weight_x": [
                    [
                        "Larry Nance"
                    ],
                    226.6
                ],
                "weight_y": [
                    [
                        "Larry Nance"
                    ],
                    92.0
                ],
                "widthHandInches": [
                    [
                        "Larry Nance"
                    ],
                    9.75
                ],
                "wingspan": [
                    [
                        "Larry Nance"
                    ],
                    85.5
                ]
            },
            "Kansas": {
                "bench_reps": [
                    [
                        "Matt Freije"
                    ],
                    13.0
                ],
                "body_fat_pct": [
                    [
                        "Matt Freije"
                    ],
                    10.8
                ],
                "born": [
                    [
                        "Matt Freije"
                    ],
                    1981.0
                ],
                "height_x": [
                    [
                        "Matt Freije"
                    ],
                    80.25
                ],
                "height_y": [
                    [
                        "Matt Freije"
                    ],
                    208.0
                ]
            },
            "Oregon": {
                "bench_reps": [
                    [
                        "Will Conroy"
                    ],
                    14.0
                ],
                "body_fat_pct": [
                    [
                        "Kyle Singler"
                    ],
                    10.0
                ],
                "born": [
                    [
                        "Terrence Jones"
                    ],
                    1992.0
                ],
                "height_x": [
                    [
                        "Terrence Jones"
                    ],
                    80.25
                ],
                "height_y": [
                    [
                        "Terrence Jones"
                    ],
                    206.0
                ],
                "lengthHandInches": [
                    [
                        "Terrence Jones"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "Terrence Ross"
                    ],
                    37.5
                ],
                "reach_standing": [
                    [
                        "Terrence Jones"
                    ],
                    107.0
                ],
                "standing_vertical": [
                    [
                        "Terrence Ross"
                    ],
                    31.0
                ],
                "timeLaneAgility": [
                    [
                        "Terrence Ross"
                    ],
                    11.78
                ]
            },
            "Arkansas": {
                "bench_reps": [
                    [
                        "Ronnie Brewer"
                    ],
                    19.0
                ],
                "body_fat_pct": [
                    [
                        "Bobby Portis"
                    ],
                    8.9
                ],
                "born": [
                    [
                        "Bobby Portis"
                    ],
                    1995.0
                ],
                "height_x": [
                    [
                        "Bobby Portis"
                    ],
                    81.5
                ],
                "height_y": [
                    [
                        "Bobby Portis"
                    ],
                    211.0
                ],
                "lengthHandInches": [
                    [
                        "Bobby Portis"
                    ],
                    9.5
                ],
                "max_vertical": [
                    [
                        "Glen Rice"
                    ],
                    40.5
                ],
                "reach_standing": [
                    [
                        "Bobby Portis"
                    ],
                    108.5
                ],
                "standing_vertical": [
                    [
                        "Jeff Taylor"
                    ],
                    33.5
                ],
                "timeLaneAgility": [
                    [
                        "James Anderson"
                    ],
                    11.86
                ],
                "timeModifiedLaneAgility": [
                    [
                        "Bobby Portis"
                    ],
                    3.28
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "Bobby Portis"
                    ],
                    3.56
                ],
                "weight_x": [
                    [
                        "Bobby Portis"
                    ],
                    246.2
                ],
                "weight_y": [
                    [
                        "Bobby Portis"
                    ],
                    104.0
                ],
                "widthHandInches": [
                    [
                        "Bobby Portis"
                    ],
                    9.25
                ],
                "wingspan": [
                    [
                        "Bobby Portis"
                    ],
                    86.0
                ]
            },
            "Utah": {
                "bench_reps": [
                    [
                        "Travis Hansen"
                    ],
                    16.0
                ],
                "body_fat_pct": [
                    [
                        "Travis Hansen"
                    ],
                    6.0
                ],
                "born": [
                    [
                        "Travis Hansen"
                    ],
                    1978.0
                ],
                "height_x": [
                    [
                        "Travis Hansen"
                    ],
                    76.5
                ],
                "height_y": [
                    [
                        "Travis Hansen"
                    ],
                    198.0
                ]
            },
            "Rhode Island": {
                "bench_reps": [
                    [
                        "Matt Barnes"
                    ],
                    11.0
                ]
            },
            "South Dakota": {
                "bench_reps": [
                    [
                        "Jared Reiner"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Jared Reiner"
                    ],
                    12.9
                ],
                "born": [
                    [
                        "Jared Reiner"
                    ],
                    1982.0
                ],
                "height_x": [
                    [
                        "Jared Reiner"
                    ],
                    82.0
                ],
                "height_y": [
                    [
                        "Jared Reiner"
                    ],
                    211.0
                ]
            },
            "Connecticut": {
                "bench_reps": [
                    [
                        "Jordan Williams"
                    ],
                    10.0
                ],
                "body_fat_pct": [
                    [
                        "Jordan Williams"
                    ],
                    12.1
                ],
                "born": [
                    [
                        "Will Solomon"
                    ],
                    1978.0
                ],
                "height_x": [
                    [
                        "Jordan Williams"
                    ],
                    79.75
                ],
                "height_y": [
                    [
                        "Jordan Williams"
                    ],
                    188.0
                ],
                "lengthHandInches": [
                    [
                        "Jordan Williams"
                    ],
                    9.25
                ],
                "max_vertical": [
                    [
                        "Jordan Williams"
                    ],
                    30.5
                ],
                "reach_standing": [
                    [
                        "Jordan Williams"
                    ],
                    106.5
                ],
                "standing_vertical": [
                    [
                        "Jordan Williams"
                    ],
                    25.0
                ],
                "timeLaneAgility": [
                    [
                        "Jordan Williams"
                    ],
                    12.739999999999998
                ]
            },
            "Wyoming": {
                "bench_reps": [
                    [
                        "James Johnson"
                    ],
                    18.0
                ],
                "body_fat_pct": [
                    [
                        "James Johnson"
                    ],
                    12.0
                ],
                "born": [
                    [
                        "JaJuan Johnson",
                        "James Johnson"
                    ],
                    1987.0
                ],
                "height_x": [
                    [
                        "JaJuan Johnson"
                    ],
                    81.0
                ],
                "height_y": [
                    [
                        "JaJuan Johnson",
                        "James Johnson"
                    ],
                    206.0
                ],
                "lengthHandInches": [
                    [
                        "JaJuan Johnson"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "JaJuan Johnson"
                    ],
                    38.0
                ],
                "reach_standing": [
                    [
                        "JaJuan Johnson"
                    ],
                    107.5
                ],
                "standing_vertical": [
                    [
                        "JaJuan Johnson"
                    ],
                    33.5
                ],
                "timeLaneAgility": [
                    [
                        "JaJuan Johnson"
                    ],
                    11.21
                ]
            },
            "Idaho": {
                "bench_reps": [
                    [
                        "Damien Wilkins"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "Damien Wilkins"
                    ],
                    7.3
                ],
                "born": [
                    [
                        "Luke Ridnour"
                    ],
                    1981.0
                ],
                "height_x": [
                    [
                        "Damien Wilkins"
                    ],
                    76.5
                ],
                "height_y": [
                    [
                        "Damien Wilkins"
                    ],
                    208.0
                ]
            },
            "West Virginia": {
                "bench_reps": [
                    [
                        "Deron Williams",
                        "George King"
                    ],
                    15.0
                ],
                "body_fat_pct": [
                    [
                        "George King"
                    ],
                    7.25
                ],
                "born": [
                    [
                        "George King"
                    ],
                    1928.0
                ],
                "height_x": [
                    [
                        "George King"
                    ],
                    76.75
                ],
                "height_y": [
                    [
                        "George King"
                    ],
                    183.0
                ],
                "lengthHandInches": [
                    [
                        "George King"
                    ],
                    9.0
                ],
                "max_vertical": [
                    [
                        "George King"
                    ],
                    39.0
                ],
                "reach_standing": [
                    [
                        "George King"
                    ],
                    101.5
                ],
                "standing_vertical": [
                    [
                        "George King"
                    ],
                    31.0
                ],
                "timeLaneAgility": [
                    [
                        "George King"
                    ],
                    10.75
                ],
                "timeModifiedLaneAgility": [
                    [
                        "George King"
                    ],
                    3.08
                ],
                "timeThreeQuarterCourtSprint": [
                    [
                        "George King"
                    ],
                    3.29
                ],
                "weight_x": [
                    [
                        "George King"
                    ],
                    218.6
                ],
                "weight_y": [
                    [
                        "George King"
                    ],
                    79.0
                ],
                "widthHandInches": [
                    [
                        "George King"
                    ],
                    10.25
                ],
                "wingspan": [
                    [
                        "George King"
                    ],
                    83.5
                ]
            },
            "New Hampshire": {
                "bench_reps": [
                    [
                        "Matt Bonner"
                    ],
                    20.0
                ],
                "body_fat_pct": [
                    [
                        "Matt Bonner"
                    ],
                    13.6
                ],
                "born": [
                    [
                        "Matt Bonner"
                    ],
                    1980.0
                ],
                "height_x": [
                    [
                        "Matt Bonner"
                    ],
                    80.5
                ],
                "height_y": [
                    [
                        "Matt Bonner"
                    ],
                    208.0
                ]
            
            }
    };
    const usaPlayersData = {
        "California": 337,
        "New York": 286,
        "Illinois": 203,
        "Pennsylvania": 162,
        "Ohio": 136,
        "Michigan": 131,
        "Texas": 127,
        "Georgia": 113,
        "Louisiana": 101,
        "North Carolina": 96,
        "Indiana": 94,
        "Florida": 93,
        "New Jersey": 91,
        "Kentucky": 82,
        "Alabama": 74,
        "Tennessee": 72,
        "Mississippi": 72,
        "Maryland": 61,
        "Virginia": 60,
        "District of Columbia": 57,
        "Washington": 48,
        "Arkansas": 47,
        "Missouri": 45,
        "Minnesota": 45,
        "Wisconsin": 44,
        "Massachusetts": 36,
        "South Carolina": 33,
        "Connecticut": 32,
        "Oklahoma": 30,
        "Kansas": 27,
        "Oregon": 23,
        "Iowa": 20,
        "West Virginia": 19,
        "Utah": 17,
        "Colorado": 16,
        "Arizona": 12,
        "Nebraska": 11,
        "Montana": 9,
        "North Dakota": 6,
        "Rhode Island": 6,
        "New Mexico": 6,
        "Delaware": 6,
        "Nevada": 6,
        "Wyoming": 5,
        "South Dakota": 5,
        "Idaho": 5,
        "Hawaii": 2,
        "New Hampshire": 1,
        "Alaska": 1,
        "Maine": 1
    };
    const playersData= {
        "Spain": {
            "bench_reps": [
                [
                    "Rudy Fernandez"
                ],
                0.0
            ]
        },
        "Canada": {
            "bench_reps": [
                [
                    "Andrew Nicholson"
                ],
                10.0
            ],
            "body_fat_pct": [
                [
                    "Cory Joseph"
                ],
                9.7
            ],
            "born": [
                [
                    "Kelly Olynyk",
                    "Tristan Thompson",
                    "Cory Joseph"
                ],
                1991.0
            ],
            "height_x": [
                [
                    "Kelly Olynyk"
                ],
                82.75
            ],
            "height_y": [
                [
                    "Kelly Olynyk"
                ],
                213.0
            ],
            "lengthHandInches": [
                [
                    "Andrew Nicholson"
                ],
                10.0
            ],
            "max_vertical": [
                [
                    "Tristan Thompson",
                    "Cory Joseph"
                ],
                35.0
            ],
            "reach_standing": [
                [
                    "Tristan Thompson"
                ],
                108.5
            ],
            "standing_vertical": [
                [
                    "Tristan Thompson"
                ],
                30.0
            ],
            "timeLaneAgility": [
                [
                    "Andrew Nicholson"
                ],
                11.89
            ],
            "timeModifiedLaneAgility": [
                [
                    "Kelly Olynyk"
                ],
                2.99
            ],
            "timeThreeQuarterCourtSprint": [
                [
                    "Kelly Olynyk"
                ],
                3.59
            ],
            "weight_x": [
                [
                    "Kelly Olynyk"
                ],
                234.0
            ],
            "weight_y": [
                [
                    "Kelly Olynyk"
                ],
                107.0
            ],
            "widthHandInches": [
                [
                    "Kelly Olynyk"
                ],
                10.0
            ],
            "wingspan": [
                [
                    "Kelly Olynyk"
                ],
                81.75
            ]
        },
        "Slovenia": {
            "bench_reps": [
                [
                    "Beno Udrih"
                ],
                2.0
            ],
            "body_fat_pct": [
                [
                    "Sasha Vujacic"
                ],
                14.1
            ],
            "born": [
                [
                    "Sasha Vujacic"
                ],
                1984.0
            ],
            "height_x": [
                [
                    "Sasha Vujacic"
                ],
                77.5
            ],
            "height_y": [
                [
                    "Sasha Vujacic"
                ],
                201.0
            ]
        },
        "Germany": {
            "bench_reps": [
                [
                    "Carlos Boozer"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Donte Greene"
                ],
                7.6
            ],
            "born": [
                [
                    "Dennis Schroder"
                ],
                1993.0
            ],
            "height_x": [
                [
                    "Anthony Randolph"
                ],
                81.0
            ],
            "height_y": [
                [
                    "Donte Greene"
                ],
                211.0
            ],
            "lengthHandInches": [
                [
                    "Dennis Schroder"
                ],
                8.75
            ],
            "max_vertical": [
                [
                    "Dennis Schroder"
                ],
                34.0
            ],
            "reach_standing": [
                [
                    "Dennis Schroder"
                ],
                98.0
            ],
            "standing_vertical": [
                [
                    "Dennis Schroder"
                ],
                30.0
            ],
            "timeLaneAgility": [
                [
                    "Dennis Schroder"
                ],
                11.09
            ],
            "timeModifiedLaneAgility": [
                [
                    "Dennis Schroder"
                ],
                2.86
            ],
            "timeThreeQuarterCourtSprint": [
                [
                    "Dennis Schroder"
                ],
                3.21
            ],
            "weight_x": [
                [
                    "Dennis Schroder"
                ],
                164.8
            ],
            "weight_y": [
                [
                    "Dennis Schroder"
                ],
                78.0
            ],
            "widthHandInches": [
                [
                    "Dennis Schroder"
                ],
                10.5
            ],
            "wingspan": [
                [
                    "Dennis Schroder"
                ],
                79.75
            ]
        },
        "Greece": {
            "bench_reps": [
                [
                    "Antonis Fotsis"
                ],
                2.0
            ]
        },
        "New Zealand": {
            "bench_reps": [
                [
                    "Steven Adams"
                ],
                16.0
            ],
            "body_fat_pct": [
                [
                    "Kirk Penney"
                ],
                8.0
            ],
            "born": [
                [
                    "Steven Adams"
                ],
                1993.0
            ],
            "height_x": [
                [
                    "Steven Adams"
                ],
                82.75
            ],
            "height_y": [
                [
                    "Steven Adams"
                ],
                213.0
            ],
            "lengthHandInches": [
                [
                    "Steven Adams"
                ],
                9.5
            ],
            "max_vertical": [
                [
                    "Steven Adams"
                ],
                33.0
            ],
            "reach_standing": [
                [
                    "Steven Adams"
                ],
                109.5
            ],
            "standing_vertical": [
                [
                    "Steven Adams"
                ],
                28.5
            ],
            "timeLaneAgility": [
                [
                    "Steven Adams"
                ],
                11.85
            ],
            "timeModifiedLaneAgility": [
                [
                    "Steven Adams"
                ],
                3.02
            ],
            "timeThreeQuarterCourtSprint": [
                [
                    "Steven Adams"
                ],
                3.4
            ],
            "weight_x": [
                [
                    "Steven Adams"
                ],
                254.5
            ],
            "weight_y": [
                [
                    "Steven Adams"
                ],
                115.0
            ],
            "widthHandInches": [
                [
                    "Steven Adams"
                ],
                11.0
            ],
            "wingspan": [
                [
                    "Steven Adams"
                ],
                88.5
            ]
        },
        "Australia": {
            "bench_reps": [
                [
                    "Andrew Bogut"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Joe Ingles"
                ],
                10.1
            ],
            "born": [
                [
                    "Joe Ingles"
                ],
                1987.0
            ],
            "height_x": [
                [
                    "Joe Ingles"
                ],
                79.75
            ],
            "height_y": [
                [
                    "Joe Ingles"
                ],
                203.0
            ]
        },
        "Croatia": {
            "bench_reps": [
                [
                    "Predrag Savovic"
                ],
                13.0
            ]
        },
        "Russia": {
            "bench_reps": [
                [
                    "Sasha Kaun"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Sasha Kaun"
                ],
                9.6
            ],
            "born": [
                [
                    "Sasha Kaun"
                ],
                1985.0
            ],
            "height_x": [
                [
                    "Sasha Kaun"
                ],
                81.0
            ],
            "height_y": [
                [
                    "Sasha Kaun"
                ],
                211.0
            ]
        },
        "Israel": {
            "bench_reps": [
                [
                    "Omri Casspi"
                ],
                2.0
            ],
            "body_fat_pct": [
                [
                    "Omri Casspi"
                ],
                8.6
            ],
            "born": [
                [
                    "Omri Casspi"
                ],
                1988.0
            ],
            "height_x": [
                [
                    "Omri Casspi"
                ],
                79.75
            ],
            "height_y": [
                [
                    "Omri Casspi"
                ],
                206.0
            ]
        },
        "Dominican Republic": {
            "bench_reps": [
                [
                    "Al Horford"
                ],
                20.0
            ],
            "body_fat_pct": [
                [
                    "Al Horford"
                ],
                9.1
            ],
            "born": [
                [
                    "Al Horford"
                ],
                1986.0
            ],
            "height_x": [
                [
                    "Al Horford"
                ],
                80.0
            ],
            "height_y": [
                [
                    "Al Horford"
                ],
                208.0
            ]
        },
        "Poland": {
            "bench_reps": [
                [
                    "Marcin Gortat"
                ],
                18.0
            ]
        },
        "Lithuania": {
            "bench_reps": [
                [
                    "Darius Songaila"
                ],
                8.0
            ]
        },
        "Serbia": {
            "bench_reps": [
                [
                    "Darko Milicic"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Darko Milicic"
                ],
                8.0
            ],
            "born": [
                [
                    "Darko Milicic"
                ],
                1985.0
            ],
            "height_x": [
                [
                    "Darko Milicic"
                ],
                83.5
            ],
            "height_y": [
                [
                    "Darko Milicic"
                ],
                213.0
            ]
        },
        "Guyana": {
            "bench_reps": [
                [
                    "Rawle Marshall"
                ],
                7.0
            ]
        },
        "Panama": {
            "bench_reps": [
                [
                    "Gary Forbes"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Gary Forbes"
                ],
                6.5
            ],
            "born": [
                [
                    "Gary Forbes"
                ],
                1985.0
            ],
            "height_x": [
                [
                    "Gary Forbes"
                ],
                76.5
            ],
            "height_y": [
                [
                    "Gary Forbes"
                ],
                201.0
            ]
        },
        "Nigeria": {
            "bench_reps": [
                [
                    "Festus Ezeli"
                ],
                18.0
            ],
            "body_fat_pct": [
                [
                    "Festus Ezeli"
                ],
                5.5
            ],
            "born": [
                [
                    "Festus Ezeli"
                ],
                1989.0
            ],
            "height_x": [
                [
                    "Festus Ezeli"
                ],
                81.75
            ],
            "height_y": [
                [
                    "Festus Ezeli"
                ],
                211.0
            ],
            "lengthHandInches": [
                [
                    "Festus Ezeli"
                ],
                9.0
            ],
            "max_vertical": [
                [
                    "Festus Ezeli"
                ],
                33.5
            ],
            "reach_standing": [
                [
                    "Festus Ezeli"
                ],
                108.0
            ],
            "standing_vertical": [
                [
                    "Festus Ezeli"
                ],
                34.0
            ],
            "timeLaneAgility": [
                [
                    "Festus Ezeli"
                ],
                12.35
            ]
        },
        "France": {
            "bench_reps": [
                [
                    "Erik Murphy"
                ],
                13.0
            ],
            "body_fat_pct": [
                [
                    "Erik Murphy"
                ],
                7.95
            ],
            "born": [
                [
                    "Rudy Gobert"
                ],
                1992.0
            ],
            "height_x": [
                [
                    "Rudy Gobert"
                ],
                84.5
            ],
            "height_y": [
                [
                    "Rudy Gobert"
                ],
                216.0
            ],
            "lengthHandInches": [
                [
                    "Rudy Gobert"
                ],
                9.75
            ],
            "max_vertical": [
                [
                    "Erik Murphy"
                ],
                29.5
            ],
            "reach_standing": [
                [
                    "Rudy Gobert"
                ],
                115.0
            ],
            "standing_vertical": [
                [
                    "Rudy Gobert"
                ],
                25.0
            ],
            "timeLaneAgility": [
                [
                    "Rudy Gobert"
                ],
                12.85
            ],
            "timeModifiedLaneAgility": [
                [
                    "Rudy Gobert"
                ],
                3.19
            ],
            "timeThreeQuarterCourtSprint": [
                [
                    "Rudy Gobert",
                    "Erik Murphy"
                ],
                3.57
            ],
            "weight_x": [
                [
                    "Erik Murphy"
                ],
                239.8
            ],
            "weight_y": [
                [
                    "Rudy Gobert"
                ],
                111.0
            ],
            "widthHandInches": [
                [
                    "Rudy Gobert"
                ],
                10.0
            ],
            "wingspan": [
                [
                    "Rudy Gobert"
                ],
                92.5
            ]
        },
        "Belgium": {
            "bench_reps": [
                [
                    "Xavier Henry"
                ],
                8.0
            ],
            "body_fat_pct": [
                [
                    "Xavier Henry"
                ],
                4.7
            ],
            "born": [
                [
                    "Xavier Henry"
                ],
                1991.0
            ],
            "height_x": [
                [
                    "Xavier Henry"
                ],
                77.25
            ],
            "height_y": [
                [
                    "Xavier Henry"
                ],
                198.0
            ],
            "lengthHandInches": [
                [
                    "Xavier Henry"
                ],
                8.75
            ],
            "max_vertical": [
                [
                    "Xavier Henry"
                ],
                36.5
            ],
            "reach_standing": [
                [
                    "Xavier Henry"
                ],
                105.0
            ],
            "standing_vertical": [
                [
                    "Xavier Henry"
                ],
                28.5
            ],
            "timeLaneAgility": [
                [
                    "Xavier Henry"
                ],
                11.1
            ]
        },
        "United Kingdom": {
            "bench_reps": [
                [
                    "Pops Mensah-Bonsu"
                ],
                19.0
            ],
            "body_fat_pct": [
                [
                    "Pops Mensah-Bonsu"
                ],
                5.8
            ],
            "born": [
                [
                    "Pops Mensah-Bonsu"
                ],
                1983.0
            ],
            "height_x": [
                [
                    "Pops Mensah-Bonsu"
                ],
                79.5
            ],
            "height_y": [
                [
                    "Pops Mensah-Bonsu"
                ],
                206.0
            ]
        },
        "Turkey": {
            "bench_reps": [
                [
                    "Ersan Ilyasova"
                ],
                2.0
            ]
        },
        "Senegal": {
            "bench_reps": [
                [
                    "Pape Sow"
                ],
                18.0
            ],
            "body_fat_pct": [
                [
                    "Pape Sow"
                ],
                9.3
            ],
            "born": [
                [
                    "Pape Sow"
                ],
                1981.0
            ],
            "height_x": [
                [
                    "Pape Sow"
                ],
                80.5
            ],
            "height_y": [
                [
                    "Pape Sow"
                ],
                208.0
            ]
        },
        "Argentina": {
            "bench_reps": [
                [
                    "Pepe Sanchez"
                ],
                8.0
            ]
        },
        "South Sudan": {
            "bench_reps": [
                [
                    "Deng Gai"
                ],
                11.0
            ]
        },
        "Martinique": {
            "bench_reps": [
                [
                    "Ronny Turiaf"
                ],
                15.0
            ]
        },
        "Brazil": {
            "bench_reps": [
                [
                    "Fab Melo"
                ],
                9.0
            ],
            "body_fat_pct": [
                [
                    "Fab Melo"
                ],
                9.2
            ],
            "born": [
                [
                    "Fab Melo"
                ],
                1990.0
            ],
            "height_x": [
                [
                    "Fab Melo"
                ],
                82.75
            ],
            "height_y": [
                [
                    "Fab Melo"
                ],
                213.0
            ],
            "lengthHandInches": [
                [
                    "Fab Melo"
                ],
                9.0
            ],
            "max_vertical": [
                [
                    "Fab Melo"
                ],
                31.0
            ],
            "reach_standing": [
                [
                    "Fab Melo"
                ],
                110.0
            ],
            "standing_vertical": [
                [
                    "Fab Melo"
                ],
                29.5
            ],
            "timeLaneAgility": [
                [
                    "Fab Melo"
                ],
                12.14
            ]
        },
        "Gabon": {
            "bench_reps": [
                [
                    "Stephane Lasme"
                ],
                17.0
            ],
            "body_fat_pct": [
                [
                    "Stephane Lasme"
                ],
                4.9
            ],
            "born": [
                [
                    "Stephane Lasme"
                ],
                1982.0
            ],
            "height_x": [
                [
                    "Stephane Lasme"
                ],
                77.0
            ],
            "height_y": [
                [
                    "Stephane Lasme"
                ],
                203.0
            ]
        },
        "Guadeloupe": {
            "bench_reps": [
                [
                    "Rodrigue Beaubois"
                ],
                3.0
            ],
            "body_fat_pct": [
                [
                    "Rodrigue Beaubois"
                ],
                7.9
            ],
            "born": [
                [
                    "Rodrigue Beaubois"
                ],
                1988.0
            ],
            "height_x": [
                [
                    "Rodrigue Beaubois"
                ],
                73.25
            ],
            "height_y": [
                [
                    "Rodrigue Beaubois"
                ],
                183.0
            ]
        },
        "Switzerland": {
            "bench_reps": [
                [
                    "Enes Kanter"
                ],
                14.0
            ],
            "body_fat_pct": [
                [
                    "Enes Kanter"
                ],
                5.9
            ],
            "born": [
                [
                    "Enes Kanter"
                ],
                1992.0
            ],
            "height_x": [
                [
                    "Enes Kanter"
                ],
                81.75
            ],
            "height_y": [
                [
                    "Enes Kanter"
                ],
                211.0
            ],
            "lengthHandInches": [
                [
                    "Enes Kanter"
                ],
                9.5
            ],
            "max_vertical": [
                [
                    "Enes Kanter"
                ],
                32.5
            ],
            "reach_standing": [
                [
                    "Enes Kanter"
                ],
                109.5
            ],
            "standing_vertical": [
                [
                    "Enes Kanter"
                ],
                26.0
            ],
            "timeLaneAgility": [
                [
                    "Enes Kanter"
                ],
                11.3
            ]
        },
        "USA": {
            "bench_reps": [
                [
                    "Joey Graham"
                ],
                26.0
            ],
            "body_fat_pct": [
                [
                    "Dexter Pittman"
                ],
                20.8
            ],
            "born": [
                [
                    "Henry Ellenson",
                    "Marquese Chriss"
                ],
                1997.0
            ],
            "height_x": [
                [
                    "Loren Woods"
                ],
                84.75
            ],
            "height_y": [
                [
                    "Spencer Hawes",
                    "Loren Woods",
                    "Martell Webster",
                    "Meyers Leonard"
                ],
                216.0
            ],
            "lengthHandInches": [
                [
                    "Dexter Pittman"
                ],
                10.25
            ],
            "max_vertical": [
                [
                    "Kay Felder",
                    "Pat Connaughton",
                    "Shane Larkin"
                ],
                44.0
            ],
            "reach_standing": [
                [
                    "JaVale McGee"
                ],
                114.5
            ],
            "standing_vertical": [
                [
                    "Nick Young"
                ],
                39.5
            ],
            "timeLaneAgility": [
                [
                    "Jackie Butler"
                ],
                13.32
            ],
            "timeModifiedLaneAgility": [
                [
                    "Michael Carter-Williams"
                ],
                3.7
            ],
            "timeThreeQuarterCourtSprint": [
                [
                    "Derrick Caracter"
                ],
                3.61
            ],
            "weight_x": [
                [
                    "Dexter Pittman"
                ],
                302.6
            ],
            "weight_y": [
                [
                    "Dexter Pittman"
                ],
                139.0
            ],
            "widthHandInches": [
                [
                    "Noah Vonleh"
                ],
                11.75
            ],
            "wingspan": [
                [
                    "Hassan Whiteside"
                ],
                91.0
            ]
        }
    };
    const worldPlayersData = {
        "Canada": 26,
        "Germany": 12,
        "Australia": 8,
        "Nigeria": 8,
        "United Kingdom": 7,
        "France": 7,
        "Dominican Rep.": 6,  // Cambiado a "Dominican Rep." (sin "Republic")
        "Jamaica": 6,
        "Senegal": 6,
        "Puerto Rico": 5,
        "Bahamas": 5,
        "Netherlands": 5,
        "Haiti": 4,
        "Panama": 4,
        "New Zealand": 4,
        "Brazil": 3,
        "Mexico": 3,
        "Ukraine": 3,
        "Lithuania": 3,
        "Cameroon": 3,
        "U.S. Virgin Islands": 3,
        "S. Sudan": 3,  // Cambiado a "S. Sudan" (sin "South")
        "Lebanon": 2,
        "Croatia": 2,
        "Guyana": 2,
        "Argentina": 2,
        "Ireland": 1,
        "Luxembourg": 1,
        "Japan": 1,
        "Denmark": 1,
        "Martinique": 1,
        "Gabon": 1,
        "Taiwan": 1,
        "Tanzania": 1, // Cambiado a "Tanzania" (sin "United Republic of")
        "Belgium": 1,
        "Venezuela": 1,
        "Italy": 1,
        "Switzerland": 1,
        "Israel": 1,
        "Russia": 1,
        "Mali": 1,
        "St. Vin. and Gren.": 1, // Cambiado a "St. Vin. and Gren."
        "Finland": 1,
        "Dominica": 1,
        "Iceland": 1,
        "Spain": 1,
        "Morocco": 1,
        "China": 1,
        "Norway": 1,
        "Egypt": 1,
        "Serbia": 1,
        "Poland": 1,
        "Trinidad and Tobago": 1,
        "Dem. Rep. Congo": 1, // Cambiado a "Dem. Rep. Congo"
        "Slovakia": 1,
        "Czechia": 1,  // Cambiado a "Czechia" 
        "South Africa": 1,
        "Romania": 1,
        "Sweden": 1,
        "Montenegro": 1,
        "Austria": 1,
        "USA":3012
    };

    const tooltip = d3.select("#tooltip"); 
    // Crear mapa del mundo
    function crearMapaMundo(datosMapa) {
        const projection = d3.geoNaturalEarth1()
            .fitSize([width_mapa, height_mapa], datosMapa);
        const path = d3.geoPath().projection(projection);

        // Tooltip dentro del SVG (DESPUÉS de los paths)
        const tooltip2 = d3.select("#legend-content");
        const tooltip = svg.append("g") 
            .attr("class", "tooltip")
            .style("opacity", 0);

        tooltip.append("rect")
            .attr("rx", 5)
            .attr("ry", 5);

        tooltip.append("text")
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central");

        contenedorMapa.selectAll("path")
            .data(datosMapa.features)
            .join("path")
            .attr("d", path)
            .attr("fill", "lightblue")
            .attr("stroke", "white")
            .on("click", function(event, d) {
                const pais = d.properties.name;
                const numJugadores = worldPlayersData[pais] || 0; // Obtener cantidad o 0 si no existe
                const atributos = playersData[pais];
                if (atributos) {
                    let tooltipText = `<strong>${pais}</strong><br/>`;

                    for (const atributo in atributos) {
                        const jugadores = atributos[atributo][0];
                        const valorMaximo = atributos[atributo][1];
                        const jugadoresTexto = Array.isArray(jugadores) ? jugadores.join(", ") : jugadores;

                        tooltipText += `<span style="font-weight: bold;">Estadistica: ${atributo}:</span> ${jugadoresTexto} (<span style="color: blue;">Record Nacional:${valorMaximo}</span>)<br/>`;
                    }

                    tooltip2.html(tooltipText); // Actualizar el contenido del div
                } else {
                    tooltip2.text("No hay datos disponibles para este país."); 
                }
                    
                // Obtener el punto donde se hizo clic (en coordenadas del mapa)
                const[x, y] = projection.invert(d3.pointer(event));

                // Encontrar el centroide más cercano dentro del país
                const centroid = d3.geoCentroid(d);
                const distance = d3.geoDistance(centroid, [x, y]);
                const nearestCentroid = d3.geoContains(d, [x, y]) ? centroid : d3.geoCentroid(d); 

                // Posicionar el tooltip en el centroide más cercano
                const [tooltipX, tooltipY] = projection(nearestCentroid);

                // Mostrar el nombre del país y la cantidad de jugadores
                tooltip.attr("transform", `translate(${tooltipX},${tooltipY})`);
                tooltip.select("text").text(pais +(numJugadores > 0 ? `\n${numJugadores} ${numJugadores === 1 ? "jugador de NBA" : "jugadoresNBA"}` : ""));

                // Ajustar tamaño del rectángulo del tooltip
                const bbox = tooltip.select("text").node().getBBox();
                tooltip.select("rect")
                    .attr("width", bbox.width + 20) // Agregar padding para que se vea mejor
                    .attr("height", bbox.height + 20)
                    .attr("rx", 8) // Aumentar el radio de los bordes redondeados
                    .attr("fill", "white") // Fondo blanco
                    .attr("stroke", "#ccc") // Borde gris claro
                    .attr("stroke-width", 3) // Grosor del borde
                    .attr("x", -bbox.width / 2 - 10) // Centrar horizontalmente
                    .attr("y", -bbox.height / 2 );


                tooltip.style("opacity", 1);
            })
            .on("mouseout", function() {
                tooltip.transition() // Iniciar una transición
                    .delay(5000) // Retraso de 5 segundos (5000 milisegundos)
                    .duration(500) // Duración de la transición (opcional)
                    .style("opacity", 0);
            });
            

            
        
        // Aplicar zoom y panning al mapa mundial (sin cambios)
        svg.call(d3.zoom()
            .extent([[0, 0], [width_mapa, height_mapa]])
            .scaleExtent([1, 8])
            .on("zoom", zoomed));
    }


    
    // Crear mapa de Estados Unidos
    function crearMapaEstadosUnidos(datosMapa) {
        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width_mapa, height_mapa], datosMapa);
        const path = d3.geoPath().projection(projection);

        // Tooltip dentro del SVG (DESPUÉS de los paths)
        const tooltip3 = d3.select("#legend-content");
        const tooltip = svg.append("g") 
            .attr("class", "tooltip")
            .style("opacity", 0);

        tooltip.append("rect")
            .attr("rx", 5)
            .attr("ry", 5);

        tooltip.append("text")
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central");

        
        contenedorMapa.selectAll("path")
            .data(datosMapa.features)
            .join("path")
            .attr("d", path)
            .attr("fill", "lightblue")
            .attr("stroke", "white")
            .on("click", function(event, d) {
                const pais = d.properties.name;
                const numJugadores = usaPlayersData[pais] || 0; // Obtener cantidad o 0 si no existe
                const atributos = usaPlayersData_json[pais];
                if (atributos) {
                    let tooltipText = `<strong>${pais}</strong><br/>`;

                    for (const atributo in atributos) {
                        const jugadores = atributos[atributo][0];
                        const valorMaximo = atributos[atributo][1];
                        const jugadoresTexto = Array.isArray(jugadores) ? jugadores.join(", ") : jugadores;

                        tooltipText += `<span style="font-weight: bold;">Estadistica: ${atributo}:</span> ${jugadoresTexto} (<span style="color: blue;">Record Esatatal:${valorMaximo}</span>)<br/>`;
                    }

                    tooltip3.html(tooltipText); // Actualizar el contenido del div
                } else {
                    tooltip3.text("No hay datos disponibles para este país."); 
                }
                    
                // Obtener el punto donde se hizo clic (en coordenadas del mapa)
                const[x, y] = projection.invert(d3.pointer(event));

                // Encontrar el centroide más cercano dentro del país
                const centroid = d3.geoCentroid(d);
                const distance = d3.geoDistance(centroid, [x, y]);
                const nearestCentroid = d3.geoContains(d, [x, y]) ? centroid : d3.geoCentroid(d); 

                // Posicionar el tooltip en el centroide más cercano
                const [tooltipX, tooltipY] = projection(nearestCentroid);

                // Mostrar el nombre del país y la cantidad de jugadores
                tooltip.attr("transform", `translate(${tooltipX},${tooltipY})`);
                tooltip.select("text").text(pais +(numJugadores > 0 ? `\n${numJugadores} ${numJugadores === 1 ? "jugador de NBA" : "jugadoresNBA"}` : ""));

                // Ajustar tamaño del rectángulo del tooltip
                const bbox = tooltip.select("text").node().getBBox();
                tooltip.select("rect")
                    .attr("width", bbox.width + 20) // Agregar padding para que se vea mejor
                    .attr("height", bbox.height + 20)
                    .attr("rx", 8) // Aumentar el radio de los bordes redondeados
                    .attr("fill", "white") // Fondo blanco
                    .attr("stroke", "#ccc") // Borde gris claro
                    .attr("stroke-width", 3) // Grosor del borde
                    .attr("x", -bbox.width / 2 - 10) // Centrar horizontalmente
                    .attr("y", -bbox.height / 2 );


                tooltip.style("opacity", 1);
            })
            .on("mouseout", function() {
                tooltip.transition() // Iniciar una transición
                    .delay(5000) // Retraso de 5 segundos (5000 milisegundos)
                    .duration(500) // Duración de la transición (opcional)
                    .style("opacity", 0);
            });
            
        
        
        // Aplicar zoom y panning al mapa de Estados Unidos
        svg.call(d3.zoom()
            .extent([[0, 0], [width_mapa, height_mapa]])
            .scaleExtent([1, 8])
            .on("zoom", zoomed));
    }

    // Comando para llamar y cambiar los mapas
    function updateVisualization(type) {
        updateLegend(type);
        clearVisualization(); // Ahora puedes llamar a clearVisualization desde aquí
        tooltip.text(""); 

        switch (type) {
            case 'Mundo':
                d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
                    .then(crearMapaMundo)
                    .catch(error => console.error("Error cargando datos del mundo:", error));
                break;
            case 'EstadosUnidos':
                d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
                    .then(crearMapaEstadosUnidos)
                    .catch(error => console.error("Error cargando datos de Estados Unidos:", error));
                break;
        }
    }
    

    // Event listeners para los botones (corregidos los IDs)
    document.getElementById('Mundo').addEventListener('click', function() {
        updateVisualization('Mundo');
    });

    document.getElementById('EstadosUnidos').addEventListener('click', function() {
        updateVisualization('EstadosUnidos');
    });
}
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
createCirclePacking("draft_combine_train.csv", "#myChart");