/* AREI 2025 Controle-Tool JavaScript */

// Draadsectie Calculator
function berekenDraadsectie() {
    // Haal waarden op uit het formulier
    const stroom = parseFloat(document.getElementById('stroom').value);
    const kabelType = document.getElementById('kabelType').value;
    const installatieWijze = document.getElementById('installatieWijze').value;
    const omgevingsTemp = parseFloat(document.getElementById('omgevingsTemp').value);
    const aantalGeleiders = parseInt(document.getElementById('aantalGeleiders').value);
    
    // Valideer invoer
    if (isNaN(stroom) || stroom <= 0) {
        toonResultaat('Voer een geldige stroomsterkte in', 'danger');
        return;
    }
    
    // Basiswaarden voor verschillende kabeltypes (in A/mm²)
    const basisWaarden = {
        'XVB': {
            'inbouw': 13.5,
            'opbouw': 16.5,
            'kabelgoot': 15,
            'ondergronds': 17.5
        },
        'VOB': {
            'inbouw': 12,
            'opbouw': 14.5,
            'kabelgoot': 13,
            'ondergronds': 0 // Niet toegestaan
        },
        'EXVB': {
            'inbouw': 13,
            'opbouw': 16,
            'kabelgoot': 14.5,
            'ondergronds': 17
        }
    };
    
    // Correctiefactoren
    let tempFactor = 1;
    if (omgevingsTemp > 30) {
        tempFactor = 1 - ((omgevingsTemp - 30) * 0.05);
    }
    
    let geleidersFactor = 1;
    if (aantalGeleiders > 3) {
        geleidersFactor = 0.8;
    }
    
    // Bereken benodigde draadsectie
    if (basisWaarden[kabelType][installatieWijze] === 0) {
        toonResultaat(`${kabelType} is niet toegestaan voor ${installatieWijze} installatie`, 'danger');
        return;
    }
    
    const gecorrigeerdeBasisWaarde = basisWaarden[kabelType][installatieWijze] * tempFactor * geleidersFactor;
    const benodigdeMinimumSectie = stroom / gecorrigeerdeBasisWaarde;
    
    // Standaard draadsecties
    const standaardSecties = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    
    // Bepaal de juiste standaard sectie
    let aanbevolenSectie = standaardSecties[0];
    for (let i = 0; i < standaardSecties.length; i++) {
        if (standaardSecties[i] >= benodigdeMinimumSectie) {
            aanbevolenSectie = standaardSecties[i];
            break;
        }
    }
    
    // Controleer minimale secties volgens AREI
    let minimumSectie = 1.5; // Standaard minimum
    
    if (kabelType === 'VOB' && installatieWijze === 'opbouw') {
        minimumSectie = 2.5; // Minimum voor VOB in opbouw
    }
    
    if (aanbevolenSectie < minimumSectie) {
        aanbevolenSectie = minimumSectie;
    }
    
    // Toon resultaat
    toonResultaat(`Aanbevolen draadsectie: ${aanbevolenSectie} mm²`, 'success');
    
    // Toon extra informatie
    document.getElementById('extraInfo').innerHTML = `
        <div class="mt-3">
            <h5>Berekening details:</h5>
            <ul>
                <li>Basiswaarde voor ${kabelType} in ${installatieWijze}: ${basisWaarden[kabelType][installatieWijze]} A/mm²</li>
                <li>Temperatuurcorrectie: ${tempFactor.toFixed(2)}</li>
                <li>Correctie voor aantal geleiders: ${geleidersFactor.toFixed(2)}</li>
                <li>Gecorrigeerde basiswaarde: ${gecorrigeerdeBasisWaarde.toFixed(2)} A/mm²</li>
                <li>Berekende minimale sectie: ${benodigdeMinimumSectie.toFixed(2)} mm²</li>
                <li>Standaard sectie (afgerond): ${aanbevolenSectie} mm²</li>
            </ul>
        </div>
    `;
}

function toonResultaat(bericht, type) {
    const resultaatDiv = document.getElementById('resultaat');
    resultaatDiv.innerHTML = `<div class="alert alert-${type}">${bericht}</div>`;
}

