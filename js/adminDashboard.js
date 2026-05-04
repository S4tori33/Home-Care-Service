// Admin Dashboard Charts

// Trend Chart (Bookings & Revenue)
const trendCtx = document.getElementById('trendChart').getContext('2d');
const trendChart = new Chart(trendCtx, {
    type: 'line',
    data: {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: 'Bookings',
                data: [45, 60, 75, 85, 75, 95, 105],
                borderColor: '#3b5bdb',
                backgroundColor: 'rgba(59, 91, 219, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#3b5bdb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                yAxisID: 'y'
            },
            {
                label: 'Revenue ($)',
                data: [5000, 7000, 10500, 11500, 10500, 13500, 14000],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                yAxisID: 'y1'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Bookings',
                    color: '#3b5bdb'
                },
                ticks: {
                    color: '#666'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Revenue ($)',
                    color: '#22c55e'
                },
                ticks: {
                    color: '#666'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#1a1a1a',
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    usePointStyle: true,
                    padding: 15
                }
            }
        }
    }
});

// Service Distribution Chart
const distributionCtx = document.getElementById('distributionChart').getContext('2d');
const distributionChart = new Chart(distributionCtx, {
    type: 'doughnut',
    data: {
        labels: ['House Cleaning', 'Maintenance', 'Elderly Care', 'Pet Care', 'Handyman'],
        datasets: [{
            data: [30, 20, 21, 16, 13],
            backgroundColor: [
                '#3b5bdb',
                '#f97316',
                '#ef4444',
                '#8b5cf6',
                '#06b6d4'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#1a1a1a',
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    padding: 15,
                    usePointStyle: true
                }
            }
        }
    }
});

// Performance Chart (Monthly Total Bookings)
const performanceCtx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(performanceCtx, {
    type: 'bar',
    data: {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
            label: 'Total Bookings',
            data: [45, 60, 65, 75, 70, 100, 90],
            backgroundColor: '#3b5bdb',
            borderRadius: 8,
            borderSkipped: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 120,
                ticks: {
                    color: '#666',
                    stepSize: 30
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                ticks: {
                    color: '#666'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#1a1a1a',
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    usePointStyle: true,
                    padding: 15
                }
            }
        }
    }
});
