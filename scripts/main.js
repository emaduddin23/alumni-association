// ==========================================
// 1. LOCAL STORAGE DATABASE MANAGER
// ==========================================
const DB = {
    init() {
        // Auto-migrate: Clear old cache if it does not contain the updated schema version
        if (!localStorage.getItem('alumnihub_db_v4')) {
            localStorage.removeItem('alumnihub_tenants');
            localStorage.removeItem('alumnihub_members');
            localStorage.removeItem('alumnihub_events');
            localStorage.removeItem('alumnihub_campaigns');
            localStorage.removeItem('alumnihub_jobs');
            localStorage.setItem('alumnihub_db_v4', 'true');
        }

        if (!localStorage.getItem('alumnihub_tenants')) {
            const defaultTenants = [
                {
                    id: 'tenant-du',
                    name: 'Dhaka University Alumni',
                    type: 'University',
                    domain: 'alumni.du-example.com',
                    plan: 'Enterprise',
                    status: 'Active',
                    logo: 'DU',
                    primaryColor: '#1e1b4b',
                    features: {
                        members: true,
                        events: true,
                        donations: true,
                        elections: false,
                        jobs: true
                    }
                },
                {
                    id: 'tenant-abc',
                    name: 'ABC School Alumni',
                    type: 'School',
                    domain: 'abcschool.alumnihub.com',
                    plan: 'Starter',
                    status: 'Active',
                    logo: 'ABC',
                    primaryColor: '#0f172a',
                    features: {
                        members: true,
                        events: true,
                        donations: false,
                        elections: true,
                        jobs: false
                    }
                }
            ];
            localStorage.setItem('alumnihub_tenants', JSON.stringify(defaultTenants));
        }

        const existingMembers = JSON.parse(localStorage.getItem('alumnihub_members'));
        if (existingMembers && existingMembers.length > 0 && !('memberTier' in existingMembers[0])) {
            localStorage.removeItem('alumnihub_members');
            localStorage.removeItem('alumnihub_mentorships');
        }

        if (!localStorage.getItem('alumnihub_members')) {
            const defaultMembers = [
                {
                    tenantId: 'tenant-du',
                    name: 'Jamil Hasan',
                    email: 'jamil@example.com',
                    batch: '2015',
                    dept: 'Computer Science',
                    status: 'Pending',
                    stepOTP: 'Done',
                    stepInfo: 'Done',
                    stepProof: 'Done',
                    proofDoc: 'Student ID.pdf',
                    avatar: '',
                    memberTier: 'Student',
                    isMentor: false,
                    mentorExpertise: '',
                    phone: '+8801511223344',
                    bio: 'A student seeking career opportunities.',
                    privacyPrivate: false
                },
                {
                    tenantId: 'tenant-du',
                    name: 'Sadia Islam',
                    email: 'sadia99@example.com',
                    batch: '2018',
                    dept: 'Physics',
                    status: 'Pending',
                    stepOTP: 'Done',
                    stepInfo: 'Done',
                    stepProof: 'Pending',
                    proofDoc: '',
                    avatar: '',
                    memberTier: 'Student',
                    isMentor: false,
                    mentorExpertise: '',
                    phone: '+8801911223344',
                    bio: 'Interested in astrophysics research.',
                    privacyPrivate: false
                },
                {
                    tenantId: 'tenant-du',
                    name: 'Kamal Uddin',
                    email: 'kamal@example.com',
                    batch: '2012',
                    dept: 'Mathematics',
                    status: 'Approved',
                    stepOTP: 'Done',
                    stepInfo: 'Done',
                    stepProof: 'Done',
                    proofDoc: 'Certificate.pdf',
                    avatar: '',
                    memberTier: 'Life',
                    isMentor: true,
                    mentorExpertise: 'Mathematics & Data Science',
                    phone: '+8801711223344',
                    bio: 'Data Scientist with 8+ years of industry experience. Happy to mentor juniors.',
                    privacyPrivate: false
                }
            ];
            localStorage.setItem('alumnihub_members', JSON.stringify(defaultMembers));
        }

        if (!localStorage.getItem('alumnihub_events')) {
            const defaultEvents = [
                {
                    tenantId: 'tenant-du',
                    title: 'Grand Reunion 2026',
                    location: 'TSC, Dhaka',
                    date: '15 Dec 2026',
                    sold: 1200,
                    capacity: 1500,
                    price: '৳500'
                }
            ];
            localStorage.setItem('alumnihub_events', JSON.stringify(defaultEvents));
        }

        if (!localStorage.getItem('alumnihub_campaigns')) {
            const defaultCampaigns = [
                {
                    tenantId: 'tenant-du',
                    title: 'Alumni Scholarship Fund',
                    description: 'Providing scholarships for underprivileged students of batch 2026.',
                    raised: 1340000,
                    goal: 2000000
                }
            ];
            localStorage.setItem('alumnihub_campaigns', JSON.stringify(defaultCampaigns));
        }

        if (!localStorage.getItem('alumnihub_jobs')) {
            const defaultJobs = [
                {
                    tenantId: 'tenant-du',
                    title: 'Senior Software Engineer (React/Node)',
                    company: 'Brain Station 23',
                    location: 'Remote',
                    type: 'Referral Available',
                    description: 'Looking for an experienced JavaScript engineer. Alumni from batch 2012-2018 preferred. Contact me for direct referral submission.',
                    postedBy: 'Kamal Uddin',
                    batch: '2012',
                    deadline: '20 Sep 2026'
                },
                {
                    tenantId: 'tenant-du',
                    title: 'Management Trainee Officer',
                    company: 'Brac Bank',
                    location: 'Dhaka',
                    type: 'Direct Job',
                    description: 'BRAC Bank is hiring Business graduates. Great opportunities for career growth. Batch 2024/2025 graduates are highly encouraged.',
                    postedBy: 'System Recruiter',
                    batch: 'System',
                    deadline: '10 Sep 2026'
                }
            ];
            localStorage.setItem('alumnihub_jobs', JSON.stringify(defaultJobs));
        }

        if (!localStorage.getItem('alumnihub_notices')) {
            const defaultNotices = [
                {
                    tenantId: 'tenant-du',
                    title: 'Reunion Date Confirmed: December 15, 2026',
                    description: 'All verified members are requested to register and collect their entry QR cards early.',
                    date: '31 Aug 2026'
                },
                {
                    tenantId: 'tenant-du',
                    title: 'Annual Membership Fee Collection Campaign Open',
                    description: 'Please clear annual dues online using bKash, Nagad or Visa to remain active member.',
                    date: '30 Aug 2026'
                }
            ];
            localStorage.setItem('alumnihub_notices', JSON.stringify(defaultNotices));
        }

        if (!localStorage.getItem('alumnihub_elections')) {
            const defaultElections = [
                {
                    id: 'elect-2026',
                    tenantId: 'tenant-du',
                    title: 'Executive Committee Election 2026',
                    description: 'Vote to elect the new alumni executive committee leaders.',
                    status: 'Active',
                    candidates: [
                        { id: 'cand-1', name: 'Dr. Kamal Hasan', role: 'President Candidate', votes: 120 },
                        { id: 'cand-2', name: 'Prof. Sadia Islam', role: 'President Candidate', votes: 98 },
                        { id: 'cand-3', name: 'Dr. Jamil Ahmed', role: 'General Secretary Candidate', votes: 145 },
                        { id: 'cand-4', name: 'Engr. Kamal Uddin', role: 'General Secretary Candidate', votes: 112 }
                    ],
                    votedEmails: []
                }
            ];
            localStorage.setItem('alumnihub_elections', JSON.stringify(defaultElections));
        }

        if (!localStorage.getItem('alumnihub_mentorships')) {
            const defaultMentorships = [
                {
                    id: 'req-1',
                    tenantId: 'tenant-du',
                    senderEmail: 'jamil@example.com',
                    receiverEmail: 'kamal@example.com',
                    message: 'Hello Kamal, I would love to get your mentorship in Data Science.',
                    status: 'Pending',
                    date: '31 Aug 2026'
                }
            ];
            localStorage.setItem('alumnihub_mentorships', JSON.stringify(defaultMentorships));
        }
    },

    getTenants() {
        return JSON.parse(localStorage.getItem('alumnihub_tenants')) || [];
    },

    saveTenants(tenants) {
        localStorage.setItem('alumnihub_tenants', JSON.stringify(tenants));
    },

    getMembers() {
        return JSON.parse(localStorage.getItem('alumnihub_members')) || [];
    },

    saveMembers(members) {
        localStorage.setItem('alumnihub_members', JSON.stringify(members));
    },

    getEvents() {
        return JSON.parse(localStorage.getItem('alumnihub_events')) || [];
    },

    saveEvents(events) {
        localStorage.setItem('alumnihub_events', JSON.stringify(events));
    },

    getCampaigns() {
        return JSON.parse(localStorage.getItem('alumnihub_campaigns')) || [];
    },

    saveCampaigns(campaigns) {
        localStorage.setItem('alumnihub_campaigns', JSON.stringify(campaigns));
    },

    getNotices() {
        return JSON.parse(localStorage.getItem('alumnihub_notices')) || [];
    },

    saveNotices(notices) {
        localStorage.setItem('alumnihub_notices', JSON.stringify(notices));
    },

    getElections() {
        return JSON.parse(localStorage.getItem('alumnihub_elections')) || [];
    },

    saveElections(elections) {
        localStorage.setItem('alumnihub_elections', JSON.stringify(elections));
    },

    getMentorships() {
        return JSON.parse(localStorage.getItem('alumnihub_mentorships')) || [];
    },

    saveMentorships(mentorships) {
        localStorage.setItem('alumnihub_mentorships', JSON.stringify(mentorships));
    }
};

