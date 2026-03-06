// script.js - روح الموقع والمفاجآت (النسخة النهائية مع تحكم الصوت)

// ===== 1. شاشة التحميل =====
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }, 2000);
});

// ===== 2. تشغيل الموسيقى (بلاي ليست متسلسل) =====
const audio = document.getElementById('bg-music');
const songs = [
    './images/videos/Albumaty.Com_amrw_gabr_ahly_krar_-_wana_maak_ana_msh_bfkr.mp3',
    './images/videos/Albumaty.Com_amrw_gabr_hbyby_da_-_klh_kaly_ashmana_hw.mp3',
    './images/videos/Albumaty.Com_bhaa_sltan__aghnyt_mslsl_swa_swa.mp3'
];
let currentSongIndex = 0;
let originalVolume = 0.65; // الصوت الأصلي
let isVoicePlaying = false; // هل فيه رسالة صوتية شغالة？   

// تحميل الأغنية حسب index
function loadSong(index) {
    if (index < songs.length) {
        audio.src = songs[index];
        audio.load();
        console.log(`جاري تشغيل الأغنية ${index + 1}`);
    }
}

// تشغيل الأغنية التالية
function playNextSong() {
    if (!isVoicePlaying) { // لو مفيش رسالة صوتية، كمل عادي
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audio.play().catch(e => console.log("مشغل الموسيقى:", e));
    }
}

// حدث عند انتهاء الأغنية
audio.addEventListener('ended', playNextSong);

// محاولة تشغيل الموسيقى
function playMusic() {
    audio.volume = originalVolume;
    audio.play().catch(e => {
        console.log("المتصفح منع التشغيل التلقائي، هنشغلها بعد دخول المستخدم", e);
    });
}

// تحميل أول أغنية
loadSong(0);

// ===== 3. دوال التحكم في الصوت =====
function lowerMusicVolume() {
    isVoicePlaying = true;
    audio.volume = 0.03; // 3% من الصوت (واطي جداً)
}

function restoreMusicVolume() {
    isVoicePlaying = false;
    audio.volume = originalVolume; // رجوع للصوت الأصلي
}

// ===== 4. زر الدخول وإظهار المتحف =====
const enterBtn = document.getElementById('enterBtn');
const museumInterior = document.getElementById('museumInterior');
const gateSection = document.querySelector('.gate-section');

// محاولة تشغيل الموسيقى مباشرة
playMusic();

enterBtn.addEventListener('click', function() {
    playMusic();
    
    gateSection.style.transition = 'opacity 1.5s';
    gateSection.style.opacity = '0';
    
    setTimeout(() => {
        gateSection.style.display = 'none';
        museumInterior.style.display = 'block';
        museumInterior.style.animation = 'fadeInUp 1.5s';
        
        updateCounter();
        setInterval(updateCounter, 1000);
    }, 1500);
});

