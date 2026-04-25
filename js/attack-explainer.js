// Attack Explainer Component - SIMPLIFIED GUARANTEED VERSION
// Creates clickable tooltips for security terms anywhere on the page

const attackData = {
    "SQL Injection": {
        def: "Attacker inserts malicious SQL code into a web form to access or destroy database data.",
        analogy: "Tricking a receptionist by saying 'I'm the boss's son' to get access to files.",
        example: "Entering `' OR '1'='1` into a login form to bypass authentication.",
        defense: "Use parameterized queries, input validation, and WAF."
    },
    "XSS": {
        def: "Cross-Site Scripting - Attacker injects malicious scripts into websites viewed by other users.",
        analogy: "Leaving a sticky note on a public computer that redirects everyone to a fake website.",
        example: "Posting `<script>alert('Hacked')</script>` in a comment section.",
        defense: "Escape output, use Content Security Policy (CSP)."
    },
    "CSRF": {
        def: "Cross-Site Request Forgery - Tricks authenticated users into performing unintended actions.",
        analogy: "Using someone's already-open email to send a money transfer without their knowledge.",
        defense: "Anti-CSRF tokens, SameSite cookies."
    },
    "Buffer Overflows": {
        def: "Writes data beyond memory buffer boundaries to crash or control a program.",
        analogy: "Pouring 10 liters of water into a 1-liter bottle.",
        defense: "Modern OS protections (ASLR, DEP), safe languages."
    },
    "SSL Stripping": {
        def: "Downgrades HTTPS connections to HTTP, allowing attacker to read traffic.",
        analogy: "Intercepting a sealed letter, opening it, then resealing it poorly.",
        defense: "HSTS (HTTP Strict Transport Security), TLS 1.3."
    },
    "Weak Ciphers": {
        def: "Outdated encryption algorithms that can be broken by attackers.",
        analogy: "Using a simple lock that can be picked with basic tools.",
        defense: "Disable TLS 1.0/1.1, use AES-256."
    },
    "Session Hijacking": {
        def: "Steals a user's session cookie to impersonate them.",
        analogy: "Stealing someone's ID badge after they hang it on a hook.",
        defense: "Secure cookies (HttpOnly, Secure flags), short timeouts."
    },
    "SYN Flood": {
        def: "Overwhelms a server with connection requests, exhausting resources.",
        analogy: "Calling a restaurant and hanging up after they pick up, tying up all phone lines.",
        defense: "SYN cookies, rate limiting."
    },
    "Port Scanning": {
        def: "Probes a system for open ports to find attack vectors.",
        analogy: "Checking every door and window to see which are unlocked.",
        defense: "Firewall rules, port knocking."
    },
    "IP Spoofing": {
        def: "Forges source IP address to hide identity or bypass filters.",
        analogy: "Mailing a letter with a fake return address.",
        defense: "Ingress/egress filtering, uRPF."
    },
    "DDoS": {
        def: "Distributed Denial of Service - Overwhelms target with traffic from multiple sources.",
        analogy: "A million people calling the same restaurant at once.",
        defense: "DDoS mitigation services, rate limiting."
    },
    "ARP Spoofing": {
        def: "Associates attacker's MAC address with a legitimate IP address.",
        analogy: "Changing the name on someone's mailbox to intercept their mail.",
        defense: "Dynamic ARP Inspection (DAI)."
    },
    "VLAN Hopping": {
        def: "Attacker sends packets to other VLANs they shouldn't access.",
        analogy: "Sneaking into a VIP area through a service door.",
        defense: "Disable DTP, use native VLAN on unused port."
    }
};

// Function to show popup
function showTermPopup(term, event) {
    event.stopPropagation();
    
    const data = attackData[term];
    if (!data) return;
    
    // Remove existing popup
    const existing = document.getElementById('security-popup');
    if (existing) existing.remove();
    
    const popup = document.createElement('div');
    popup.id = 'security-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 3px solid #2c7da0;
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
            <button onclick="this.closest('#security-popup').remove()" style="background: none; border: none; font-size: 1.8rem; cursor: pointer;">&times;</button>
        </div>
        <p><strong>📖 What it is:</strong><br>${data.def}</p>
        ${data.analogy ? `<p><strong>🎭 Analogy:</strong><br>${data.analogy}</p>` : ''}
        ${data.example ? `<p><strong>💻 Example:</strong><br><code style="background:#f1f5f9; padding:0.2rem 0.4rem; display:inline-block;">${data.example}</code></p>` : ''}
        <p><strong>🛡️ Defense:</strong><br>${data.defense}</p>
        <div style="background: #eef2ff; padding: 0.5rem; border-radius: 0.5rem; margin-top: 1rem; font-size: 0.85rem;">
            ✨ Click outside to close
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Close on outside click
    setTimeout(() => {
        const closeHandler = (e) => {
            if (!popup.contains(e.target)) {
                popup.remove();
                document.removeEventListener('click', closeHandler);
            }
        };
        document.addEventListener('click', closeHandler);
    }, 10);
}

// Function to add ⓘ icons to specific terms
function addInfoIcons() {
    // Target all table cells
    const allCells = document.querySelectorAll('td');
    
    allCells.forEach(cell => {
        // Look for attack terms in the cell
        Object.keys(attackData).forEach(term => {
            if (cell.innerHTML.includes(term) && !cell.innerHTML.includes('ⓘ')) {
                // Replace the term with clickable version
                const regex = new RegExp(`(${term})`, 'g');
                cell.innerHTML = cell.innerHTML.replace(regex, `<span class="clickable-term" data-term="${term}" style="cursor: pointer; background: #eef2ff; padding: 0.1rem 0.3rem; border-radius: 4px; display: inline-block; margin: 0 1px;">${term}<sup style="color: #2c7da0; margin-left: 3px;">ⓘ</sup></span>`);
            }
        });
    });
    
    // Add event listeners to all clickable terms
    document.querySelectorAll('.clickable-term').forEach(el => {
        el.removeEventListener('click', showTermPopupHandler);
        el.addEventListener('click', showTermPopupHandler);
    });
}

function showTermPopupHandler(event) {
    event.stopPropagation();
    const term = this.getAttribute('data-term');
    showTermPopup(term, event);
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addInfoIcons);
} else {
    addInfoIcons();
}
