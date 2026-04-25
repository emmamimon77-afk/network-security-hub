// Network Security Hub - Navigation Component
// This file loads the navbar dynamically. Update ONE place, updates ALL pages.

function loadNavigation() {
    const navHtml = `
        <a href="../index.html">🏠 Home</a>
        <div class="nav-dropdown">
            <a href="#">📡 Networking Basics ▾</a>
            <div class="nav-dropdown-content">
                <a href="../networking-basics/osi-model.html">📘 OSI Model</a>
                <a href="#">🌐 TCP/IP Model</a>
                <a href="#">✂️ Subnetting</a>
                <a href="#">⚙️ Cisco Commands</a>
            </div>
        </div>
        <div class="nav-dropdown">
            <a href="#">🔀 Routing & Switching ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">🗺️ Static Routing</a>
                <a href="#">🔄 OSPF</a>
                <a href="#">⚡ EIGRP</a>
                <a href="#">🏷️ VLAN Config</a>
            </div>
        </div>
        <div class="nav-dropdown">
            <a href="#">🔥 Firewalls ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">🛠️ iptables</a>
                <a href="#">🧱 Zone-Based Firewall</a>
            </div>
        </div>
        <div class="nav-dropdown">
            <a href="#">🖥️ Virtualization ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">📦 VirtualBox Setup</a>
                <a href="#">⚡ VMware Setup</a>
            </div>
        </div>
        <div class="nav-dropdown">
            <a href="#">🐧 Server Admin ▾</a>
            <div class="nav-dropdown-content">
                <a href="#">💻 Linux Commands</a>
                <a href="#">🪟 Windows Server</a>
            </div>
        </div>
    `;
    
    // Find all navbar elements and populate them
    document.querySelectorAll('.navbar').forEach(nav => {
        nav.innerHTML = navHtml;
    });
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavigation);
