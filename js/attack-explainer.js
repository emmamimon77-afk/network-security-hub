// Attack Explainer Component - Network Security Hub
// Provides definitions for security attacks and defenses

const attackExplanations = {
    // Layer 7 - Application Attacks
    "SQL Injection": {
        short: "Attacker inserts malicious SQL code into a web form to access or destroy database data.",
        analogy: "Like tricking a receptionist by saying 'I'm the boss's son' to get access to files.",
        example: "Entering `' OR '1'='1` into a login form to bypass authentication.",
        defense: "Use parameterized queries, input validation, and WAF."
    },
    "XSS (Cross-Site Scripting)": {
        short: "Attacker injects malicious scripts into websites viewed by other users.",
        analogy: "Like leaving a sticky note on a public computer that redirects everyone to a fake website.",
        example: "Posting `<script>alert('Hacked')</script>` in a comment section.",
        defense: "Escape output, use Content Security Policy (CSP)."
    },
    "CSRF (Cross-Site Request Forgery)": {
        short: "Tricks authenticated users into performing unintended actions on a website.",
        analogy: "Like using someone's already-open email to send a money transfer without their knowledge.",
        example: "Clicking a malicious link while logged into your bank.",
        defense: "Anti-CSRF tokens, SameSite cookies."
    },
    
    // Layer 6 - Presentation Attacks
    "SSL Stripping": {
        short: "Downgrades HTTPS connections to HTTP, allowing attacker to read traffic.",
        analogy: "Like intercepting a sealed letter, opening it, then resealing it poorly.",
        example: "Attacker uses tools like `sslstrip` on public Wi-Fi.",
        defense: "HSTS (HTTP Strict Transport Security), TLS 1.3."
    },
    "CRIME Attack": {
        short: "Exploits TLS compression to decrypt session cookies.",
        analogy: "Like guessing a password by measuring how much the drawer rattles.",
        defense: "Disable TLS compression, use TLS 1.3."
    },
    
    // Layer 5 - Session Attacks
    "Session Hijacking": {
        short: "Steals a user's session cookie to impersonate them.",
        analogy: "Like stealing someone's ID badge after they hang it on a hook.",
        example: "Capturing session cookie via insecure Wi-Fi.",
        defense: "Secure cookies (HttpOnly, Secure flags), short timeouts."
    },
    "Session Fixation": {
        short: "Forces a user to use a session ID known to the attacker.",
        analogy: "Like handing someone a pre-stamped boarding pass, then using the same pass later.",
        defense: "Regenerate session ID after login."
    },
    
    // Layer 4 - Transport Attacks
    "SYN Flood": {
        short: "Overwhelms a server with connection requests, exhausting resources.",
        analogy: "Like calling a restaurant and hanging up after they pick up, tying up all phone lines.",
        example: `Sending many SYN packets without completing TCP handshake.`,
        defense: "SYN cookies, rate limiting."
    },
    "TCP Hijacking": {
        short: "Injects malicious data into an established TCP connection.",
        analogy: "Like cutting into a phone conversation and impersonating one side.",
        defense: "TCP-AO (Authentication Option), IPSec."
    },
    
    // Layer 3 - Network Attacks
    "IP Spoofing": {
        short: "Forges source IP address to hide identity or bypass filters.",
        analogy: "Like mailing a letter with a fake return address.",
        defense: "Ingress/egress filtering, uRPF."
    },
    "Ping of Death": {
        short: "Sends an oversized ping packet that crashes vulnerable systems.",
        analogy: "Like forcing someone to drink an entire ocean.",
        defense: "Modern OS patches, packet filtering."
    },
    "DDoS (Distributed Denial of Service)": {
        short: "Overwhelms a target with traffic from multiple sources.",
        analogy: "Like a million people calling the same restaurant at once.",
        example: "Botnet floods a website with requests.",
        defense: "DDoS mitigation services (Cloudflare, AWS Shield), rate limiting."
    },
    
    // Layer 2 - Data Link Attacks
    "ARP Spoofing": {
        short: "Associates attacker's MAC address with a legitimate IP address.",
        analogy: "Like changing the name on someone's mailbox to intercept their mail.",
        example: "Attacker sends fake ARP replies saying 'I am the gateway'.",
        defense: "Dynamic ARP Inspection (DAI)."
    },
    "MAC Flooding": {
        short: "Overwhelms switch's MAC table, causing it to act like a hub.",
        analogy: "Like flooding a phone switchboard so operators just shout every call to everyone.",
        defense: "Port security, MAC limiting."
    },
    "VLAN Hopping": {
        short: "Attacker sends packets to other VLANs they shouldn't access.",
        analogy: "Like sneaking into a VIP area through a service door.",
        defense: "Disable DTP, use native VLAN on unused port."
    },
    
    // Layer 1 - Physical Attacks
    "Wire Tapping": {
        short: "Physically accessing network cables to intercept data.",
        analogy: "Like splicing into a neighbor's cable TV line.",
        defense: "Physical security, tamper detection, encryption."
    },
    "Evil Twin AP": {
        short: "Fake Wi-Fi access point that mimics a legitimate one.",
        analogy: "Like setting up a fake ATM that looks real but steals cards.",
        defense: "WPA3-Enterprise, certificate verification."
    }
};