// ===== 5. عرض الرسائل في السلايدر (بما فيها رسالتك) =====
const messages = [
    { text: "..موافقة نرتبط ؟ 🌝🌚😂", sender: "بيشو" , date:"2024-3-17"},
    { text: " Yes🌚", sender: "مارلين" , date:"2024-3-17"},
    { text: "حسيت اني عايشه عشان حد جميل بيحبني وبحبه", sender: "مارلين" , date:"2024-6-2"},
    { text: "انا بحببببك اووووي لبعد الحدوووود♥️♥️♥️", sender: "بيشو" , date:"2024-8-20"},
    { text: "عشان انا وف حضنك بلاقي امان ودفي الدنيا كلها♥️♥️♥️", sender: "مارلين" , date:"2024-8-31"},
    { text: "هتجوزك ياجمل و احلى مرمووووورى ف الدونياااا🌚🙈♥️♥️", sender: "بيشو" , date:"2025-1-4"},
    { text: "بحبك فشششششششششخ يكتكوووووووووووووتة😘🫂🌚♥️🤭", sender: "بيشو" , date:"2025-8-3"},
    { text: "بحبك جدا يمارلين🫂🫂🙈♥️♥️♥️", sender: "بيشو" , date:"2024-4-1"},
    { text: "وانا كمان بموت فيكك🫂♥️♥️♥️♥️🥹", sender: "مارلين" , date:"2024-4-1"},
    { text: "مش هنفع لحد غيرك ♥️♥️🌚", sender: "مارلين" , date:"2025-3-16"},
    { text: "ربنا يخليك لياا ومشوفش فيك حاجه وحشه ابدااااا🫂🫂🥹♥️♥️", sender: "مارلين" , date:"2025-8-6"},
    { text: "عشان انا مقدرش اعيش من غيرك بجددد🫂🥹♥️♥️♥️", sender: "مارلين" , date:"2025-9-4"},
    { text: "الاحن والافضل والاقرب لقلبي🥹🫂♥️♥️♥️♥️", sender: "مارلين" , date:"2025-6-13"},
    { text: "وانا كمان بحبك اووووووووى ....مكنتش اعرف ان كل الحب دا ليكى انتى بسسسس🫂🫂♥️♥️♥️🌚", sender: "بيشو" , date:"2025-8-7"},
    { text: "احلي قعدت ثرابيست الواااحد بياخدها وهو معاك🌚🫂♥️♥️♥️♥️", sender: "مارلين" , date:"2025-6-13"},
    { text: "شكرا انك الجانب الحلو اللي دايما بفتكره واشكر ربنا عليه 🫂♥️♥️♥️", sender: "مارلين" , date:"2025-3-16"},
    { text: "هتفضل انت الرااجل اللي بحلم اكمل معاه حياتي🫂🫂♥️♥️", sender: "مارلين" , date:"2025-6-13"},
    { text: "انت كده كده🙈♥️♥️♥️♥️", sender: "مارلين" , date:"2025-8-15"},
    { text: "حياتي هتيقي فاضيه ووحشه وملهاش طعم من غير وجودك فيها 🫂♥️♥️♥️", sender: "مارلين" , date:"2025-8-15"},
    { text: "كل سنة وانتى عمرك مابتتغيرى معايا ولا بتزهقى منى ولا كلامى ولا نكدى ولا غلاستى .. كل سنة وانتى معايا ف كل لحظات السنة و انتى جمبى و انتى سندى..كل سنة وانتى حياتى و امانى و سندى و عكازى ...كل سنة وانت الحتة المنوره و الحلوه جوايا .. بحب علاقتنا اوووى اوووى بكل حاجة فيها .. شكراا من كل قلبى لربنا أنة بعتلى حد زيك .. شكرا أنة خلاكى بتاعتى و ليااا و منى .. شكرا انك حبيبتى اووى اوى كدا .. شكرا انك كل حاجه بالنسبالى.كل سنة وانتى طيبة يرووح الروووح و نن العييين و نبض القلب .. 😘🙈🔥♥️♥️♥️", sender: "بيشو" , date:"2026-1-1"},
    { text: " بحبك مووووووووت يحياااتى 🌚🫂🫂♥️♥️♥️♥️", sender: "بيشو" , date:"2026-1-1"},
    { text: "اريد يدك وقلبك وعقلك اريد ان تلمس يدى يداكى .. وان يشعر قلبى بدم قلبك .. وان يبقى عقلى و فكرى منشغلا بكى حتى مماتى .. اريد ان اشاركك حياتى وتفاصيلى ... اريد ان نتزوج ونبنى اسرتنا الصغيره وحدنا دون وجود شخص اخر ف حياتنا ... ف هل تقبلى اميرتى ؟!🌚♥️🫶🏻🙈👑♥️", sender: "بيشو" , date:"2024-6-6"},
    { text: "عندما يقف العقل عن التصديق و يرتفع الدوبامين لاخره .. تاكد انك تشاهد قلبك بعينيك و هكذا تصبح نظراتك الية ♥️♥️♥️", sender: "بيشو" , date:"2025-1-10"},
    { text: "بصلي لربنا يبقي معانا ويكملنا الطريق اللي بداناه♥️♥️", sender:"مارلين" , date:"2025-8-26"}
    
];

const sliderContainer = document.getElementById('sliderContainer');
const sliderDots = document.getElementById('sliderDots');

if (sliderContainer) {
    sliderContainer.innerHTML = '';
    sliderDots.innerHTML = '';
    
    messages.forEach((msg, index) => {
        const card = document.createElement('div');
        card.className = 'message-card';
       // الجزء الخاص بإنشاء الكارد (حوالي سطر 200)
        card.innerHTML = `
        <div class="sender">${msg.sender.includes('بيشو') ? '🐻 بيشو' : '🌸 مارلين'}</div>
        <div class="text">${msg.text}</div>
        <div class="date">${new Date(msg.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        `;
        sliderContainer.appendChild(card);
        
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            const cardWidth = card.offsetWidth;
            sliderContainer.scrollTo({
                left: index * (cardWidth + 30) - 50,
                behavior: 'smooth'
            });
        });
        sliderDots.appendChild(dot);
    });
}

