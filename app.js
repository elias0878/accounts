// التهيئة الصحيحة لـ Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9VOnLD90Z0HXdn2c1av2i4bp5ubJUvQY",
    authDomain: "notes-vtjja8.firebaseapp.com",
    projectId: "notes-vtjja8",
    storageBucket: "notes-vtjja8.appspot.com",
    messagingSenderId: "527274039379",
    appId: "1:527274039379:web:28ceae529cd23fb917cea6"
};

// التهيئة الإلزامية
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// عناصر DOM
const adminPanel = document.getElementById('adminPanel');
const servicesContainer = document.getElementById('servicesContainer');
const adminLoginBtn = document.getElementById('adminLoginBtn');

// ======== نظام عرض الخدمات ========
async function loadServices() {
    try {
        const snapshot = await db.collection("services")
            .orderBy("timestamp", "desc")
            .get();
        
        const services = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderServices(services);
    } catch (error) {
        console.error("فشل تحميل الخدمات:", error);
    }
}

function renderServices(services) {
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <div class="price">${service.price} ر.س</div>
            <p class="desc">${service.description}</p>
        </div>
    `).join('');
}

// ======== نظام الإدارة ========
async function handleAdminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('serviceForm').style.display = 'block';
    } catch (error) {
        alert(`خطأ في تسجيل الدخول: ${error.message}`);
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
        await db.collection("services").add(serviceData);
        alert('تمت إضافة الخدمة بنجاح!');
        loadServices();
    } catch (error) {
        alert(`فشل الإضافة: ${error.message}`);
    }
}

// ======== الأحداث الرئيسية ========
adminLoginBtn.addEventListener('click', () => {
    adminPanel.style.display = 'block';
});

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('serviceForm').style.display = 'block';
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('serviceForm').style.display = 'none';
    }
});

// التحميل الأولي عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    loadServices();
});
