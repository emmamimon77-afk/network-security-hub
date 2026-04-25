// Attack Explainer Component - Network Security Hub (FIXED VERSION)
// Provides definitions for security attacks and defenses

const attackExplanations = {
    // Layer 7 - Application Attacks
    "SQL Injection": {
        short: "Attacker inserts malicious SQL code into a web form to access or destroy database data.",
        analogy: "Like tricking a receptionist by saying 'I'm the boss's son' to get access to files.",
        example: "Entering `' OR '1'='1` into a login form to bypass authentication.",
        defense: "Use parameterized queries, input validation, and WAF."
    },
    "XSS": {
        short: "Cross-Site Scripting - Attacker injects malicious scripts into websites viewed by other users.",
        analogy: "Like leaving a sticky note on a public computer that redirects everyone to a fake website.",
        example: "Posting `<script>alert('Hacked')</script>` in a comment section.",
        defense: "Escape output, use Content Security Policy (CSP)."
    },
    "CSRF": {
        short: "Cross-Site Request Forgery - Tricks authenticated users into performing unintended actions.",
        analogy: "Like using someone's already-open email to send a money transfer without their knowledge.",
        example: "Clicking a malicious link while logged into your bank.",
        defense: "Anti-CSRF tokens, SameSite cookies."
    },
    "Buffer Overflows": {
        short: "Writes data beyond memory buffer boundaries to crash or control a program.",
        analogy: "Like pouring 10 liters of water into a 1-liter bottle.",
        defense: "Modern OS protections (ASLR, DEP), safe languages (Rust, Go)."
    },
    
    // Layer 6 - Presentation Attacks
    "SSL Stripping": {
        short: "Downgrades HTTPS connections to HTTP, allowing attacker to read traffic.",
        analogy: "Like intercepting a sealed letter, opening it, then resealing it poorly.",
        defense: "HSTS (HTTP Strict Transport Security), TLS 1.3."
    },
    "Weak Ciphers": {
        short: "Outdated encryption algorithms that can be broken by attackers.",
        analogy: "Like using a simple lock that can be picked with basic tools.",
        defense: "Disable TLS 1.0/1.1, use AES-256."
    },
    "CRIME attack": {
        short: "Exploits TLS compression to decrypt session cookies.",
        analogy: "Like guessing a password by measuring how much the drawer rattles.",
        defense: "Disable TLS compression, use TLS 1.3."
    },
    
    // Layer 5 - Session Attacks
    "Session Hijacking": {
        short: "Steals a user's session cookie to impersonate them.",
        analogy: "Like stealing someone's ID badge after they hang it on a hook.",
        defense: "Secure cookies (HttpOnly, Secure flags), short timeouts."
    },
    "Session Fixation": {
        short: "Forces a user to use a session ID known to the attacker.",
        analogy: "Like handing someone a pre-stamped boarding pass, then using the same pass later.",
        defense: "Regenerate session ID after login."
    },
    "Replay Attacks": {
        short: "Captures and retransmits valid data transmission to trick the receiver.",
        analogy: "Like recording someone's keycard beep and playing it back later.",
        defense: "Timestamps, nonces, session tokens."
    },
    
    // Layer 4 - Transport Attacks
    "SYN Flood": {
        short: "Overwhelms a server with connection requests, exhausting resources.",
        analogy: "Like calling a restaurant and hanging up after they pick up, tying up all phone lines.",
        defense: "SYN cookies, rate limiting."
    },
    "TCP RST Attack": {
        short: "Sends fake TCP reset packets to terminate connections.",
        analogy: "Like a bully cutting your phone line mid-conversation.",
        defense: "TCP-AO, IPSec."
    },
    "Port Scanning": {
        short: "Probes a system for open ports to find attack vectors.",
        analogy: "Like checking every door and window to see which are unlocked.",
        defense: "Firewall rules, port knocking, rate limiting."
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
    "Fragmentation Attacks": {
        short: "Sends overlapping or incomplete IP fragments to crash or bypass firewalls.",
        analogy: "Like sending a puzzle with mismatching pieces.",
        defense: "Proper fragment reassembly, modern firewalls."
    },
    "DDoS": {
        short: "Distributed Denial of Service - Overwhelms target with traffic from multiple sources.",
        analogy: "Like a million people calling the same restaurant at once.",
        defense: "DDoS mitigation (Cloudflare, AWS Shield), rate limiting."
    },
    
    // Layer 2 - Data Link Attacks
    "ARP Spoofing": {
        short: "Associates attacker's MAC address with a legitimate IP address.",
        analogy: "Like changing the name on someone's mailbox to intercept their mail.",
        defense: "Dynamic ARP Inspection (DAI)."
    },
    "MAC Flooding": {
        short: "Overwhelms switch's MAC table, causing it to act like a hub.",
        analogy: "Like flooding a phone switchboard so operators just shout every call to everyone.",
        defense: "Port security, MAC limiting."
    },
    "CAM Table Overflow": {
        short: "Fills switch's content-addressable memory to cause fail-open mode.",
        analogy: "Like filling a receptionist's brain with fake names so they can't remember anyone.",
        defense: "Port security, switch hardening."
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
    "Eavesdropping": {
        short: "Passively listening to network communications.",
        analogy: "Like standing near a door to overhear conversations.",
        defense: "Encryption (WPA3, TLS), Faraday cages."
    },
    "Device Theft": {
        short: "Stealing physical networking equipment or endpoints.",
        analogy: "Like stealing a mailbox to get all the mail inside.",
        defense: "Physical locks, CCTV, asset tracking."
    },
    "Signal Interception": {
        short: "Capturing wireless signals (Wi-Fi, Bluetooth, cellular).",
        analogy: "Like using a powerful antenna to listen to radio broadcasts meant for others.",
        defense: "Strong encryption (WPA3), signal shielding."
    }
};

// Defenses explanation
const defenseExplanations = {
    "WAF": "Web Application Firewall - Filters malicious HTTP traffic before it reaches your web server.",
    "HSTS": "HTTP Strict Transport Security - Tells browsers to always use HTTPS, preventing SSL stripping.",
    "SYN Cookies": "Cryptographic technique to handle SYN flood without storing state.",
    "uRPF": "Unicast Reverse Path Forwarding - Verifies source IP is reachable via same interface (blocks spoofing).",
    "DAI": "Dynamic ARP Inspection - Validates ARP packets against DHCP snooping database (prevents ARP spoofing).",
    "Port Security": "Limits which MAC addresses can connect to a switch port.",
    "IPsec": "IP Security - Encrypts and authenticates IP packets (Layer 3 VPN).",
    "TLS 1.3+": "Modern encryption protocol - Faster and more secure than older TLS versions.",
    "Secure Cookies": "Cookies with HttpOnly, Secure, and SameSite flags that prevent JavaScript access and enforce HTTPS.",
    "Code Reviews": "Manual or automated inspection of source code to find security flaws."
};

// Function to wrap text with clickable spans
function wrapWithExplainer(element, term, type = 'attack') {
    const explanations = type === 'attack' ? attackExplanations : defenseExplanations;
    const data = explanations[term];
    
    if (!data) return false;
    
    // Create container span
    const wrapper = document.createElement('span');
    wrapper.style.cssText = 'display: inline-flex; align-items: center; gap: 0.25rem; cursor: pointer; border-bottom: 1px dashed #2c7da0; margin: 0 2px;';
    wrapper.title = `Click for explanation: ${term}`;
    wrapper.innerHTML = `${term} <small style="font-size: 0.7rem; background: #eef2ff; padding: 0 0.25rem; border-radius: 3px;">ⓘ</small>`;
    
    wrapper.onclick = (e) => {
        e.stopPropagation();
        
        // Remove existing popup
        const existingPopup = document.getElementById('explainer-popup');
        if (existingPopup) existingPopup.remove();
        
        // Create popup
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
            max-width: 450px;
            min-width: 280px;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            font-family: system-ui;
            line-height: 1.5;
        `;
        
        popup.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h3 style="margin: 0; color: #0f3b5c;">⚠️ ${term}</h3>
                <button onclick="this.closest('#explainer-popup').remove()" style="background: none; border: none; font-size: 1.8rem; cursor: pointer; line-height: 1;">&times;</button>
            </div>
            <p><strong>📖 What it is:</strong><br>${data.short}</p>
            ${data.analogy ? `<p><strong>🎭 Analogy:</strong><br>${data.analogy}</p>` : ''}
            ${data.example ? `<p><strong>💻 Example:</strong><br><code style="background:#f1f5f9; padding:0.2rem 0.4rem;">${data.example}</code></p>` : ''}
            <p><strong>🛡️ How to defend:</strong><br>${data.defense}</p>
            <div style="background: #eef2ff; padding: 0.5rem; border-radius: 0.5rem; margin-top: 1rem; font-size: 0.85rem;">
                ✨ Click anywhere outside to close
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Close on outside click
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!popup.contains(e.target) && e.target !== wrapper) {
                    popup.remove();
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 10);
    };
    
    // Replace original text with wrapper
    element.parentNode.replaceChild(wrapper, element);
    return true;
}

// Scan table cells and add explainers
function addAttackExplainersToTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 2) {
                // Process Attack column (usually second column or first)
                let attackCell = cells[0].innerHTML.includes('Layer') && cells[1] ? cells[1] : cells[0];
                
                if (attackCell && attackCell.innerHTML) {
                    const terms = attackCell.innerHTML.split(/[,，、]/);
                    const newHtml = [];
                    terms.forEach(term => {
                        let cleanTerm = term.trim();
                        // Check for exact match or partial
                        let matchedTerm = null;
                        for (let key of Object.keys(attackExplanations)) {
                            if (cleanTerm.includes(key) || key.includes(cleanTerm)) {
                                matchedTerm = key;
                                break;
                            }
                        }
                        if (matchedTerm && attackExplanations[matchedTerm]) {
                            // Create temporary span to replace
                            const tempSpan = document.createElement('span');
                            tempSpan.textContent = cleanTerm;
                            if (wrapWithExplainer(tempSpan, matchedTerm, 'attack')) {
                                newHtml.push(tempSpan.outerHTML);
                            } else {
                                newHtml.push(cleanTerm);
                            }
                        } else {
                            newHtml.push(cleanTerm);
                        }
                    });
                    attackCell.innerHTML = newHtml.join(', ');
                }
                
                // Process Defense column (third column)
                if (cells.length >= 3) {
                    const defenseCell = cells[2];
                    if (defenseCell && defenseCell.innerHTML) {
                        const defenses = defenseCell.innerHTML.split(/[,，、]/);
                        const newDefenses = [];
                        defenses.forEach(def => {
                            let cleanDef = def.trim();
                            let matchedDef = null;
                            for (let key of Object.keys(defenseExplanations)) {
                                if (cleanDef.includes(key) || key.includes(cleanDef)) {
                                    matchedDef = key;
                                    break;
                                }
                            }
                            if (matchedDef && defenseExplanations[matchedDef]) {
                                const tempSpan = document.createElement('span');
                                tempSpan.textContent = cleanDef;
                                if (wrapWithExplainer(tempSpan, matchedDef, 'defense')) {
                                    newDefenses.push(tempSpan.outerHTML);
                                } else {
                                    newDefenses.push(cleanDef);
                                }
                            } else {
                                newDefenses.push(cleanDef);
                            }
                        });
                        defenseCell.innerHTML = newDefenses.join(', ');
                    }
                }
            }
        });
    });
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAttackExplainersToTables);
} else {
    addAttackExplainersToTables();
}