// Veiligheidszones Visualisatie
function updateZoneVisualisatie() {
    const ruimteType = document.getElementById('ruimteType').value;
    const visualisatieDiv = document.getElementById('zoneVisualisatie');
    
    // Toon de juiste visualisatie op basis van ruimtetype
    switch(ruimteType) {
        case 'badkamer':
            visualisatieDiv.innerHTML = `
                <h4>Veiligheidszones in Badkamer</h4>
                <div class="zone-container position-relative my-4">
                    <img src="assets/badkamer_zones.png" alt="Badkamer zones" class="img-fluid">
                    <div class="zone-info">
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
                </div>
            `;
            break;
        case 'douche':
            visualisatieDiv.innerHTML = `
                <h4>Veiligheidszones in Douche</h4>
                <div class="zone-container position-relative my-4">
                    <img src="assets/douche_zones.png" alt="Douche zones" class="img-fluid">
                    <div class="zone-info">
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
                </div>
            `;
            break;
        case 'zwembad':
            visualisatieDiv.innerHTML = `
                <h4>Veiligheidszones in Zwembad</h4>
                <div class="zone-container position-relative my-4">
                    <img src="assets/zwembad_zones.png" alt="Zwembad zones" class="img-fluid">
                    <div class="zone-info">
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
                </div>
            `;
            break;
    }
}

// Differentieel Keuze Tool
function adviesDifferentieel() {
    const installatieType = document.getElementById('installatieType').value;
    const gebruiksdoel = document.getElementById('gebruiksdoel').value;
    
    let advies = '';
    let type = '';
    let gevoeligheid = '';
    
    // Bepaal type en gevoeligheid op basis van installatietype en gebruiksdoel
    if (installatieType === 'huishoudelijk') {
        type = 'Type A';
        
        if (gebruiksdoel === 'algemeen') {
            gevoeligheid = '300mA (algemene beveiliging)';
            advies = 'Voor de algemene beveiliging van een huishoudelijke installatie is een differentieel van het type A met een gevoeligheid van 300mA vereist als hoofdbeveiliging.';
        } else if (gebruiksdoel === 'vochtig') {
            gevoeligheid = '30mA (bijkomende beveiliging)';
            advies = 'Voor vochtige ruimtes (badkamers, douches, wasplaatsen) is een bijkomende differentieel van het type A met een gevoeligheid van 30mA vereist voor de betreffende stroombanen.';
        } else if (gebruiksdoel === 'zwembad') {
            gevoeligheid = '30mA (bijkomende beveiliging)';
            advies = 'Voor zwembaden en sauna\'s is een bijkomende differentieel van het type A met een gevoeligheid van 30mA vereist voor alle stroombanen in deze zones.';
        }
    } else if (installatieType === 'speciaal') {
        if (gebruiksdoel === 'algemeen') {
            type = 'Type B';
            gevoeligheid = '300mA (algemene beveiliging)';
            advies = 'Voor speciale installaties met frequentieomvormers of gelijkstroomcomponenten is een differentieel van het type B met een gevoeligheid van 300mA vereist als hoofdbeveiliging.';
        } else {
            type = 'Type B';
            gevoeligheid = '30mA (bijkomende beveiliging)';
            advies = 'Voor speciale installaties in vochtige ruimtes of met verhoogd risico is een bijkomende differentieel van het type B met een gevoeligheid van 30mA vereist voor de betreffende stroombanen.';
        }
    }
    
    // Toon resultaat
    document.getElementById('differentieelAdvies').innerHTML = `
        <div class="alert alert-info mt-3">
            <h5>Aanbevolen differentieel:</h5>
            <ul>
                <li><strong>Type:</strong> ${type}</li>
                <li><strong>Gevoeligheid:</strong> ${gevoeligheid}</li>
            </ul>
            <p>${advies}</p>
            <p><strong>Opmerking:</strong> Volgens AREI 2025 moet elke huishoudelijke installatie voorzien zijn van minstens twee differentiëlen: één algemene (300mA) en minstens één bijkomende (30mA) voor vochtige ruimtes en speciale toepassingen.</p>
        </div>
    `;
}

