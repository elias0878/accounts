// JavaScript لصفحة الخدمات

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل نافذة تفاصيل الخدمة
    const serviceItems = document.querySelectorAll('.service-item:not(.show-more-btn)');
    const serviceModal = document.getElementById('serviceModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDuration = document.getElementById('modal-duration');
    const modalRequirements = document.getElementById('modal-requirements');
    const modalDescription = document.getElementById('modal-description');
    
    // فتح النافذة عند النقر على خدمة
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-name').textContent;
            const servicePrice = this.querySelector('.service-price').textContent;
            const serviceDuration = this.dataset.duration || '1-3 أيام';
            
            // تعيين محتوى النافذة
            modalTitle.textContent = serviceName;
            modalPrice.textContent = servicePrice;
            modalDuration.textContent = serviceDuration;
            
            // إعداد متطلبات الخدمة بناءً على نوع الخدمة
            modalRequirements.innerHTML = '';
            
            // تحديد المتطلبات حسب نوع الخدمة
            let requirements = [];
            
            if (serviceName.includes('استرجاع')) {
                requirements = [
                    'رابط الحساب أو معلومات الجهاز',
                    'إثبات ملكية الحساب أو الجهاز',
                    'تفاصيل المشكلة وتاريخ حدوثها',
                    'معلومات الاتصال للتواصل المباشر'
                ];
            } else if (serviceName.includes('إغلاق')) {
                requirements = [
                    'رابط الحساب المسيء',
                    'أدلة على الإساءة (صور، روابط، لقطات شاشة)',
                    'تفاصيل الإساءة وتأثيرها',
                    'معلومات الاتصال للمتابعة'
                ];
            } else if (serviceName.includes('تأمين')) {
                requirements = [
                    'معلومات الحساب أو الجهاز المراد تأمينه',
                    'الوصول المؤقت للحساب أو الجهاز',
                    'تحديد مستوى الحماية المطلوب',
                    'معلومات الاتصال للدعم الفني'
                ];
            } else if (serviceName.includes('فورمات')) {
                requirements = [
                    'نوع الجهاز ونظام التشغيل',
                    'نسخ احتياطي للبيانات المهمة',
                    'معلومات الوصول للجهاز',
                    'تحديد البرامج المطلوب تثبيتها بعد الفورمات'
                ];
            } else if (serviceName.includes('توثيق')) {
                requirements = [
                    'رابط الحساب المراد توثيقه',
                    'إثبات ملكية الحساب',
                    'إثبات الهوية الشخصية أو التجارية',
                    'معلومات الاتصال للمتابعة'
                ];
            } else {
                requirements = [
                    'تفاصيل الخدمة المطلوبة',
                    'معلومات الاتصال للتواصل المباشر',
                    'أي متطلبات إضافية ستحدد بعد التواصل'
                ];
            }
            
            // إضافة المتطلبات إلى النافذة
            requirements.forEach(req => {
                const li = document.createElement('li');
                li.textContent = req;
                modalRequirements.appendChild(li);
            });
            
            // إنشاء وصف افتراضي للخدمة
            const descriptionText = `خدمة ${serviceName} هي إحدى الخدمات المتميزة التي يقدمها فريق أبونواف. تتضمن هذه الخدمة مجموعة من الإجراءات الاحترافية التي يتم تنفيذها بواسطة فريق متخصص من الخبراء في مجال الأمن السيبراني والتقنية. نضمن لك تنفيذ الخدمة بأعلى معايير الجودة والأمان وفي الوقت المحدد.`;
            modalDescription.textContent = descriptionText;
            
            // عرض النافذة
            serviceModal.style.display = 'block';
        });
    });
    
    // إغلاق النافذة
    closeModal.addEventListener('click', function() {
        serviceModal.style.display = 'none';
    });
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
            serviceModal.style.display = 'none';
        }
    });
    
    // تفعيل زر طلب الخدمة
    const requestServiceBtn = document.getElementById('request-service-btn');
    requestServiceBtn.addEventListener('click', function() {
        const serviceName = modalTitle.textContent;
        
        // التمرير إلى نموذج طلب الخدمة
        document.querySelector('.contact-form').scrollIntoView({ behavior: 'smooth' });
        
        // تعبئة اسم الخدمة في النموذج
        const serviceSelect = document.getElementById('service');
        if (serviceName.includes('فيسبوك') || serviceName.includes('إنستجرام') || serviceName.includes('تويتر') || 
            serviceName.includes('سناب شات') || serviceName.includes('تيك توك') || serviceName.includes('تلجرام')) {
            serviceSelect.value = 'social-media';
        } else if (serviceName.includes('تأمين') || serviceName.includes('اختراق') || serviceName.includes('ثغرات') || 
                  serviceName.includes('استجابة')) {
            serviceSelect.value = 'cybersecurity';
        } else if (serviceName.includes('هاتف') || serviceName.includes('جهاز') || serviceName.includes('كمبيوتر') || 
                  serviceName.includes('بيانات')) {
            serviceSelect.value = 'devices';
        } else if (serviceName.includes('بريد')) {
            serviceSelect.value = 'email';
        } else if (serviceName.includes('موقع') || serviceName.includes('ويب')) {
            serviceSelect.value = 'website';
        } else {
            serviceSelect.value = 'other';
        }
        
        // إضافة تفاصيل الخدمة في حقل التفاصيل
        document.getElementById('details').value = `أرغب في طلب خدمة "${serviceName}" بسعر ${modalPrice.textContent}`;
        
        // إغلاق النافذة المنبثقة
        serviceModal.style.display = 'none';
    });
    
    // تفعيل زر البحث
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('service-search');
    
    searchBtn.addEventListener('click', function() {
        searchServices();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchServices();
        }
    });
    
    function searchServices() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') return;
        
        let found = false;
        let foundItems = [];
        
        // البحث في جميع الخدمات، حتى المخفية
        document.querySelectorAll('.service-item:not(.show-more-btn)').forEach(item => {
            const serviceName = item.querySelector('.service-name').textContent.toLowerCase();
            if (serviceName.includes(searchTerm)) {
                found = true;
                foundItems.push(item);
                
                // إظهار الخدمة إذا كانت مخفية
                if (item.classList.contains('hidden')) {
                    item.classList.remove('hidden');
                    
                    // تغيير نص زر "عرض المزيد" في هذه المنصة
                    const showMoreBtn = item.closest('.platform-services').querySelector('.show-more-btn span');
                    if (showMoreBtn) {
                        showMoreBtn.textContent = 'عرض أقل';
                    }
                }
            }
        });
        
        if (found) {
            // تمييز الخدمات المطابقة
            foundItems.forEach(item => {
                item.style.backgroundColor = '#e3f2fd';
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 5000);
            });
            
            // التمرير إلى أول خدمة مطابقة
            foundItems[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // إظهار عدد النتائج
            alert(`تم العثور على ${foundItems.length} خدمة تحتوي على "${searchTerm}".`);
        } else {
            alert(`لم يتم العثور على خدمة تحتوي على "${searchTerm}". يرجى المحاولة بكلمة أخرى.`);
        }
    }
    
    // إضافة خدمات إضافية لكل منصة
    function addMoreServices() {
        // الحصول على جميع منصات الخدمات
        const servicePlatforms = document.querySelectorAll('.service-platform');
        
        // إضافة خدمات إضافية لكل منصة
        servicePlatforms.forEach(platform => {
            const servicesList = platform.querySelector('.services-list');
            const showMoreBtn = platform.querySelector('.show-more-btn');
            const platformType = platform.querySelector('.platform-header').classList[1];
            
            // إضافة خدمات إضافية حسب نوع المنصة
            let additionalServices = [];
            
            // تحديد الخدمات الإضافية حسب نوع المنصة
            switch (platformType) {
                case 'facebook':
                    additionalServices = [
                        { name: 'استرجاع رسائل محذوفة من فيسبوك', price: '600', duration: '3-7 أيام' },
                        { name: 'إزالة محتوى مسيء من فيسبوك', price: '450', duration: '2-5 أيام' },
                        { name: 'استعادة صفحة فيسبوك محذوفة', price: '800', duration: '5-10 أيام' },
                        { name: 'إدارة صفحة فيسبوك (شهرياً)', price: '1200', duration: 'خدمة شهرية' },
                        { name: 'زيادة متابعين فيسبوك حقيقيين', price: '900', duration: '7-14 يوم' }
                    ];
                    break;
                case 'instagram':
                    additionalServices = [
                        { name: 'استرجاع رسائل محذوفة من إنستجرام', price: '650', duration: '3-7 أيام' },
                        { name: 'إزالة محتوى مسيء من إنستجرام', price: '500', duration: '2-5 أيام' },
                        { name: 'استعادة حساب إنستجرام محذوف', price: '900', duration: '5-10 أيام' },
                        { name: 'إدارة حساب إنستجرام (شهرياً)', price: '1500', duration: 'خدمة شهرية' },
                        { name: 'زيادة متابعين إنستجرام حقيقيين', price: '1200', duration: '7-14 يوم' }
                    ];
                    break;
                case 'twitter':
                    additionalServices = [
                        { name: 'استرجاع تغريدات محذوفة', price: '550', duration: '3-7 أيام' },
                        { name: 'إزالة محتوى مسيء من تويتر', price: '450', duration: '2-5 أيام' },
                        { name: 'استعادة حساب تويتر محذوف', price: '750', duration: '5-10 أيام' },
                        { name: 'إدارة حساب تويتر (شهرياً)', price: '1200', duration: 'خدمة شهرية' },
                        { name: 'زيادة متابعين تويتر حقيقيين', price: '1000', duration: '7-14 يوم' }
                    ];
                    break;
                case 'snapchat':
                    additionalServices = [
                        { name: 'استرجاع سنابات محذوفة', price: '700', duration: '3-7 أيام' },
                        { name: 'إزالة محتوى مسيء من سناب شات', price: '550', duration: '2-5 أيام' },
                        { name: 'استعادة حساب سناب شات محذوف', price: '950', duration: '5-10 أيام' },
                        { name: 'زيادة مشاهدات سناب شات', price: '800', duration: '3-7 أيام' },
                        { name: 'تغيير اسم المستخدم في سناب شات', price: '600', duration: '2-5 أيام' }
                    ];
                    break;
                case 'tiktok':
                    additionalServices = [
                        { name: 'استرجاع فيديوهات محذوفة من تيك توك', price: '650', duration: '3-7 أيام' },
                        { name: 'إزالة محتوى مسيء من تيك توك', price: '500', duration: '2-5 أيام' },
                        { name: 'استعادة حساب تيك توك محذوف', price: '850', duration: '5-10 أيام' },
                        { name: 'زيادة متابعين تيك توك حقيقيين', price: '1100', duration: '7-14 يوم' },
                        { name: 'زيادة مشاهدات فيديوهات تيك توك', price: '700', duration: '3-7 أيام' }
                    ];
                    break;
                case 'telegram':
                    additionalServices = [
                        { name: 'استرجاع رسائل محذوفة من تلجرام', price: '600', duration: '3-7 أيام' },
                        { name: 'إنشاء بوت تلجرام مخصص', price: '1500', duration: '7-14 يوم' },
                        { name: 'إدارة قناة تلجرام (شهرياً)', price: '1000', duration: 'خدمة شهرية' },
                        { name: 'زيادة أعضاء قناة تلجرام حقيقيين', price: '1200', duration: '7-14 يوم' },
                        { name: 'تأمين مجموعات تلجرام', price: '700', duration: '2-5 أيام' }
                    ];
                    break;
                case 'security':
                    additionalServices = [
                        { name: 'تأمين حسابات البنوك الإلكترونية', price: '800', duration: '2-4 أيام' },
                        { name: 'تأمين حسابات التسوق الإلكتروني', price: '500', duration: '1-3 أيام' },
                        { name: 'تأمين حسابات الألعاب', price: '450', duration: '1-3 أيام' },
                        { name: 'تأمين شبكة منزلية', price: '1200', duration: '3-5 أيام' },
                        { name: 'تأمين شبكة شركة صغيرة', price: '3000', duration: '5-10 أيام' }
                    ];
                    break;
                case 'penetration':
                    additionalServices = [
                        { name: 'اختبار اختراق API', price: '4000', duration: '7-14 يوم' },
                        { name: 'اختبار اختراق IoT', price: '4500', duration: '10-20 يوم' },
                        { name: 'اختبار اختراق تطبيقات سطح المكتب', price: '3800', duration: '7-14 يوم' },
                        { name: 'اختبار اختراق خدمات سحابية', price: '5500', duration: '10-20 يوم' },
                        { name: 'اختبار اختراق شامل', price: '8000', duration: '15-30 يوم' }
                    ];
                    break;
                // إضافة المزيد من الحالات حسب الحاجة
                case 'ios':
                    additionalServices = [
                        { name: 'فك قفل iCloud', price: '800', duration: '2-5 أيام' },
                        { name: 'استعادة نسخة احتياطية من iCloud', price: '600', duration: '2-4 أيام' },
                        { name: 'إزالة قيود الشاشة من أجهزة iOS', price: '500', duration: '1-3 أيام' },
                        { name: 'تحديث iOS بدون فقدان البيانات', price: '400', duration: '1-2 أيام' },
                        { name: 'إصلاح مشاكل برمجية في iOS', price: '700', duration: '2-5 أيام' }
                    ];
                    break;
                case 'android':
                    additionalServices = [
                        { name: 'إزالة حساب Google من الجهاز', price: '450', duration: '1-3 أيام' },
                        { name: 'تجاوز قفل FRP', price: '500', duration: '1-3 أيام' },
                        { name: 'تثبيت روم مخصص', price: '600', duration: '2-4 أيام' },
                        { name: 'إصلاح مشاكل برمجية في Android', price: '550', duration: '2-4 أيام' },
                        { name: 'تحسين أداء أجهزة Android', price: '400', duration: '1-3 أيام' }
                    ];
                    break;
                case 'windows':
                    additionalServices = [
                        { name: 'إزالة فيروسات وبرمجيات خبيثة', price: '500', duration: '1-3 أيام' },
                        { name: 'تحسين أداء نظام Windows', price: '450', duration: '1-2 أيام' },
                        { name: 'استعادة نظام Windows بعد الفشل', price: '700', duration: '2-4 أيام' },
                        { name: 'تثبيت وتفعيل Windows الأصلي', price: '600', duration: '1-2 أيام' },
                        { name: 'إعداد نظام Windows للشركات', price: '1500', duration: '3-7 أيام' }
                    ];
                    break;
                case 'mac':
                    additionalServices = [
                        { name: 'إزالة قفل FileVault', price: '700', duration: '2-4 أيام' },
                        { name: 'استعادة نظام macOS بعد الفشل', price: '800', duration: '2-5 أيام' },
                        { name: 'تحسين أداء نظام macOS', price: '600', duration: '1-3 أيام' },
                        { name: 'تثبيت وتفعيل macOS الأصلي', price: '650', duration: '1-2 أيام' },
                        { name: 'إعداد نظام macOS للشركات', price: '1600', duration: '3-7 أيام' }
                    ];
                    break;
                case 'linux':
                    additionalServices = [
                        { name: 'إعداد خادم Linux', price: '1500', duration: '3-7 أيام' },
                        { name: 'تأمين نظام Linux', price: '1200', duration: '2-5 أيام' },
                        { name: 'استعادة بيانات من نظام Linux', price: '900', duration: '3-7 أيام' },
                        { name: 'إصلاح مشاكل نظام Linux', price: '800', duration: '2-5 أيام' },
                        { name: 'تثبيت وإعداد توزيعات Linux', price: '700', duration: '2-4 أيام' }
                    ];
                    break;
                case 'data-recovery':
                    additionalServices = [
                        { name: 'استعادة بيانات من هاتف تالف', price: '1200', duration: '3-7 أيام' },
                        { name: 'استعادة بيانات من SSD', price: '1300', duration: '3-7 أيام' },
                        { name: 'استعادة بيانات من قرص مشفر', price: '1800', duration: '5-10 أيام' },
                        { name: 'استعادة بيانات من خادم', price: '3000', duration: '7-14 يوم' },
                        { name: 'استعادة بيانات من نسخة احتياطية تالفة', price: '1000', duration: '3-7 أيام' }
                    ];
                    break;
            }
            
            // إضافة الخدمات الإضافية قبل زر "عرض المزيد"
            if (additionalServices.length > 0 && showMoreBtn) {
                // إزالة زر "عرض المزيد" مؤقتاً
                servicesList.removeChild(showMoreBtn);
                
                // إضافة الخدمات الإضافية
                additionalServices.forEach(service => {
                    const li = document.createElement('li');
                    li.className = 'service-item hidden';
                    li.dataset.price = service.price;
                    li.dataset.duration = service.duration;
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'service-name';
                    nameSpan.textContent = service.name;
                    
                    const priceSpan = document.createElement('span');
                    priceSpan.className = 'service-price';
                    priceSpan.textContent = service.price + ' ريال';
                    
                    li.appendChild(nameSpan);
                    li.appendChild(priceSpan);
                    
                    // إضافة نفس وظيفة النقر كباقي الخدمات
                    li.addEventListener('click', function() {
                        const serviceName = this.querySelector('.service-name').textContent;
                        const servicePrice = this.querySelector('.service-price').textContent;
                        const serviceDuration = this.dataset.duration || '1-3 أيام';
                        
                        modalTitle.textContent = serviceName;
                        modalPrice.textContent = servicePrice;
                        modalDuration.textContent = serviceDuration;
                        
                        // إعداد متطلبات الخدمة
                        modalRequirements.innerHTML = '';
                        let requirements = [];
                        
                        if (serviceName.includes('استرجاع')) {
                            requirements = [
                                'رابط الحساب أو معلومات الجهاز',
                                'إثبات ملكية الحساب أو الجهاز',
                                'تفاصيل المشكلة وتاريخ حدوثها',
                                'معلومات الاتصال للتواصل المباشر'
                            ];
                        } else if (serviceName.includes('إغلاق')) {
                            requirements = [
                                'رابط الحساب المسيء',
                                'أدلة على الإساءة (صور، روابط، لقطات شاشة)',
                                'تفاصيل الإساءة وتأثيرها',
                                'معلومات الاتصال للمتابعة'
                            ];
                        } else if (serviceName.includes('تأمين')) {
                            requirements = [
                                'معلومات الحساب أو الجهاز المراد تأمينه',
                                'الوصول المؤقت للحساب أو الجهاز',
                                'تحديد مستوى الحماية المطلوب',
                                'معلومات الاتصال للدعم الفني'
                            ];
                        } else {
                            requirements = [
                                'تفاصيل الخدمة المطلوبة',
                                'معلومات الاتصال للتواصل المباشر',
                                'أي متطلبات إضافية ستحدد بعد التواصل'
                            ];
                        }
                        
                        requirements.forEach(req => {
                            const li = document.createElement('li');
                            li.textContent = req;
                            modalRequirements.appendChild(li);
                        });
                        
                        const descriptionText = `خدمة ${serviceName} هي إحدى الخدمات المتميزة التي يقدمها فريق أبونواف. تتضمن هذه الخدمة مجموعة من الإجراءات الاحترافية التي يتم تنفيذها بواسطة فريق متخصص من الخبراء في مجال الأمن السيبراني والتقنية. نضمن لك تنفيذ الخدمة بأعلى معايير الجودة والأمان وفي الوقت المحدد.`;
                        modalDescription.textContent = descriptionText;
                        
                        serviceModal.style.display = 'block';
                    });
                    
                    servicesList.appendChild(li);
                });
                
                // إعادة إضافة زر "عرض المزيد"
                servicesList.appendChild(showMoreBtn);
            }
        });
    }
    
    // تنفيذ إضافة الخدمات الإضافية عند تحميل الصفحة
    addMoreServices();
    
    // تفعيل أزرار "عرض المزيد" بعد إضافة الخدمات الإضافية
    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    showMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platformServices = this.closest('.platform-services');
            const hiddenServices = platformServices.querySelectorAll('.service-item.hidden');
            
            if (hiddenServices.length > 0) {
                // إظهار الخدمات المخفية
                hiddenServices.forEach(service => {
                    service.classList.remove('hidden');
                });
                this.querySelector('span').textContent = 'عرض أقل';
            } else {
                // إخفاء الخدمات الإضافية
                const allServices = platformServices.querySelectorAll('.service-item:not(.show-more-btn)');
                for (let i = 4; i < allServices.length; i++) {
                    allServices[i].classList.add('hidden');
                }
                this.querySelector('span').textContent = 'عرض المزيد من الخدمات';
            }
        });
    });
    
    // تفعيل أزرار "عرض جميع الخدمات"
    const showAllBtns = document.querySelectorAll('.show-all-btn');
    showAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.service-category');
            const categoryId = category.id;
            
            // التبديل بين عرض وإخفاء جميع الخدمات
            if (this.textContent.includes('عرض جميع')) {
                // إظهار جميع الخدمات
                category.querySelectorAll('.service-item.hidden').forEach(service => {
                    service.classList.remove('hidden');
                });
                
                // تغيير نص أزرار "عرض المزيد"
                category.querySelectorAll('.show-more-btn span').forEach(span => {
                    span.textContent = 'عرض أقل';
                });
                
                this.textContent = `إخفاء بعض خدمات ${categoryId.replace('-services', '').replace('-', ' ')}`;
            } else {
                // إخفاء بعض الخدمات
                category.querySelectorAll('.service-platform').forEach(platform => {
                    const services = platform.querySelectorAll('.service-item:not(.show-more-btn)');
                    for (let i = 4; i < services.length; i++) {
                        services[i].classList.add('hidden');
                    }
                });
                
                // تغيير نص أزرار "عرض المزيد"
                category.querySelectorAll('.show-more-btn span').forEach(span => {
                    span.textContent = 'عرض المزيد من الخدمات';
                });
                
                this.textContent = `عرض جميع خدمات ${categoryId.replace('-services', '').replace('-', ' ')}`;
            }
        });
    });
    
    // تفعيل نموذج طلب الخدمة
    const serviceForm = document.getElementById('service-form');
    serviceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // التحقق من صحة البيانات
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const details = document.getElementById('details').value;
        
        // التحقق من تعبئة جميع الحقول
        if (!name || !phone || !email || !service || !details) {
            alert('يرجى تعبئة جميع الحقول المطلوبة');
            return;
        }
        
        // التحقق من صحة رقم الهاتف
        const phoneRegex = /^(05|5)[0-9]{8}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('يرجى إدخال رقم هاتف صحيح (يبدأ بـ 05 ويتكون من 10 أرقام)');
            return;
        }
        
        // التحقق من صحة البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('يرجى إدخال بريد إلكتروني صحيح');
            return;
        }
        
        // إرسال النموذج (محاكاة)
        const serviceName = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
        alert(`شكراً ${name} على طلب خدمة "${serviceName}". تم استلام طلبك بنجاح وسيتم التواصل معك قريباً على الرقم ${phone} أو البريد الإلكتروني ${email}.`);
        
        // إعادة تعيين النموذج
        serviceForm.reset();
    });
    
    // تفعيل التنقل السلس
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // إضافة تأثير التمرير للرأس
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        const nav = document.querySelector('.main-nav');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }
    });
});
