// Network Security Hub - Navigation Component
// Version 4.0: Absolute paths (works from any page depth)

function loadNavigation() {
    const navHtml = `
        <a href="/index.html">🏠 Home</a>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">📡 Networking Basics ▾</a>
            <div class="nav-dropdown-content">
                <a href="/networking-basics/osi-model.html">📘 OSI Model</a>
                <a href="/networking-basics/tcp-ip-model.html">🌐 TCP/IP Model</a>
                <a href="/networking-basics/subnetting.html">✂️ Subnetting</a>
                <a href="/networking-basics/nat-pat.html">🔄 NAT/PAT</a>
                <a href="/networking-basics/dhcp-dns.html">🌐 DHCP & DNS</a>
                <a href="/networking-basics/ntp-snmp-syslog.html">⏰ NTP/SNMP/Syslog</a>
                <a href="/networking-basics/cisco-commands.html">⚙️ Cisco Commands</a>
                <a href="/networking-basics/huawei-commands.html">🇨🇳 Huawei Commands</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🔀 Routing & Switching ▾</a>
            <div class="nav-dropdown-content">
                <a href="/routing-switching/vlan-config.html">🏷️ VLAN Configuration</a>
                <a href="/routing-switching/stp.html">🌲 Spanning Tree (STP)</a>
                <a href="/routing-switching/static-routing.html">🗺️ Static Routing</a>
                <a href="/routing-switching/hsrp-vrrp.html">🔄 HSRP/VRRP</a>
                <a href="/routing-switching/ospf.html">🔄 OSPF</a>
                <a href="/routing-switching/eigrp.html">⚡ EIGRP</a>
                <a href="/routing-switching/wan-technologies.html">🌍 WAN Technologies</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🔥 Firewalls ▾</a>
            <div class="nav-dropdown-content">
                <a href="/firewalls/iptables.html">🛠️ iptables</a>
                <a href="/firewalls/zone-based-firewall.html">🧱 Zone-Based Firewall</a>
                <a href="/firewalls/acls-advanced.html">📋 Advanced ACLs</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🖥️ Virtualization ▾</a>
            <div class="nav-dropdown-content">
                <a href="/virtualization/virtualbox-setup.html">📦 VirtualBox Setup</a>
                <a href="/virtualization/vmware-setup.html">⚡ VMware Setup</a>
            </div>
        </div>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">🐧 Server Admin ▾</a>
            <div class="nav-dropdown-content">
                <a href="/server-admin/linux-commands.html">💻 Linux Commands for Security</a>
                <a href="/server-admin/windows-server.html">🪟 Windows Server</a>
            </div>
        </div>
        
        <a href="/labs/index.html">🧪 Lab Index</a>
        <a href="/resources/glossary.html">📖 Glossary</a>
        
        <div class="nav-dropdown">
            <a href="javascript:void(0)">📚 Advanced ▾</a>
            <div class="nav-dropdown-content">
                <a href="/resources/command-libraries/linux-index.html">🐧 Linux Command Library</a>
                <a href="/resources/command-libraries/powershell-index.html">⚡ PowerShell Library</a>
                <a href="/resources/deep-dives/index.html">🔬 Deep Dives</a>
                <a href="/resources/deep-dives/linux-security-hardening.html">🐧 Linux Security Hardening</a>
            </div>
        </div>
    `;
    
    document.querySelectorAll('.navbar').forEach(nav => {
        nav.innerHTML = navHtml;
    });
}

// Add CSS for dropdowns
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
            background: white;
            min-width: 220px;
            border-radius: 0.75rem;
            top: 100%;
            left: 0;
            z-index: 1001;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border: 1px solid #cfe3dc;
        }
        .nav-dropdown:hover .nav-dropdown-content {
            display: block;
        }
        .nav-dropdown.active .nav-dropdown-content {
            display: block;
        }
        .nav-dropdown-content a {
            color: #2d6a4f;
            padding: 0.75rem 1rem;
            display: block;
            text-align: left;
            border-bottom: 1px solid #e9f0ed;
            font-size: 1rem;
            font-weight: 500;
        }
        .nav-dropdown-content a:last-child {
            border-bottom: none;
        }
        .nav-dropdown-content a:hover {
            background: #e9f0ed;
            color: #1b4332;
        }
        @media (max-width: 768px) {
            .nav-dropdown-content {
                position: static;
                background: #f0f7f4;
                box-shadow: none;
                margin-top: 0.5rem;
                border: 1px solid #cfe3dc;
            }
            .nav-dropdown.active .nav-dropdown-content {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile tap support for dropdowns
function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (!link) return;
        
        link.removeEventListener('click', handleMobileTap);
        link.addEventListener('click', handleMobileTap);
    });
}

function handleMobileTap(e) {
    if (window.innerWidth > 768) return;
    
    e.preventDefault();
    const dropdown = this.closest('.nav-dropdown');
    if (!dropdown) return;
    
    document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
    });
    
    dropdown.classList.toggle('active');
}

document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) return;
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    addDropdownStyles();
    initMobileDropdowns();
});

window.addEventListener('resize', () => initMobileDropdowns());