// Defenses explanation
const defenseExplanations = {
    "WAF (Web Application Firewall)": "Filters malicious HTTP traffic before it reaches your web server. Blocks SQLi, XSS, etc.",
    "HSTS (HTTP Strict Transport Security)": "Tells browsers to always use HTTPS, preventing SSL stripping.",
    "SYN Cookies": "Cryptographic technique to handle SYN flood without storing state.",
    "uRPF (Unicast Reverse Path Forwarding)": "Verifies source IP is reachable via same interface — blocks spoofing.",
    "DAI (Dynamic ARP Inspection)": "Validates ARP packets against DHCP snooping database — prevents ARP spoofing.",
    "Port Security": "Limits which MAC addresses can connect to a switch port.",
    "IPsec": "Encrypts and authenticates IP packets (Layer 3 VPN).",
    "TLS 1.3+": "Modern encryption protocol — faster and more secure than older TLS."
};

// Function to create explainer tooltip/popup
function createExplainerLink(term, type = 'attack') {
    const explanations = type === 'attack' ? attackExplanations : defenseExplanations;
    const data = explanations[term];
    
    if (!data) return term;
    
    const container = document.createElement('span');
    container.style.cssText = 'display: inline-block; cursor: help; border-bottom: 1px dashed #2c7da0; margin: 0 2px;';
    container.title = `Click for explanation: ${term}`;
    container.innerHTML = `${term} <small style="font-size: 0.7rem;">ⓘ</small>`;
    
    container.onclick = (e) => {
        e.stopPropagation();
        const existingPopup = document.getElementById('explainer-popup');
        if (existingPopup) existingPopup.remove();
        
        const popup = document.createElement('div');
        popup.id = 'explainer-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 2px solid #2c7da0;
            border-radius: 1rem;
            padding: 1.5rem;
            max-width: 400px;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            font-family: system-ui;
        `;
        
        popup.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <h3 style="margin: 0; color: #0f3b5c;">${term}</h3>
                <button onclick="this.closest('#explainer-popup').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <p><strong>What it is:</strong> ${data.short}</p>
            <p><strong>🎭 Analogy:</strong> ${data.analogy || 'N/A'}</p>
            <p><strong>💻 Example:</strong> ${data.example || 'See lesson for details'}</p>
            <p><strong>🛡️ Defense:</strong> ${data.defense || 'Covered in lesson'}</p>
            <div style="background: #eef2ff; padding: 0.5rem; border-radius: 0.5rem; margin-top: 0.5rem;">
                📖 Click outside to close
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closePopup(e) {
                if (!popup.contains(e.target) && e.target !== container) {
                    popup.remove();
                    document.removeEventListener('click', closePopup);
                }
            });
        }, 10);
    };
    
    return container;
}

// Function to scan tables and add explainers
function addAttackExplainersToTables() {
    // Find all tables with attack terms
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 2) {
                // Process attack names in first column or second column
                const attackCell = cells[0].innerHTML.includes('Layer') ? cells[1] : cells[0];
                if (attackCell && attackCell.innerHTML.length < 200) {
                    const terms = attackCell.innerHTML.split(/[,，、]/);
                    const newHtml = terms.map(term => {
                        const cleanTerm = term.trim();
                        if (attackExplanations[cleanTerm]) {
                            return createExplainerLink(cleanTerm, 'attack').outerHTML;
                        }
                        return cleanTerm;
                    }).join(', ');
                    attackCell.innerHTML = newHtml;
                }
                
                // Process defense mechanisms
                if (cells.length >= 3) {
                    const defenseCell = cells[2];
                    const defenses = defenseCell.innerHTML.split(/[,，、]/);
                    const newDefenses = defenses.map(def => {
                        const cleanDef = def.trim();
                        if (defenseExplanations[cleanDef]) {
                            return createExplainerLink(cleanDef, 'defense').outerHTML;
                        }
                        return cleanDef;
                    }).join(', ');
                    defenseCell.innerHTML = newDefenses;
                }
            }
        });
    });
}

// Auto-run when page loads
document.addEventListener('DOMContentLoaded', () => {
    addAttackExplainersToTables();
});
