export const db = {
  user: {
    id: "user_1",
    name: "Admin",
    email: "admin@nexcare.com",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=9333ea&color=fff",
    role: "admin"
  },
  stats: [
    { label: "RFO Pending", value: 152, icon: "Clock", color: "bg-yellow-100 text-yellow-800", iconColor: "#eab308" },
    { label: "RFO Terbuat", value: 287, icon: "CheckCircle", color: "bg-green-100 text-green-800", iconColor: "#22c55e" },
    { label: "Starlink Aktif", value: 54, icon: "Satellite", color: "bg-purple-100 text-purple-800", iconColor: "#9333ea" },
    { label: "Starlink Suspend", value: 37, icon: "Ban", color: "bg-red-100 text-red-800", iconColor: "#ef4444" }
  ],
  charts: {
    rfoStats: [
      { name: "Pending RFO", value: 150, fill: "#8b5cf6" },
      { name: "Completed RFO", value: 280, fill: "#a78bfa" },
      { name: "Starlink Aktif", value: 400, fill: "#c4b5fd" },
      { name: "Starlink Suspend", value: 180, fill: "#e879f9" }
    ],
    starlinkStatus: [
      { name: "Aktif", value: 59, fill: "#7c3aed" },
      { name: "Suspend", value: 41, fill: "#f472b6" }
    ]
  },
  rfoData: [
    { 
      id: "RFO001582", 
      status: "Pending", 
      clientId: "IW72831",
      clientName: "Astra Communications",
      starlink: "Starlink87415", 
      location: "Jakarta, Indonesia",
      projectName: "Astra Connectivity Upgrade",
      incidentDate: "3 Februari 2026",
      sla: "99.5%",
      ticketNumber: "InternetWork#429102",
      incidentHour: "12:00 - 13:00",
      incidentCategory: "NORMAL",
      durationInterruption: "1 Hour",
      statusTicket: "OPEN",
      incidentDescription: "Intermittent connectivity issues observed during peak hours.",
      businessImpact: "Slow access to internal tools for 50 users.",
      rootCause: "High latency detected at the gateway.",
      action: "Restarted terminal and recalibrated signal.",
      createdBy: "Admin User"
    },
    { 
      id: "RFO001583", 
      status: "Accept", 
      clientId: "IW99210",
      clientName: "Omega Networks",
      starlink: "Starlink96321", 
      location: "Bandung, Indonesia",
      projectName: "Omega Backhaul",
      incidentDate: "2 Februari 2026",
      sla: "99.9%",
      ticketNumber: "InternetWork#882190",
      incidentHour: "09:00 - 11:30",
      incidentCategory: "HARD",
      durationInterruption: "2.5 Hours",
      statusTicket: "CLOSE",
      incidentDescription: "Complete signal loss due to severe weather conditions.",
      businessImpact: "Total outage for branch office.",
      rootCause: "Heavy obstructions and thunderstorm.",
      action: "Waited for weather to clear; verified stability.",
      createdBy: "Admin User"
    },
    { 
      id: "RFO001584", 
      status: "Accept", 
      clientId: "IW12093",
      clientName: "SkyConnect Ltd.",
      starlink: "Starlink70358", 
      location: "Surabaya, Indonesia",
      projectName: "SkyConnect Offshore",
      incidentDate: "1 Februari 2026",
      sla: "98.0%",
      ticketNumber: "InternetWork#110293",
      incidentHour: "14:00 - 14:15",
      incidentCategory: "EASY",
      durationInterruption: "15 Minutes",
      statusTicket: "CLOSE",
      incidentDescription: "Brief disconnection.",
      businessImpact: "Minimal impact, few retries on transactions.",
      rootCause: "Software update reboot.",
      action: "Monitored post-update stability.",
      createdBy: "Admin User"
    },
    { 
      id: "RFO001581", 
      status: "Accept", 
      clientId: "IW44211",
      clientName: "NovaTel Solutions",
      starlink: "Starlink75192", 
      location: "Bali, Indonesia",
      projectName: "NovaTel Resort Wifi",
      incidentDate: "30 Januari 2026",
      sla: "99.0%",
      ticketNumber: "InternetWork#551029",
      incidentHour: "10:00 - 12:00",
      incidentCategory: "NORMAL",
      durationInterruption: "2 Hours",
      statusTicket: "CLOSE",
      incidentDescription: "Degraded speeds reported by guests.",
      businessImpact: "Guest complaints regarding video streaming.",
      rootCause: "Bandwidth saturation.",
      action: "Applied QoS policies and increased priority.",
      createdBy: "Admin User"
    },
    { 
      id: "RFO001571", 
      status: "Pending", 
      clientId: "IW33201",
      clientName: "Radiotel Telecom",
      starlink: "Starlink16234", 
      location: "Medan, Indonesia",
      projectName: "Radiotel Backup Link",
      incidentDate: "28 Januari 2026",
      sla: "99.5%",
      ticketNumber: "InternetWork#339102",
      incidentHour: "08:00 - 08:30",
      incidentCategory: "EASY",
      durationInterruption: "30 Minutes",
      statusTicket: "PENDING",
      incidentDescription: "Device reported offline.",
      businessImpact: "Backup link activation failover test.",
      rootCause: "Power cut at site.",
      action: "Dispatched technician to check UPS.",
      createdBy: "Admin User"
    }
  ],
  starlinkData: [
    {
      id: "ACC-4162043-51295-7",
      name: "Starlink-Jakarta-001",
      email: "ops.jkt@nexcare.com",
      password: "password123",
      passwordEmail: "emailpass123",
      status: "Active",
      optStatus: "Active",
      optQuota: "300MB"
    },
    {
      id: "ACC-8821092-11029-2",
      name: "Starlink-Bandung-HQ",
      email: "ops.bdg@nexcare.com",
      password: "securePass!@#",
      passwordEmail: "bdgPass!@#",
      status: "Active",
      optStatus: "Disable",
      optQuota: "-"
    },
    {
      id: "ACC-9920192-22910-1",
      name: "Starlink-Surabaya-Site",
      email: "ops.sby@nexcare.com",
      password: "sbyPassword00",
      passwordEmail: "mailPassSby",
      status: "Suspend",
      optStatus: "Disable",
      optQuota: "-"
    },
    {
      id: "ACC-1029384-55610-9",
      name: "Starlink-Bali-Resort",
      email: "ops.bali@nexcare.com",
      password: "baliSunset2026",
      passwordEmail: "resortMailPass",
      status: "Active",
      optStatus: "Active",
      optQuota: "1GB"
    },
    {
      id: "ACC-7721029-33102-5",
      name: "Starlink-Medan-Office",
      email: "ops.medan@nexcare.com",
      password: "medanSecureKey",
      passwordEmail: "medanMailKey",
      status: "Active",
      optStatus: "Active",
      optQuota: "500MB"
    }
  ],
  clientData: [
    {
      id: "IW72831",
      name: "Astra Communications",
      bandwidth: "50Mbps",
      services: "Dedicated",
      address: "Jl. Sudirman Kav 10-11, Jakarta Pusat",
      vendorName: "Icon+",
      vendorCid: "CID-99201",
      vendorBandwidth: "100Mbps",
      installPhone: "081234567890",
      installName: "Budi Santoso"
    },
    {
      id: "IW99210",
      name: "Omega Networks",
      bandwidth: "20Mbps",
      services: "Broadband",
      address: "Jl. Asia Afrika No. 8, Bandung",
      vendorName: "Telkom Indonesia",
      vendorCid: "CID-55102",
      vendorBandwidth: "50Mbps",
      installPhone: "081987654321",
      installName: "Agus Pratama"
    },
    {
      id: "IW12093",
      name: "SkyConnect Ltd.",
      bandwidth: "100Mbps",
      services: "VPN",
      address: "Jl. Pemuda No. 25, Surabaya",
      vendorName: "Lintasarta",
      vendorCid: "CID-77291",
      vendorBandwidth: "200Mbps",
      installPhone: "081298765432",
      installName: "Cahyo Nugroho"
    },
    {
      id: "IW44211",
      name: "NovaTel Solutions",
      bandwidth: "30Mbps",
      services: "Dedicated",
      address: "Jl. Sunset Road, Bali",
      vendorName: "Biznet",
      vendorCid: "CID-33102",
      vendorBandwidth: "50Mbps",
      installPhone: "081345678901",
      installName: "Wayan Surya"
    },
    {
      id: "IW33201",
      name: "Radiotel Telecom",
      bandwidth: "10Mbps",
      services: "Broadband",
      address: "Jl. Putri Hijau, Medan",
      vendorName: "Moratel",
      vendorCid: "CID-11029",
      vendorBandwidth: "20Mbps",
      installPhone: "081567890123",
      installName: "Rizky Siregar"
    }
  ],
  teamData: [
    {
      id: "USR001",
      name: "Admin User",
      email: "admin@nexcare.com",
      password: "adminPassword123",
      position: "NOC2",
      signature: "https://ui-avatars.com/api/?name=Admin+User&background=random",
      profilePicture: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
    },
    {
      id: "USR002",
      name: "NOC One",
      email: "noc1@nexcare.com",
      password: "noc1Password",
      position: "NOC1",
      signature: "https://ui-avatars.com/api/?name=NOC+One&background=random",
      profilePicture: "https://ui-avatars.com/api/?name=NOC+One&background=random"
    },
    {
      id: "USR003",
      name: "Tech Support",
      email: "tech@nexcare.com",
      password: "techPassword",
      position: "Technical Support",
      signature: "https://ui-avatars.com/api/?name=Tech+Support&background=random",
      profilePicture: "https://ui-avatars.com/api/?name=Tech+Support&background=random"
    },
    {
      id: "USR004",
      name: "Manager NOC",
      email: "manager@nexcare.com",
      password: "managerPass",
      position: "NOC2",
      signature: "https://ui-avatars.com/api/?name=Manager+NOC&background=random",
      profilePicture: "https://ui-avatars.com/api/?name=Manager+NOC&background=random"
    }
  ]
};
