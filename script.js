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

// NOTE: jangan deklarasi ulang validPasswords di sini.
// passwords.js sudah membuat validPasswords = [ ... ] (pastikan index.html memuat passwords.js sebelum script.js).
// Jangan hapus variable berikut karena dipakai untuk menandai apakah data password sudah siap.
// Karena passwords.js sudah ada, kita anggap data sudah loaded.
let passwordsLoaded = true;

let currentCandidate = null;
let isVotingDisabled = false;
let votes = JSON.parse(localStorage.getItem('votes')) || [];
const successEl = document.getElementById('successMessage');

function updateCounts() {
    const voteCounts = {1: 0, 2: 0, 3: 0, 4: 0};
    votes.forEach(vote => {
        if (voteCounts[vote.candidateId] !== undefined) {
            voteCounts[vote.candidateId]++;
        }
    });
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

function startCountdown(seconds, callback) {
    let count = seconds;
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = count;
    const interval = setInterval(() => {
        count--;
        countdownEl.textContent = count;
        if (count <= 0) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function vote() {
    if (isVotingDisabled) return;

    isVotingDisabled = true;
    document.getElementById('vote-btn').disabled = true;

    votes.push({
        candidateId: currentCandidate
    });
    localStorage.setItem('votes', JSON.stringify(votes));
    updateCounts();

    closeModal();

    document.getElementById('thanks-screen').style.display = 'flex';
    document.getElementById('successMessage').textContent = 'Terima kasih telah memilih, semoga paslon yang kamu pilih bisa memajukan sekolah SMK PLUS YSB SURYALAYA';

    startCountdown(5, () => {
        location.reload();
    });
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

// Add function to render results on results page (used in index.html inline script)
function renderResults() {
    const voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {1:0, 2:0, 3:0, 4:0};
    const totalVotes = Object.values(voteCounts).reduce((a,b) => a + b, 0);
    const container = document.getElementById('results-container');
    if (!container) return; // If results container not present, skip
    container.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        const count = voteCounts[i] || 0;
        const percent = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : 0;
        const candidate = candidates[i];
        const div = document.createElement('div');
        div.style.marginBottom = '15px';
        div.style.background = 'rgba(0,0,0,0.5)';
        div.style.padding = '10px';
        div.style.borderRadius = '10px';
        div.innerHTML = `<strong>Paslon ${i} - Ketua: ${candidate.ketua}, Wakil: ${candidate.wakil}</strong><br>Suara: ${count} (${percent}%)`;
        container.appendChild(div);
    }
    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '20px';
    totalDiv.style.fontWeight = 'bold';
    totalDiv.textContent = `Total Suara: ${totalVotes}`;
    container.appendChild(totalDiv);
}
