// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Render Groups
function renderGroups() {
    const groupsContainer = document.getElementById('groupsContainer');
    
    groupsData.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        
        const officersHTML = group.officers.map(officer => `
            <div class="officer">
                <div class="officer-name">${officer.name}</div>
                <div class="officer-role">${officer.role}</div>
                <div class="officer-sector">Sector: ${officer.sector}</div>
            </div>
        `).join('');
        
        groupCard.innerHTML = `
            <div class="group-header">
                <h3>${group.name}</h3>
                <span class="group-category">${group.category}</span>
            </div>
            <div class="group-body">
                <p>${group.description}</p>
                
                <div class="population">
                    👥 Population: ${group.population} members
                </div>
                
                <div class="public-badge">✓ Open for Public</div>
                
                <div class="contact-info">
                    <strong>Contact Information:</strong>
                    <div>📧 <a href="mailto:${group.email}">${group.email}</a></div>
                    <div>📞 <a href="tel:${group.phone}">${group.phone}</a></div>
                    <div>📍 ${group.address}</div>
                    <div>🌐 <a href="http://${group.website}" target="_blank">${group.website}</a></div>
                </div>
                
                <div class="officers">
                    <h4>Officers by Sector</h4>
                    ${officersHTML}
                </div>
            </div>
        `;
        
        groupsContainer.appendChild(groupCard);
    });
}

// Create Population Chart
function createChart() {
    const ctx = document.getElementById('populationChart').getContext('2d');
    
    const labels = groupsData.map(g => g.category);
    const data = groupsData.map(g => g.population);
    
    const colors = [
        '#e74c3c',  // LGBT - Red
        '#9b59b6',  // PWD - Purple
        '#f39c12',  // Senior - Orange
        '#e91e63',  // Women's - Pink
        '#3498db'   // Youth - Blue
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Member Population',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100
                    }
                }
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderGroups();
    createChart();
    console.log('Community Groups Directory Loaded!');
});