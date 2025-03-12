// التهيئة من Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyC9VOnLD90Z0HXdn2c1av2i4bp5ubJUvQY",
    authDomain: "notes-vtjja8.firebaseapp.com",
    projectId: "notes-vtjja8",
    storageBucket: "notes-vtjja8.appspot.com",
    messagingSenderId: "527274039379",
    appId: "1:527274039379:web:28ceae529cd23fb917cea6"
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const adminPanel = document.getElementById('adminPanel');
const servicesContainer = document.getElementById('servicesContainer');

// ========== نظام عرض الخدمات ==========
function renderServices(services) {
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <div class="price">${service.price} ر.س</div>
            <p class="desc">${service.description}</p>
        </div>
    `).join('');
}

// ========== نظام الإدارة ==========
async function handleAdminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('serviceForm').style.display = 'block';
    } catch (error) {
        alert(`خطأ في التسجيل: ${error.message}`);
    }
}

async function addNewService() {
    const serviceData = {
        name: document.getElementById('serviceName').value,
        price: document.getElementById('servicePrice').value,
        description: document.getElementById('serviceDesc').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await db.collection('services').add(serviceData);
        alert('تمت الإضافة بنجاح!');
        loadServices();
    } catch (error) {
        alert(`خطأ: ${error.message}`);
    }
}

// ========== التهيئة الأولية ==========
async function loadServices() {
    const snapshot = await db.collection('services')
        .orderBy('timestamp', 'desc')
        .get();
        
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderServices(services);
}

// تشغيل التطبيق
window.onload = () => {
    loadServices();
    auth.onAuthStateChanged(user => {
        adminPanel.style.display = user ? 'block' : 'none';
    });
};