if (sliderContainer) {
    sliderContainer.addEventListener('scroll', () => {
        const scrollPos = sliderContainer.scrollLeft;
        const cards = document.querySelectorAll('.message-card');
        const dots = document.querySelectorAll('.dot');
        
        cards.forEach((card, index) => {
            const cardLeft = card.offsetLeft - 50;
            if (Math.abs(cardLeft - scrollPos) < 200) {
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        });
    });
}

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: 350, behavior: 'smooth' });
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -350, behavior: 'smooth' });
    });
}

// ===== 6. عداد الحب (17 مارس 2024) =====
function updateCounter() {
    const startDate = new Date('2024-03-17T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = now - startDate;

    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

// ===== 7. المفاجآت (مطورة) مع تحكم الصوت في الفويس =====
const surpriseDisplay = document.getElementById('surpriseDisplay');

// مفاجأة الدبدوب
document.getElementById('teddyBtn').addEventListener('click', () => {
    surpriseDisplay.innerHTML = `
        <div style="text-align:center; background: linear-gradient(145deg, #fff0f5, #ffe4e9); padding: 40px; border-radius: 50px;">
            <div style="position: relative;">
                <i class="fas fa-bear" style="font-size:8rem; color: #b96b4a; filter: drop-shadow(0 10px 20px rgba(185,107,74,0.5));"></i>
                <i class="fas fa-heart" style="font-size:3rem; color: #ff6f91; position: absolute; top: 0; right: 30%; animation: heartbeat 1.5s infinite;"></i>
            </div>
           <p style="font-size:2.5rem; font-weight:700; color: #4a3f3a; margin: 20px 0 10px;">دبدوبك هيحكيلك حكاية</p>

<p style="font-size:1.8rem; color: #b96b4a; line-height:1.9;">
"كان فيه دبدوب صغير عايش لوحده في الغابة. كان شايف إن الدنيا كبيرة عليه شوية،
وإنه مش مميز زي باقي الحيوانات. كان بيضحك مع الكل، لكن جواه دايمًا حاسس
إن في حاجة ناقصة.

وفي يوم… وهو ماشي بين الأشجار، شاف وردة جميلة جدًا.
كانت مختلفة عن أي وردة شافها قبل كده.  
كانت هادية… لكنها مليانة حياة.

الدبدوب قرب منها وسألها:  
"إزاي تقدري تفضلي جميلة كده وسط الشوك والريح؟"

ابتسمت الوردة وقالت له:  
"عشان الجمال الحقيقي مش بييجي من الدنيا اللي حوالينا،
لكن من القلب اللي جوانا."

ومن اليوم ده… الدبدوب بدأ يشوف نفسه بشكل مختلف.
بقى يحس إنه كفاية… وإن فيه حاجة حلوة جواه تستاهل تتحب.

ومع الأيام اكتشف حاجة أهم:
إن وجود الوردة جنبه خلاه يشوف أجمل نسخة من نفسه.

ومن ساعتها…  
الدبدوب بقى كل يوم يعدي على الوردة،
مش عشان يطمن عليها بس…
لكن عشان يفتكر إن في حد في الدنيا
خلّى قلبه يحس إنه مميز.

وأنا كمان…  
لقيت وردتي اللي خلتني أشوف نفسي أحسن،
وخلت قلبي يعرف معنى الدفا الحقيقي.

ووعد مني ليكي يا كتكووتة…
إن الدبدوب ده هيفضل جنب وردته دايمًا،
مش بس في الأيام الحلوة…
لكن كمان في الأيام اللي محتاجة حضن أكتر." 🌚❤️
</p>

<p style="font-size:1.5rem; margin-top:25px; color:#e6a4b4;">
الدبدوب_بيعشق_الكتكووتة
</p>
        </div>
    `;
});

// مفاجأة الوردة
document.getElementById('roseBtn').addEventListener('click', () => {
    surpriseDisplay.innerHTML = `
        <div style="text-align:center; background: linear-gradient(145deg, #f9eef7, #fce4ec); padding: 40px; border-radius: 50px;">
            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                <i class="fas fa-rose" style="font-size:6rem; color: #ff3388; animation: float 3s infinite;"></i>
                <i class="fas fa-rose" style="font-size:5rem; color: #ff6f91; animation: float 4s infinite; transform: rotate(-15deg);"></i>
                <i class="fas fa-rose" style="font-size:7rem; color: #ff99cc; animation: float 5s infinite; transform: rotate(10deg);"></i>
            </div>
           <p style="font-size:2.8rem; font-weight:700; color: #b34180; margin-bottom: 20px;">سر الوردة</p>

<p style="font-size:1.8rem; color: #4a3f3a; line-height:1.8;">
"بيقولوا إن الوردة عشان تفضل جميلة لازم حد يهتم بيها كل يوم…  
وأنا لما شوفتك فهمت المعنى ده.  
انتي زي الوردة بالظبط… وجودك لوحده بيخلي الدنيا أهدى وأجمل.  
…  
 وعد حقيقي حبيبى:  
هفضل أختارك كل يوم，      
وأحافظ عليكي زي ما الواحد بيحافظ على أجمل وردة في حياته." 🌹❤️
</p>

<p style="font-size:1.5rem; margin-top:25px; color:#ff6f91;">بيشو_بيحب_مرموورتة</p>
        </div>
    `;
});

// لعبة "جربى حظك"
document.getElementById('gameBtn').addEventListener('click', () => {
    const loveMessages = [
        { msg: "هتتجوزوا في أحلى يوم وتخلفوا بيبي كيوت يشبهكم 🌚❤️", emoji: "👰‍♀️🤵‍♂️🍼" },
        { msg: "هتفضلوا مع بعض لحد ما الشيب يظهر وشيخوخة تجمعكم على كافيه", emoji: "👴👵☕" },
        { msg: "جايبهالك من الآخر: أنا عارف إنك زعلانة مني أحيانًا، بس صدقيني أنا بحبك أكتر من ما تتخيلي", emoji: "💌" },
        { msg: "مارلين هتكون أحلى عروسة في الدنيا وبيشو هيعملها أحلى فرح", emoji: "🎉👰‍♀️" },
        { msg: "سنتين دول مجرد بداية لمشوار عمر كامل، لسه قدامنا العمر كله", emoji: "⏳❤️" },
        { msg: "هتقضوا العمر مع بعض في حب وسعادة، وهيفتكروا الموقع ده ويقولوا إزاي كنا صغيرين", emoji: "🏡👵👴" },
        { msg: "هتسافروا مع بعض وتصوروا مليون صورة وتقولوا دول أحلى أيامنا", emoji: "✈️📸" },
        { msg: "هتجيبوا قطة أو كلب صغير تسميوه على اسم أول مكان تقابلو فيه", emoji: "🐱🐶" },
        { msg: "هتعلموا أولادكم إزاي يحبوا زي ما انتوا حبيتوا", emoji: "👨‍👩‍👧‍👦" },
        { msg: "هتفضل تعاتبني على نفس الحاجات وأفضل أقولك أسف وأعملهالك عشان بحبك", emoji: "😅❤️" },
        { msg: "هتعمل اكل وحش وهأكل وأقولك تحفة عشان خاطرك", emoji: "🍳😬" },
        { msg: "هتاخدي بالك مني وأنا تعبان وأفضل طول عمري شايلك في عيني", emoji: "🏥😷" },
        { msg: "هتكدبي عليا عشان تفرحيني وأكذب عشانك عشان ما تزعليش", emoji: "🎭" },
        { msg: "هتخلفي بنت تبقى أحلى من القمر وولد يبقى راجل زيه", emoji: "👧👦" },
        { msg: "هتعيشوا في بيت صغير مليان ضحكة وهما وألف حكاية", emoji: "🏠📖" },
        { msg: "هتكبروا سوا على كرسي هزاز وتراجعوا ذكرياتكم وتقولوا الحمد لله", emoji: "👵👴" }
    ];
    
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    const selected = loveMessages[randomIndex];
    
    surpriseDisplay.innerHTML = `
        <div style="text-align:center; background: linear-gradient(145deg, #fff9e6, #fff0d9); padding: 40px; border-radius: 50px;">
            <div style="font-size:6rem; margin-bottom:20px;">${selected.emoji}</div>
            <p style="font-size:2rem; font-weight:700; color: #b96b4a;">🔮 توقعات الحب:</p>
            <p style="font-size:2.5rem; font-weight:700; color: #ff3388; margin: 20px 0; line-height:1.4;">"${selected.msg}"</p>
            <p style="font-size:1.2rem; color: #999; margin-top:30px;">${randomIndex + 1}/16 • كل مرة هتطلعلك حاجة</p>
            <button onclick="this.parentElement.innerHTML='<p style=\\'font-size:2rem;\\'>اضغطي على جربى حظك تاني 🌚</p>'" style="margin-top:20px; padding:15px 40px; background:#ff99cc; border:none; border-radius:60px; color:white; font-size:1.8rem; cursor:pointer; font-weight:600;">جربى تاني</button>
        </div>
    `;
});

// ===== 8. مفاجأة الرسالة الصوتية (مع تحكم الصوت) =====
document.getElementById('voiceBtn').addEventListener('click', () => {
    // خفض صوت الموسيقى
    lowerMusicVolume();
    
    surpriseDisplay.innerHTML = `
        <div style="text-align:center; background: linear-gradient(145deg, #e6f0ff, #d4e4ff); padding: 40px; border-radius: 50px;">
            <i class="fas fa-microphone-alt" style="font-size:6rem; color: #4a6fa5; animation: pulse 2s infinite; margin-bottom:20px;"></i>
            <p style="font-size:2.5rem; font-weight:700; color: #1e3c72; margin-bottom: 20px;">رسالة صوتية من بيشو</p>
            <audio id="voiceMessage" controls style="width:100%; max-width:500px; margin:20px auto;" onplay="lowerMusicVolume()" onended="restoreMusicVolume()" onpause="restoreMusicVolume()">
                <source src="./images/videos/love.mp3" type="audio/mpeg">
                <source src="./images/videos/love.mp3" type="audio/mpeg">
                متصفحك مش بيدعم الصوت
            </audio>
            <p style="font-size:1.2rem; color: #666; margin-top:30px;">🎤 ربنا يخليكى ليا يحبيبة قلبى  🎤</p>
            <button onclick="document.getElementById('surpriseDisplay').innerHTML=''; restoreMusicVolume();" style="margin-top:20px; padding:10px 30px; background:#4a6fa5; border:none; border-radius:50px; color:white; font-size:1.4rem; cursor:pointer;">إغلاق</button>
        </div>
    `;
    
    // إضافة مستمعين للأحداث على عنصر الصوت الجديد
    setTimeout(() => {
        const voiceMsg = document.getElementById('voiceMessage');
        if (voiceMsg) {
            voiceMsg.addEventListener('play', lowerMusicVolume);
            voiceMsg.addEventListener('ended', restoreMusicVolume);
            voiceMsg.addEventListener('pause', restoreMusicVolume);
        }
    }, 100);
});

// ===== 9. تأثيرات خلفية متحركة بالثلاثي الأبعاد =====
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.PointLight(0xff99cc, 1, 30);
light.position.set(5, 5, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const particleCount = 600;
const particlesGeo = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);
const colorArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 50;
    posArray[i+1] = (Math.random() - 0.5) * 30;
    posArray[i+2] = (Math.random() - 0.5) * 30;
    
    colorArray[i] = 0.9 + Math.random() * 0.1;
    colorArray[i+1] = 0.6 + Math.random() * 0.3;
    colorArray[i+2] = 0.7 + Math.random() * 0.3;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particleMat = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending
});
const particles = new THREE.Points(particlesGeo, particleMat);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== 10. تأثير ورد متساقط =====
window.addEventListener('scroll', () => {
    if (Math.random() > 0.7) {
        const rose = document.createElement('i');
        rose.className = 'fas fa-rose';
        rose.style.position = 'fixed';
        rose.style.left = Math.random() * 100 + '%';
        rose.style.top = '-10%';
        rose.style.color = '#e6a4b4';
        rose.style.fontSize = (Math.random() * 30 + 20) + 'px';
        rose.style.opacity = '0.5';
        rose.style.zIndex = '9999';
        rose.style.pointerEvents = 'none';
        rose.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(rose);
        
        setTimeout(() => rose.remove(), 5000);
    }
});

// ===== 11. إضافة الأنيميشن =====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        to { transform: translateY(120vh) rotate(360deg); }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes heartbeat {
        0%,100%{ transform: scale(1); }
        50%{ transform: scale(1.2); }
    }
    @keyframes float {
        0%,100%{ transform: translateY(0); }
        50%{ transform: translateY(-20px); }
    }
    @keyframes pulse {
        0%,100%{ transform: scale(1); opacity: 1; }
        50%{ transform: scale(1.1); opacity: 0.8; }
    }
`;
document.head.appendChild(style);

// إصلاح الأيقونات
if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);
}

console.log('🎉 متحف الحب جاهز! افتحوا الموقع واستمتعوا');
