// <!-- EmailJS SDK -->

  // Inisialisasi EmailJS
  emailjs.init('fVQOzdgnXtt3dYKVU');

  // Cek apakah modal sudah ada
  let successModal = document.getElementById('successModal');
  if (!successModal) {
    successModal = document.createElement('div');
    successModal.id = 'successModal';
    successModal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[1000] hidden justify-center items-center';

    successModal.innerHTML = `
      <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
        <h3 class="text-2xl font-semibold text-pink-600">Pesan Terkirim!</h3>
        <p class="text-base">Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.</p>
        <button onclick="document.getElementById('successModal').classList.add('hidden')"
          class="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition duration-300">
          Tutup
        </button>
      </div>
    `;
    document.body.appendChild(successModal);
  }

  // Handler untuk form submission
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;

    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      time: new Date().toLocaleString()
    };

    emailjs.send('service_tbtx4gn', 'template_u1sbb47', templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response);
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        document.getElementById('contactForm').reset();
      }, function (error) {
        console.error('FAILED...', error);
        alert('Gagal mengirim pesan: ' + error.text);
      })
      .finally(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Kirim Pesan';
        submitBtn.disabled = false;
      });
  });



//   <!-- Script Toggle Dark Mode + Simpan ke localStorage -->
    const html = document.documentElement;
    const toggleBtn = document.getElementById('modeToggle');

    // Set awal dari localStorage
    if (localStorage.getItem('theme') === 'light') {
      html.classList.remove('dark');
      toggleBtn.textContent = '🌙 Dark Mode';
    } else {
      html.classList.add('dark');
      toggleBtn.textContent = '☀️ Light Mode';
    }

    toggleBtn.addEventListener('click', () => {
      html.classList.toggle('dark');
      if (html.classList.contains('dark')) {
        toggleBtn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
      }
    });