// Initialize DB
DB.init();

// ==========================================
// 2. SIDEBAR NAVIGATION SWITCHER (SPA)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // SPA Router Logic for Sidebar Menu
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                // If link points to another html file (e.g. index.html), let normal navigation happen
                const href = item.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript:')) return;

                e.preventDefault();
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');

                // Determine target view based on index or text content
                const views = document.querySelectorAll('.view-section');
                if (views.length > index) {
                    views.forEach(v => v.classList.remove('active'));
                    views[index].classList.add('active');
                }
            });
        });
    }
});

// ==========================================
// 3. DIALOG / MODAL HELPERS
// ==========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        setTimeout(() => {
            event.target.style.display = 'none';
        }, 300);
    }
};

// ==========================================
// 4. SUPER ADMIN CONTROLLER (admin.html)
// ==========================================
let activeTenantId = null;

function renderTenantsTable() {
    const tbody = document.querySelector('#tenantsTableBody');
    if (!tbody) return;

    const tenants = DB.getTenants();
    tbody.innerHTML = '';

    tenants.forEach(tenant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 600;">${tenant.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${tenant.type}</div>
            </td>
            <td>${tenant.domain}</td>
            <td><span class="badge" style="background: ${tenant.plan === 'Enterprise' ? '#e0e7ff' : '#f1f5f9'}; color: ${tenant.plan === 'Enterprise' ? '#4338ca' : '#475569'};">${tenant.plan}</span></td>
            <td><span class="badge ${tenant.status === 'Active' ? 'badge-active' : 'badge-inactive'}">${tenant.status}</span></td>
            <td>
                <div class="flex gap-2">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="openFeatureModal('${tenant.id}')"><i class="ri-toggle-line"></i> Features</button>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; color: ${tenant.status === 'Active' ? 'var(--danger)' : 'var(--success)'}; border-color: ${tenant.status === 'Active' ? 'var(--danger)' : 'var(--success)'};" onclick="toggleTenantStatus('${tenant.id}')">
                        ${tenant.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update Super Admin Dashboard Stats
    const totalTenantsEl = document.getElementById('statTotalTenants');
    if (totalTenantsEl) totalTenantsEl.innerText = tenants.length;

    const totalAlumniEl = document.getElementById('statTotalAlumni');
    if (totalAlumniEl) {
        const approvedCount = DB.getMembers().filter(m => m.status === 'Approved').length;
        totalAlumniEl.innerText = (450000 + approvedCount).toLocaleString();
    }
}

function createNewTenant(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('tenantName').value;
    const type = document.getElementById('tenantType').value;
    const domain = document.getElementById('tenantDomain').value;
    const plan = document.getElementById('tenantPlan').value;

    if (!name || !domain) return alert('Please enter name and domain!');

    const tenants = DB.getTenants();
    const id = 'tenant-' + Date.now();
    const newTenant = {
        id,
        name,
        type,
        domain,
        plan,
        status: 'Active',
        logo: name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase(),
        primaryColor: '#4f46e5',
        features: {
            members: true,
            events: true,
            donations: plan !== 'Starter',
            elections: plan === 'Enterprise',
            jobs: plan !== 'Starter'
        }
    };

    tenants.push(newTenant);
    DB.saveTenants(tenants);
    renderTenantsTable();
    closeModal('newTenantModal');
    
    // Reset Form
    document.getElementById('newTenantForm').reset();
}

function toggleTenantStatus(id) {
    const tenants = DB.getTenants();
    const tenant = tenants.find(t => t.id === id);
    if (tenant) {
        tenant.status = tenant.status === 'Active' ? 'Suspended' : 'Active';
        DB.saveTenants(tenants);
        renderTenantsTable();
    }
}

function openFeatureModal(id) {
    activeTenantId = id;
    const tenant = DB.getTenants().find(t => t.id === id);
    if (tenant) {
        document.getElementById('modalTenantName').innerText = tenant.name;
        document.getElementById('featEvents').checked = tenant.features.events;
        document.getElementById('featDonations').checked = tenant.features.donations;
        document.getElementById('featElections').checked = tenant.features.elections;
        document.getElementById('featJobs').checked = tenant.features.jobs;
        openModal('featureModal');
    }
}

function saveFeatures() {
    if (!activeTenantId) return;
    const tenants = DB.getTenants();
    const tenant = tenants.find(t => t.id === activeTenantId);
    if (tenant) {
        tenant.features.events = document.getElementById('featEvents').checked;
        tenant.features.donations = document.getElementById('featDonations').checked;
        tenant.features.elections = document.getElementById('featElections').checked;
        tenant.features.jobs = document.getElementById('featJobs').checked;
        DB.saveTenants(tenants);
        closeModal('featureModal');
    }
}

// ==========================================
// 5. TENANT ADMIN CONTROLLER (tenant-admin.html)
// ==========================================
const currentTenantId = 'tenant-du'; // Hardcoded context for demo

function renderVerificationTable() {
    const tbody = document.querySelector('#verificationTableBody');
    if (!tbody) return;

    const members = DB.getMembers().filter(m => m.tenantId === currentTenantId && m.status === 'Pending');
    tbody.innerHTML = '';

    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No pending applications</td></tr>';
    }

    members.forEach(member => {
        const row = document.createElement('tr');
        row.id = `row-${member.email.replace(/[@.]/g, '-')}`;
        row.style.transition = 'all 0.5s ease';
        
        row.innerHTML = `
            <td>
                <div style="font-weight: 600;">${member.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${member.email}</div>
            </td>
            <td>
                <div>${member.batch}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${member.dept}</div>
            </td>
            <td>
                <div class="verification-steps" title="OTP > Info > Proof">
                    <i class="ri-checkbox-circle-fill step-done"></i>
                    <i class="ri-checkbox-circle-fill step-done"></i>
                    <i class="${member.stepProof === 'Done' ? 'ri-checkbox-circle-fill step-done' : 'ri-time-fill step-pending'}"></i>
                </div>
            </td>
            <td>
                ${member.proofDoc ? `<button class="proof-btn" onclick="viewProof('${member.name}', '${member.proofDoc}')"><i class="ri-file-text-line"></i> ${member.proofDoc}</button>` : '<span style="color: var(--text-muted); font-size: 0.875rem;">Waiting for upload...</span>'}
            </td>
            <td>
                <div class="flex gap-2">
                    <button class="btn btn-success" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;" onclick="approveMember('${member.email}')" ${member.stepProof !== 'Done' ? 'disabled' : ''}><i class="ri-check-line"></i> Approve</button>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem; border-color: var(--danger); color: var(--danger);" onclick="rejectMember('${member.email}')"><i class="ri-close-line"></i> Reject</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update Stats on Tenant Dashboard
    const pendingCountEl = document.getElementById('pendingCount');
    if (pendingCountEl) pendingCountEl.innerText = members.length;

    const verifiedCountEl = document.getElementById('verifiedCount');
    if (verifiedCountEl) {
        const approvedCount = DB.getMembers().filter(m => m.tenantId === currentTenantId && m.status === 'Approved').length;
        verifiedCountEl.innerText = (12430 + approvedCount).toLocaleString();
    }
}

function viewProof(name, docName) {
    document.getElementById('proofApplicantName').innerText = name;
    document.getElementById('proofDocName').innerText = docName;
    
    // Set a dynamic graphical preview card inside modal
    const previewEl = document.getElementById('proofDocPreview');
    if (previewEl) {
        previewEl.innerHTML = `
            <div style="border: 2px dashed #cbd5e1; border-radius: 12px; padding: 2rem; text-align: center; background: #f8fafc;">
                <i class="ri-file-pdf-fill" style="font-size: 4rem; color: #ef4444;"></i>
                <h4 style="margin-top: 1rem;">${docName}</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Submitted as Academic Proof by ${name}</p>
                <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 1rem; font-family: monospace; font-size: 0.75rem; text-align: left;">
                    [PDF METADATA: SECURE UPLOAD]<br>
                    Issuer: University of Dhaka<br>
                    Student Name: ${name}<br>
                    Status: VALID CERTIFICATE RECORD
                </div>
            </div>
        `;
    }
    openModal('proofModal');
}

function approveMember(email) {
    console.log('approveMember called for email:', email);
    const members = DB.getMembers();
    const member = members.find(m => m.email === email && m.tenantId === currentTenantId);
    if (member) {
        member.status = 'Approved';
        DB.saveMembers(members);
        console.log('Member approved successfully in DB:', email);
        alert(`Member ${email} approved successfully!`);
        
        // Dynamic row fade-out animation
        const rowId = `row-${email.replace(/[@.]/g, '-')}`;
        const row = document.getElementById(rowId);
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(50px)';
            setTimeout(() => {
                renderVerificationTable();
                renderTenantDirectory();
            }, 500);
        } else {
            renderVerificationTable();
        }
    } else {
        console.error('Member not found for email:', email, 'tenant:', currentTenantId);
        alert(`Error: Member ${email} not found in DB!`);
    }
}

function rejectMember(email) {
    if (!confirm('Are you sure you want to reject this application?')) return;
    const members = DB.getMembers();
    const memberIndex = members.findIndex(m => m.email === email && m.tenantId === currentTenantId);
    if (memberIndex > -1) {
        members.splice(memberIndex, 1); // Remove for simplicity in demo
        DB.saveMembers(members);
        
        const rowId = `row-${email.replace(/[@.]/g, '-')}`;
        const row = document.getElementById(rowId);
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                renderVerificationTable();
            }, 500);
        } else {
            renderVerificationTable();
        }
    }
}

function renderTenantDirectory() {
    const tbody = document.querySelector('#directoryTableBody');
    if (!tbody) return;

    const members = DB.getMembers().filter(m => m.tenantId === currentTenantId && m.status === 'Approved');
    tbody.innerHTML = '';

    members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 600;">${member.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${member.email}</div>
            </td>
            <td>${member.dept}</td>
            <td>${member.batch}</td>
            <td><span class="badge badge-active">Verified</span></td>
            <td>
                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="viewMemberCard('${member.name}', '${member.batch}', '${member.dept}', '${member.email}')"><i class="ri-qr-code-line"></i> View ID Card</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function searchDirectory() {
    const query = document.getElementById('directorySearch').value.toLowerCase();
    const rows = document.querySelectorAll('#directoryTableBody tr');
    
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function viewMemberCard(name, batch, dept, email) {
    document.getElementById('cardName').innerText = name;
    document.getElementById('cardId').innerText = `ID: DUA-${Math.floor(100000 + Math.random() * 900000)}`;
    document.getElementById('cardBatch').innerText = `Batch: ${batch}`;
    document.getElementById('cardDept').innerText = dept;
    document.getElementById('cardExpiry').innerText = 'Valid: 31 Dec 2027';
    
    // Create random profile initials avatar style
    const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2);
    document.getElementById('cardAvatarContainer').innerHTML = `
        <div style="width: 110px; height: 110px; border-radius: 50%; background: linear-gradient(135deg, var(--secondary), var(--primary)); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; color: white;">
            ${initials}
        </div>
    `;

    openModal('idCardModal');
}

function createNewEvent(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('eventTitle').value;
    const location = document.getElementById('eventLocation').value;
    const date = document.getElementById('eventDate').value;
    const capacity = document.getElementById('eventCapacity').value;
    const price = document.getElementById('eventPrice').value;

    if (!title || !date) return alert('Event Title and Date are required!');

    const events = DB.getEvents();
    events.push({
        tenantId: currentTenantId,
        title,
        location: location || 'Online',
        date,
        sold: 0,
        capacity: parseInt(capacity) || 100,
        price: price || 'Free'
    });
    DB.saveEvents(events);
    renderEventsList();
    closeModal('newEventModal');
    document.getElementById('newEventForm').reset();
}

function renderEventsList() {
    const listContainer = document.getElementById('eventsListContainer');
    if (!listContainer) return;

    const events = DB.getEvents().filter(e => e.tenantId === currentTenantId);
    listContainer.innerHTML = '';

    events.forEach(event => {
        const percent = Math.round((event.sold / event.capacity) * 100);
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <h3 style="color: var(--primary);"><i class="ri-calendar-event-fill"></i> ${event.title}</h3>
            <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">${event.title}</div>
            <div class="flex justify-between items-center" style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--text-muted);">
                <span><i class="ri-map-pin-line"></i> ${event.location}</span>
                <span><i class="ri-time-line"></i> ${event.date}</span>
            </div>
            <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius); margin-bottom: 1rem;">
                <div class="flex justify-between" style="margin-bottom: 0.5rem;">
                    <span style="font-weight: 500;">Tickets Sold (${event.price})</span>
                    <span style="font-weight: 700;">${event.sold.toLocaleString()} / ${event.capacity.toLocaleString()}</span>
                </div>
                <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${percent}%; height: 100%; background: var(--primary);"></div>
                </div>
            </div>
            <button class="btn btn-outline" style="width: 100%;"><i class="ri-qr-code-line"></i> QR Check-in Dashboard</button>
        `;
        listContainer.appendChild(card);
    });
}

function createNewCampaign(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('campTitle').value;
    const desc = document.getElementById('campDesc').value;
    const goal = document.getElementById('campGoal').value;

    if (!title || !goal) return alert('Campaign Title and Goal are required!');

    const campaigns = DB.getCampaigns();
    campaigns.push({
        tenantId: currentTenantId,
        title,
        description: desc,
        raised: 0,
        goal: parseInt(goal)
    });
    DB.saveCampaigns(campaigns);
    renderCampaignsList();
    closeModal('newCampaignModal');
    document.getElementById('newCampaignForm').reset();
}

function renderCampaignsList() {
    const listContainer = document.getElementById('campaignsListContainer');
    if (!listContainer) return;

    const campaigns = DB.getCampaigns().filter(c => c.tenantId === currentTenantId);
    listContainer.innerHTML = '';

    campaigns.forEach(campaign => {
        const percent = Math.round((campaign.raised / campaign.goal) * 100);
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <h3 style="color: var(--success);"><i class="ri-heart-3-fill"></i> ${campaign.title}</h3>
            <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">${campaign.title}</div>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">${campaign.description}</p>
            <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius); margin-bottom: 1rem;">
                <div class="flex justify-between" style="margin-bottom: 0.5rem;">
                    <span style="font-weight: 500;">Raised</span>
                    <span style="font-weight: 700;">৳${campaign.raised.toLocaleString()}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">Goal: ৳${campaign.goal.toLocaleString()}</div>
                <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${percent}%; height: 100%; background: var(--success);"></div>
                </div>
            </div>
            <button class="btn btn-outline" style="width: 100%;">View Campaign Report</button>
        `;
        listContainer.appendChild(card);
    });
}

function saveTenantBranding(e) {
    if (e) e.preventDefault();
    const primaryColor = document.getElementById('tenantPrimaryColor').value;
    const currentTenants = DB.getTenants();
    const tenant = currentTenants.find(t => t.id === currentTenantId);
    if (tenant) {
        tenant.primaryColor = primaryColor;
        DB.saveTenants(currentTenants);
        applyTenantTheme(primaryColor);
        alert('Branding colors saved!');
    }
}

function applyTenantTheme(color) {
    document.documentElement.style.setProperty('--secondary', color);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.backgroundColor = color;
}

// Initial Rendering trigger based on active page body class / ID
document.addEventListener('DOMContentLoaded', () => {
    // Check if Super Admin Page
    if (document.getElementById('tenantsTableBody')) {
        renderTenantsTable();
        // Bind submit form
        const newTenantForm = document.getElementById('newTenantForm');
        if (newTenantForm) newTenantForm.addEventListener('submit', createNewTenant);
        
        const saveFeaturesBtn = document.getElementById('saveFeaturesBtn');
        if (saveFeaturesBtn) saveFeaturesBtn.addEventListener('click', saveFeatures);
    }
    
    // Check if Tenant Admin Page
    if (document.getElementById('verificationTableBody')) {
        renderVerificationTable();
        renderTenantDirectory();
        renderEventsList();
        renderCampaignsList();
        
        // Apply existing tenant branding if any
        const activeTenant = DB.getTenants().find(t => t.id === currentTenantId);
        if (activeTenant && activeTenant.primaryColor) {
            applyTenantTheme(activeTenant.primaryColor);
            const colorInput = document.getElementById('tenantPrimaryColor');
            if (colorInput) colorInput.value = activeTenant.primaryColor;
        }

        // Bind Forms
        const newEventForm = document.getElementById('newEventForm');
        if (newEventForm) newEventForm.addEventListener('submit', createNewEvent);

        const newCampaignForm = document.getElementById('newCampaignForm');
        if (newCampaignForm) newCampaignForm.addEventListener('submit', createNewCampaign);

        const brandingForm = document.getElementById('brandingForm');
        if (brandingForm) brandingForm.addEventListener('submit', saveTenantBranding);
    }

    // Bind sidebar toggle button click handler for admin panels
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.toggle('collapsed');
        });
    }
});

function searchTenants() {
    const query = document.getElementById('tenantSearchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#tenantsTableBody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Expose variables and functions globally so that inline HTML handlers can access them
window.DB = DB;
window.openModal = openModal;
window.closeModal = closeModal;
window.renderTenantsTable = renderTenantsTable;
window.createNewTenant = createNewTenant;
window.toggleTenantStatus = toggleTenantStatus;
window.openFeatureModal = openFeatureModal;
window.saveFeatures = saveFeatures;
window.renderVerificationTable = renderVerificationTable;
window.viewProof = viewProof;
window.approveMember = approveMember;
window.rejectMember = rejectMember;
window.renderTenantDirectory = renderTenantDirectory;
window.searchDirectory = searchDirectory;
window.viewMemberCard = viewMemberCard;
window.createNewEvent = createNewEvent;
window.renderEventsList = renderEventsList;
window.createNewCampaign = createNewCampaign;
window.renderCampaignsList = renderCampaignsList;
window.saveTenantBranding = saveTenantBranding;
window.applyTenantTheme = applyTenantTheme;
window.searchTenants = searchTenants;

