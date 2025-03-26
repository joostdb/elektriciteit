// Placeholder afbeeldingen voor de veiligheidszones visualisatie
const badkamerZoneImg = `
<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="50" width="400" height="200" fill="#e6f7ff" stroke="#0056b3" stroke-width="2"/>
    <rect x="100" y="75" width="300" height="150" fill="#b3e0ff" stroke="#0056b3" stroke-width="2"/>
    <rect x="150" y="100" width="200" height="100" fill="#80c1ff" stroke="#0056b3" stroke-width="2"/>
    <text x="250" y="40" text-anchor="middle" font-family="Arial" font-size="16">Badkamer Veiligheidszones</text>
    <text x="250" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 0</text>
    <text x="80" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 1</text>
    <text x="430" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 2</text>
</svg>
`;

const doucheZoneImg = `
<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="150" y="50" width="200" height="200" fill="#e6f7ff" stroke="#0056b3" stroke-width="2"/>
    <rect x="100" y="25" width="300" height="250" fill="#b3e0ff" stroke="#0056b3" stroke-width="2" fill-opacity="0.5"/>
    <rect x="50" y="0" width="400" height="300" fill="#80c1ff" stroke="#0056b3" stroke-width="2" fill-opacity="0.3"/>
    <text x="250" y="40" text-anchor="middle" font-family="Arial" font-size="16">Douche Veiligheidszones</text>
    <text x="250" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 0</text>
    <text x="80" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 1</text>
    <text x="430" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 2</text>
</svg>
`;

const zwembadZoneImg = `
<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="100" y="75" width="300" height="150" fill="#e6f7ff" stroke="#0056b3" stroke-width="2"/>
    <rect x="50" y="25" width="400" height="250" fill="#b3e0ff" stroke="#0056b3" stroke-width="2" fill-opacity="0.5"/>
    <rect x="0" y="0" width="500" height="300" fill="#80c1ff" stroke="#0056b3" stroke-width="2" fill-opacity="0.3"/>
    <text x="250" y="40" text-anchor="middle" font-family="Arial" font-size="16">Zwembad Veiligheidszones</text>
    <text x="250" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 0</text>
    <text x="80" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 1</text>
    <text x="430" y="150" text-anchor="middle" font-family="Arial" font-size="14">Zone 2</text>
    <text x="250" y="280" text-anchor="middle" font-family="Arial" font-size="14">Zone 3</text>
</svg>
`;

// Functie om de juiste zone afbeelding te tonen
function updateZoneVisualisatieTest() {
    const ruimteType = document.getElementById('ruimteType').value;
    const visualisatieDiv = document.getElementById('zoneVisualisatie');
    
    let zoneImg = '';
    let zoneInfo = '';
    
    switch(ruimteType) {
        case 'badkamer':
            zoneImg = badkamerZoneImg;
            zoneInfo = `
                <div class="zone-info mt-3">
                    <div class="zone zone-0 mb-2">
                        <h5>Zone 0</h5>
                        <p>Binnenruimte van bad of douche. Alleen ZLVS (12V AC of 30V DC) toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX7 (bescherming tegen onderdompeling)</p>
                    </div>
                    <div class="zone zone-1 mb-2">
                        <h5>Zone 1</h5>
                        <p>Tot 2,25m boven bad/douche en 60cm rondom. Beperkte elektrische apparaten toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX4 (bescherming tegen spatwater)</p>
                    </div>
                    <div class="zone zone-2 mb-2">
                        <h5>Zone 2</h5>
                        <p>60cm voorbij zone 1. Meer elektrische apparaten toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX4 (bescherming tegen spatwater)</p>
                    </div>
                </div>
            `;
            break;
        case 'douche':
            zoneImg = doucheZoneImg;
            zoneInfo = `
                <div class="zone-info mt-3">
                    <div class="zone zone-0 mb-2">
                        <h5>Zone 0</h5>
                        <p>Binnenruimte van de douchebak. Alleen ZLVS (12V AC of 30V DC) toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX7 (bescherming tegen onderdompeling)</p>
                    </div>
                    <div class="zone zone-1 mb-2">
                        <h5>Zone 1</h5>
                        <p>Tot 2,25m boven douchebak en 60cm rondom. Beperkte elektrische apparaten toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX4 (bescherming tegen spatwater)</p>
                    </div>
                    <div class="zone zone-2 mb-2">
                        <h5>Zone 2</h5>
                        <p>60cm voorbij zone 1. Meer elektrische apparaten toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX4 (bescherming tegen spatwater)</p>
                    </div>
                </div>
            `;
            break;
        case 'zwembad':
            zoneImg = zwembadZoneImg;
            zoneInfo = `
                <div class="zone-info mt-3">
                    <div class="zone zone-0 mb-2">
                        <h5>Zone 0</h5>
                        <p>Binnenruimte van het zwembad. Alleen ZLVS (12V AC of 30V DC) toegestaan.</p>
                        <p><strong>IP-bescherming:</strong> IPX8 (bescherming tegen langdurige onderdompeling)</p>
                    </div>
                    <div class="zone zone-1 mb-2">
                        <h5>Zone 1</h5>
                        <p>Tot 2m rondom zwembad en 2,5m boven loopvlak. Zeer beperkte elektrische apparaten.</p>
                        <p><strong>IP-bescherming:</strong> IPX5 (bescherming tegen waterstralen)</p>
                    </div>
                    <div class="zone zone-2 mb-2">
                        <h5>Zone 2</h5>
                        <p>1,5m voorbij zone 1 en 2,5m boven loopvlak. Beperkte elektrische apparaten.</p>
                        <p><strong>IP-bescherming:</strong> IPX4 (bescherming tegen spatwater)</p>
                    </div>
                </div>
            `;
            break;
    }
    
    visualisatieDiv.innerHTML = `
        <h4>Veiligheidszones in ${ruimteType.charAt(0).toUpperCase() + ruimteType.slice(1)}</h4>
        <div class="zone-container position-relative my-4">
            ${zoneImg}
        </div>
        ${zoneInfo}
    `;
}

// Overschrijf de originele functie voor testdoeleinden
window.updateZoneVisualisatie = updateZoneVisualisatieTest;

// Initialiseer de functie wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', function() {
    // Controleer of het element bestaat voordat we de functie aanroepen
    if (document.getElementById('ruimteType')) {
        updateZoneVisualisatieTest();
    }
    
    console.log('Test script geladen en geïnitialiseerd');
});
