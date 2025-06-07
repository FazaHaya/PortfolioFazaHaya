// Inisialisasi EmailJS di awal, karena ini adalah prasyarat untuk fungsionalitas EmailJS lainnya.
emailjs.init('fVQOzdgnXtt3dYKVU'); // Pastikan ini adalah Public Key Anda

// --- Fungsionalitas EmailJS & Modal Sukses ---

const contactForm = document.getElementById('contact-form');
let successModal = document.getElementById('successModal');

// Fungsi untuk membuat modal sukses jika belum ada
function createSuccessModal() {
    const modal = document.createElement('div');
    modal.id = 'successModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[1000] hidden justify-center items-center';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
            <h3 class="text-2xl font-semibold text-pink-600 dark:text-sky-400">Pesan Terkirim!</h3>
            <p class="text-base text-gray-700 dark:text-gray-300">Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.</p>
            <button onclick="closeSuccessModal()" class="px-4 py-2 bg-pink-500 hover:bg-pink-600 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-xl transition duration-300">
                Tutup
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Fungsi untuk menutup modal sukses
function closeSuccessModal() {
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
}

// Cek dan buat modal saat script dimuat
if (!successModal) {
    successModal = createSuccessModal();
}


if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn'); // Lebih spesifik ke tombol dalam form ini
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        // EmailJS sendForm bisa langsung mengambil data dari form
        // Pastikan atribut 'name' dari input di HTML (name="from_name", name="from_email", name="message")
        // cocok dengan variabel di template EmailJS Anda.
        emailjs.sendForm('service_tbtx4gn', 'template_u1sbb47', this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                successModal.classList.remove('hidden');
                successModal.classList.add('flex');
                contactForm.reset();
            }, function (error) {
                console.error('FAILED...', error);
                alert('Gagal mengirim pesan: ' + error.text);
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText; // Kembalikan teks asli tombol
                submitBtn.disabled = false; // Aktifkan kembali tombol
            });
    });
}