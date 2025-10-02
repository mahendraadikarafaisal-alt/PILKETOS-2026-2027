// Sample data for candidates
const candidates = {
    1: {
        ketua: "Anies Baswedan",
        wakil: "Muahmin Iskandar",
        photo: "ANIES.png",
        visi: "Membangun OSIS yang inklusif dan inovatif untuk semua siswa.",
        misi: "1. Meningkatkan fasilitas belajar.<br>2. Mengadakan kegiatan ekstrakurikuler lebih banyak.<br>3. Memperkuat komunikasi antar siswa dan guru."
    },
    2: {
        ketua: "Prabowo Subianto",
        wakil: "Gibran Rakabuming Raka",
        photo: "PRABOWO.png",
        visi: "OSIS yang berfokus pada pengembangan kepemimpinan siswa.",
        misi: "1. Pelatihan kepemimpinan rutin.<br>2. Kolaborasi dengan komunitas luar.<br>3. Program pengabdian masyarakat."
    },
    3: {
        ketua: "Ganjar",
        wakil: "Teuapal",
        photo: "GANJAR.png",
        visi: "Menciptakan lingkungan sekolah yang ramah dan berkelanjutan.",
        misi: "1. Kampanye lingkungan hijau.<br>2. Dukungan kesehatan mental siswa.<br>3. Peningkatan teknologi di sekolah."
    },
    4: {
        ketua: "Mas Nazriel Ganteng",
        wakil: "Istrinya Anime",
        photo: "MAS NAZRIEL.png",
        visi: "OSIS yang mendukung Nonton Anime Harem,Ecchi,Hentai(WAJIB).",
        misi: "1. Membangun Semua Siswa Harus Nonton Anime.<br>2. Membangun Semua Siswa Harus Wibu.<br>3. Membangun Semua Siswa Harus Harem,Ecchi,Hentai."
    }
};

let currentCandidate = null;
let isVotingDisabled = false;
let voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {1: 0, 2: 0, 3: 0, 4: 0};
const successEl = document.getElementById('successMessage');

function updateCounts() {
    localStorage.setItem('voteCounts', JSON.stringify(voteCounts));
}

function openModal(id) {
    currentCandidate = id;
    const cand = candidates[id];
    document.getElementById('modal-name').innerHTML = "Ketua: " + cand.ketua + "<br>Wakil: " + cand.wakil;
    document.getElementById('modal-photo').src = cand.photo;
    document.getElementById('modal-visi').textContent = cand.visi;
    document.getElementById('modal-misi').innerHTML = cand.misi;
    document.getElementById('thanks').style.display = 'none';
    document.getElementById('vote-btn').disabled = isVotingDisabled;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function vote() {
    if (isVotingDisabled) return;

    isVotingDisabled = true;
    document.getElementById('vote-btn').disabled = true;
    document.getElementById('thanks').style.display = 'block';

    voteCounts[currentCandidate]++;
    updateCounts();

    // Hide modal and main content, show thanks screen with countdown
    closeModal();
    document.querySelector('.container').style.display = 'none';
    const thanksScreen = document.getElementById('thanks-screen');
    thanksScreen.style.display = 'flex';

    let countdown = 5;
    const message = "<h1>Selamat anda telah memilih!</h1><br>Semoga paslon yang kamu pilih bisa menjadi sekolah makin maju.<br>Tunggu ";
    successEl.innerHTML = `${message}${countdown} detik untuk vote selanjutnya.`;

    const interval = setInterval(() => {
        countdown--;
        successEl.innerHTML = `${message}${countdown} detik untuk vote selanjutnya.`;
        if (countdown <= 0) {
            clearInterval(interval);
            thanksScreen.style.display = 'none';

            // Show animation screen after countdown
            const animationScreen = document.getElementById('animation-screen');
            animationScreen.style.display = 'flex';

            // After animation duration, hide animation and show main container
            setTimeout(() => {
                animationScreen.style.display = 'none';
                document.querySelector('.container').style.display = 'grid';
                isVotingDisabled = false;
                document.getElementById('vote-btn').disabled = false;
            }, 4000); // 4 seconds animation duration
        }
    }, 1000);
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Initialize counts
updateCounts();
