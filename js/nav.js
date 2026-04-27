// Network Security Hub - Navigation Component
// Version 2.0: Dropdown menus enabled + interactive

function loadNavigation() {
    const navHtml = `
        <a href="../index.html">🏠 Home</a>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">📡 Networking Basics ▾</a>
            <div class="nav-dropdown-content">
                <a href="../networking-basics/osi-model.html">📘 OSI Model</a>
                <a href="../networking-basics/tcp-ip-model.html">🌐 TCP/IP Model</a>
                <a href="../networking-basics/subnetting.html">✂️ Subnetting</a>
                <a href="../networking-basics/cisco-commands.html">⚙️ Cisco Commands</a> 
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🔀 Routing & Switching ▾</a>
            <div class="nav-dropdown-content">
                <a href="../routing-switching/vlan-config.html">🏷️ VLAN Configuration</a>
                <a href="../routing-switching/static-routing.html">🗺️ Static Routing</a>
                <a href="../routing-switching/ospf.html">🔄 OSPF</a>
                <a href="#">⚡ EIGRP (Coming Soon)</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🔥 Firewalls ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">🛠️ iptables (Coming Soon)</a>
                <a href="#">🧱 Zone-Based Firewall (Coming Soon)</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🖥️ Virtualization ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">📦 VirtualBox Setup (Coming Soon)</a>
                <a href="#">⚡ VMware Setup (Coming Soon)</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🐧 Server Admin ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">💻 Linux Commands (Coming Soon)</a>
                <a href="#">🪟 Windows Server (Coming Soon)</a>
            </div>
        </div>
        
        <a href="../labs/index.html">🧪 Lab Index</a>
    `;
    
    document.querySelectorAll('.navbar').forEach(nav => {
        nav.innerHTML = navHtml;
    });
}

// Add CSS for dropdowns if not already in style.css
function addDropdownStyles() {
    if (document.querySelector('#dropdown-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dropdown-styles';
    style.textContent = `
        .nav-dropdown {
            position: relative;
            display: inline-block;
        }
        .nav-dropdown-content {
            display: none;
            position: absolute;
            background: #1a2a3a;
            min-width: 220px;
            border-radius: 0.5rem;
            top: 100%;
            left: 0;
            z-index: 1001;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            border: 1px solid #2d3a46;
        }
        .nav-dropdown-content a {
            color: #cbd5e1;
            padding: 0.75rem 1rem;
            display: block;
            text-align: left;
            border-bottom: 1px solid #2d3a46;
        }
        .nav-dropdown-content a:last-child {
            border-bottom: none;
        }
        .nav-dropdown-content a:hover {
            background: #2d3a46;
            color: white;
            border-bottom-color: #2d3a46;
        }
        .nav-dropdown:hover .nav-dropdown-content {
            display: block;
        }
        @media (max-width: 768px) {
            .nav-dropdown-content {
                position: static;
                background: #1a2a3a;
                box-shadow: none;
                margin-top: 0.5rem;
            }
            .nav-dropdown:hover .nav-dropdown-content {
                display: none;
            }
            .nav-dropdown-content a {
                padding-left: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    addDropdownStyles();
});
