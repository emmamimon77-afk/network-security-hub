// Module Loader - Network Security Hub
// Automatically adds reusable modules to lessons

function addAttackExplainerModule() {
    // Check if module already exists
    if (document.querySelector('.attack-explainer-module')) return;
    
    const pageNav = document.querySelector('.page-nav');
    if (!pageNav) return;
    
    const moduleHtml = `
        <div class="card attack-explainer-module">
            <h2>📖 Understanding Security Terms (Click any ⓘ in tables above)</h2>
            <p>Throughout this lesson, you'll see <span style="border-bottom: 1px dashed #2c7da0;">terms with a small ⓘ icon</span>. Click any of them to see:</p>
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
    
    // Insert before page navigation
    pageNav.insertAdjacentHTML('beforebegin', moduleHtml);
}

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only add explainer module on lesson pages (tables present)
    if (document.querySelector('table')) {
        addAttackExplainerModule();
    }
});
