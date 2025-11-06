
async function fetchStockData() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRAzrHIoRKxD0ssg-UZ2KLUV59zl1lIYTSH61qgG42MIJXOntWqFshr6lKlbyHMmEqzPXb8mxi2Usdw/pub?output=csv');
        const csvData = await response.text();
        const rows = csvData.split('\n').slice(1); 
        const dates = [];
        const closingPrices = [];

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 5) {
                dates.push(columns[0]); 
                closingPrices.push(parseFloat(columns[4]));
            }
        });

        return { dates, closingPrices };
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return { dates: [], closingPrices: [] };
    }
}


        function toggleText(id) {
            const el = document.getElementById(id);
            el.style.display = el.style.display === 'block' ? 'none' : 'block';
        }


Chart.register(ChartDataLabels);
Chart.defaults.plugins.datalabels.display = true;


const crashCtx = document.getElementById('crashChart').getContext('2d');
let currentView = 'main';

const mainData = {
    labels: ['Boeing Crash', 'Airbus Crash'],
    datasets: [{
        data: [314, 91],
        backgroundColor: [ '#dc2626','#1e40af'],
        borderWidth: 2,
        borderColor: '#fff'
    }]
};
const detailData = {
    labels: ['Erreur Humaine', 'Erreur Machine', 'Erreur Ground Crew'],
    datasets: [{
        data: [219, 134, 52],
        backgroundColor: ['#f59e0b', '#8b5cf6', '#10b981'],
        borderWidth: 2,
        borderColor: '#fff'
    }]
};

const crashChart = new Chart(crashCtx, {
    type: 'pie',
    data: mainData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { font: { size: 14 }, padding: 15 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} crashes (${percent}%)`;
                    }
                }
            },
            datalabels: {
                display: true,
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: function(value, context) {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(1);
                    return `${percent}%`;
                }
            }
        },
        onClick: function() {
            if (currentView === 'main') {
                crashChart.data = detailData;
                currentView = 'detail';
            } else {
                crashChart.data = mainData;
                currentView = 'main';
            }
            crashChart.update();
        }
    }
});


        // GRAPHIQUE 2.
const stockCtx = document.getElementById('stockChart').getContext('2d');


function calculatePercentageChanges(data) {
    let percentages = [];
    for (let i = 1; i < data.length; i++) {
        const change = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
        percentages.push(change.toFixed(2) + '%');
    }
    return percentages;
}

const stockData = [37.25, 40.06, 37.88, 39.5, 39.94];
const percentageChanges = calculatePercentageChanges(stockData);

new Chart(stockCtx, {
    type: 'line',
    data: {
        labels: ['Jour 0', 'Jour 1', 'Jour 2', 'Jour 3', 'Jour 4'],
        datasets: [{
            label: 'Cours de clôture ($)',
            data: stockData,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#2563eb',
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Cours: $${context.parsed.y.toFixed(2)}`;
                    },
                    afterLabel: function(context) {
                        const index = context.dataIndex;
                        if (index > 0) {
                            return `Évolution: ${percentageChanges[index - 1]}`;
                        }
                        return '';
                    }
                }
            },
                        datalabels: {
                display: false,
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: function(value, context) {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(1);
                    return `${percent}%`;
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: { display: true, text: 'Cours ($)', font: { weight: 'bold' } }
            }
        }
    }
});


        // GRAPHIQUE 3
        const aidesCtx = document.getElementById('aidesChart').getContext('2d');
        const aidesData = [0, 0, 0, 150000000, 154987595, 154987595, 163354870, 364354870, 364620118, 3604853614, 3606535354, 3606772105, 3606820205, 3630308121, 3636871523, 4539379241, 4558431011, 4582444861, 4592947665, 13419497976, 13685908065, 14185576362];
        const years = ['1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];

        new Chart(aidesCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: "Aides de l'État ($)",
                    data: aidesData,
                    backgroundColor: '#10b981',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                return `Aides: $${(value / 1000000000).toFixed(2)}B`;
                            }
                        }
                    },
                                datalabels: {
                display: false,
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: function(value, context) {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(1);
                    return `${percent}%`;
                }
            }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000000).toFixed(1) + 'B';
                            }
                        },
                        title: { display: true, text: 'Montant ($)', font: { weight: 'bold' } }
                    },
                    x: {
                        ticks: { maxRotation: 45, minRotation: 45 }
                    }
                }
            }
        });

        // GRAPHIQUE 4
const cumulativeCtx = document.getElementById('cumulativeChart').getContext('2d');

const boeingCumul = [3, 5, 6, 8, 9, 11, 14, 18, 21, 23, 27, 29, 34, 37, 39, 41, 43, 44, 46, 49, 52, 54, 55, 57, 67, 73, 81, 89, 92, 99, 103, 108, 110, 112, 124, 130, 131, 136, 140, 145, 151, 154, 161, 167, 173, 176, 186, 189, 195, 200];
const airbusCumul = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 2, 12, 19, 28, 35, 0, 41, 49, 54, 62, 63, 73, 79, 80, 85, 89, 94, 100, 103, 109, 114, 120, 123, 133, 0, 139, 144];

new Chart(cumulativeCtx, {
    type: 'bar',
    data: {
        labels: ['1970', '1972', '1973', '1977', '1978', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
            {
                label: 'Boeing',
                data: boeingCumul,
                backgroundColor: '#dc2626',
                borderRadius: 4

                
            },
            {
                label: 'Airbus',
                data: airbusCumul,
                backgroundColor: 'rgba(37, 99, 235, 1)',
                borderRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' },
                                            datalabels: {
                display: false,
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: function(value, context) {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(1);
                    return `${percent}%`;
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        const boeingValue = boeingCumul[context.dataIndex];
                        const airbusValue = airbusCumul[context.dataIndex];
                        const difference = boeingValue - airbusValue;

                        if (context.datasetIndex === 0) {
                            return [
                                `Boeing: ${boeingValue} crashes`,
                                `Airbus: ${airbusValue} crashes`,
                                `Écart: ${difference} crashes`
                            ];
                        }
                        return null;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Crashes cumulés', font: { weight: 'bold' } }
            },
            x: {
                ticks: { maxRotation: 45, minRotation: 45, autoSkip: true, maxTicksLimit: 20 }
            }
        }
    }
});