// Keuring Checklist
function updateKeuringChecklist() {
    const installatieType = document.getElementById('keuringType').value;
    const checklistDiv = document.getElementById('keuringChecklist');
    
    if (installatieType === 'nieuw') {
        checklistDiv.innerHTML = `
            <h4>Checklist voor Nieuwe Installatie</h4>
            <div class="card mb-3">
                <div class="card-header">Vereiste Documenten</div>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check1">
                        <label class="form-check-label" for="check1">Ééndraadsschema van de installatie</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check2">
                        <label class="form-check-label" for="check2">Situatieschema met aanduiding van de leidingen</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check3">
                        <label class="form-check-label" for="check3">Verslag van gelijkvormigheid van het materiaal</label>
                    </div>
                </div>
            </div>
            
            <div class="card mb-3">
                <div class="card-header">Algemene Vereisten</div>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check4">
                        <label class="form-check-label" for="check4">Algemene differentieel 300mA</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check5">
                        <label class="form-check-label" for="check5">Bijkomende differentieel 30mA voor vochtige ruimtes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check6">
                        <label class="form-check-label" for="check6">Aardingsinstallatie conform AREI</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check7">
                        <label class="form-check-label" for="check7">Equipotentiale verbindingen</label>
                    </div>
                </div>
            </div>
            
            <div class="card mb-3">
                <div class="card-header">Specifieke Vereisten</div>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check8">
                        <label class="form-check-label" for="check8">Correcte draadsecties voor alle circuits</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check9">
                        <label class="form-check-label" for="check9">Juiste IP-beschermingsgraad in vochtige ruimtes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check10">
                        <label class="form-check-label" for="check10">Correcte zonering in badkamers/douches</label>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="genereerKeuringsrapport()">Genereer Keuringsrapport</button>
        `;
    } else if (installatieType === 'bestaand') {
        checklistDiv.innerHTML = `
            <h4>Checklist voor Bestaande Installatie</h4>
            <div class="card mb-3">
                <div class="card-header">Vereiste Documenten</div>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check1">
                        <label class="form-check-label" for="check1">Vorig keuringsverslag</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check2">
                        <label class="form-check-label" for="check2">Ééndraadsschema van de installatie (indien beschikbaar)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check3">
                        <label class="form-check-label" for="check3">Situatieschema (indien beschikbaar)</label>
                    </div>
                </div>
            </div>
            
            <div class="card mb-3">
                <div class="card-header">Minimale Vereisten</div>
                <div class="card-body">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check4">
                        <label class="form-check-label" for="check4">Algemene differentieel aanwezig</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check5">
                        <label class="form-check-label" for="check5">Aardingsinstallatie aanwezig</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check6">
                        <label class="form-check-label" for="check6">Geen zichtbare gebreken of risico's</label>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="genereerKeuringsrapport()">Genereer Keuringsrapport</button>
        `;
    }
}

function genereerKeuringsrapport() {
    alert('Keuringsrapport wordt gegenereerd. In een echte implementatie zou dit een PDF genereren.');
}

// Initialisatie wanneer de pagina geladen is
$(document).ready(function() {
    // Initialiseer tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    
    // Initialiseer event listeners als de betreffende elementen bestaan
    if (document.getElementById('ruimteType')) {
        updateZoneVisualisatie();
        document.getElementById('ruimteType').addEventListener('change', updateZoneVisualisatie);
    }
    
    if (document.getElementById('keuringType')) {
        updateKeuringChecklist();
        document.getElementById('keuringType').addEventListener('change', updateKeuringChecklist);
    }
    
    // Zoekfunctionaliteit
    $('#zoekFormulier').on('submit', function(e) {
        e.preventDefault();
        const zoekterm = $('#zoekInput').val().toLowerCase();
        
        // In een echte implementatie zou dit een zoekfunctie aanroepen
        alert('Zoeken naar: ' + zoekterm);
    });
});
