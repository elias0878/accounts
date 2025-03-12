import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, where 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { 
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// التهيئة من ملف منفصل
const firebaseConfig = {
    apiKey: "AIzaSyC9VOnLD90Z0HXdn2c1av2i4bp5ubJUvQY",
    authDomain: "notes-vtjja8.firebaseapp.com",
    projectId: "notes-vtjja8",
    storageBucket: "notes-vtjja8.appspot.com",
    messagingSenderId: "527274039379",
    appId: "1:527274039379:web:28ceae529cd23fb917cea6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ========== نظام إدارة الحالة ==========
const state = {
    currentUser: null,
    services: [],
    currentPage: 1,
    itemsPerPage: 10,
    sortConfig: { key: 'name', direction: 'asc' }
};

// ========== نظام الخدمات ==========
class ServiceManager {
    static async fetchServices() {
        const q = query(
            collection(db, "services"),
            orderBy(state.sortConfig.key, state.sortConfig.direction)
        );
        
        const snapshot = await getDocs(q);
        state.services = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        this.renderServices();
    }

    static renderServices() {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        const paginatedServices = state.services.slice(start, end);

        const servicesBody = document.getElementById('servicesBody');
        servicesBody.innerHTML = paginatedServices.map(service => `
            <tr>
                <td>${service.name}</td>
                <td>${service.price} ر.س</td>
                <td>${service.duration}</td>
                <td><span class="status-badge ${service.status}">${service.status}</span></td>
                <td>
                    <button class="btn-icon edit-btn" data-id="${service.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${service.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    static async deleteService(serviceId) {
        await deleteDoc(doc(db, "services", serviceId));
        this.fetchServices();
    }
}

// ========== نظام المصادقة ==========
class AuthManager {
    static async login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(`فشل تسجيل الدخول: ${error.code}`);
        }
    }

    static async logout() {
        await signOut(auth);
    }

    static initAuthListener() {
        onAuthStateChanged(auth, user => {
            state.currentUser = user;
            user ? this.handleAuthSuccess() : this.handleAuthFailure();
        });
    }

    static handleAuthSuccess() {
        document.querySelectorAll('.auth-required').forEach(el => el.style.display = 'block');
        ServiceManager.fetchServices();
    }

    static handleAuthFailure() {
        window.location.href = '/login';
    }
}

// ========== التهيئة الأولية ==========
document.addEventListener('DOMContentLoaded', () => {
    AuthManager.initAuthListener();
    
    // الأحداث
    document.getElementById('newServiceBtn').addEventListener('click', () => {
        // فتح نموذج إضافة خدمة
    });

    document.querySelectorAll('.sort-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const key = e.target.closest('th').dataset.sort;
            state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
            ServiceManager.fetchServices();
        });
    });
});
