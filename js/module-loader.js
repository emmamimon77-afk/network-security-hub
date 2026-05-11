// Module Loader - Network Security Hub
// Only adds the attack explainer module if the page has security tables

function addAttackExplainerModule() {
    // Check if module already exists
    if (document.querySelector('.attack-explainer-module')) return;
    
    // Check if the page has a security table (contains attack terms)
    const tables = document.querySelectorAll('table');
    let hasSecurityTable = false;
    
    const securityTerms = [
        'SQL Injection', 'XSS', 'CSRF', 'Buffer Overflow',
        'ARP Spoofing', 'SYN Flood', 'IP Spoofing', 'DDoS',
        'Session Hijacking', 'VLAN Hopping', 'Wire Tapping'
    ];
    
    tables.forEach(table => {
        const tableText = table.innerText;
        securityTerms.forEach(term => {
            if (tableText.includes(term)) {
                hasSecurityTable = true;
            }
        });
    });
    
    // Only add module if a security table exists
    if (!hasSecurityTable) return;
    
    const pageNav = document.querySelector('.page-nav');
    if (!pageNav) return;
    
    const moduleHtml = `
        <div class="card attack-explainer-module">
            <h2>📖 Understanding Security Terms (Click any ⓘ in tables above)</h2>
            <p>Throughout this lesson, you'll see <span style="border-bottom: 1px dashed #2d6a4f;">terms with a small ⓘ icon</span>. Click any of them to see:</p>
            <ul>
                <li>✅ A plain-English definition</li>
                <li>✅ A real-world analogy</li>
                <li>✅ A concrete example of the attack</li>
                <li>✅ How to defend against it</li>
            </ul>
            <div class="tip-box">
                💡 <strong>Try it now:</strong> Find <strong>SQL Injection</strong> or <strong>ARP Spoofing</strong> in the security table above and click the ⓘ icon.
            </div>
        </div>
    `;
    
    pageNav.insertAdjacentHTML('beforebegin', moduleHtml);
}

// Only run on pages with tables
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('table')) {
            addAttackExplainerModule();
        }
    });
} else {
    if (document.querySelector('table')) {
        addAttackExplainerModule();
    }
}
