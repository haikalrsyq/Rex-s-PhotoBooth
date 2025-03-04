const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureBtn = document.getElementById('captureBtn');
const switchCameraBtn = document.createElement('button');
const cameraSelect = document.createElement('select');
const ctx = canvas.getContext('2d');

switchCameraBtn.innerText = "🔄 Ganti Kamera";
switchCameraBtn.style.backgroundColor = "#3674B5";
switchCameraBtn.style.color = "white";
switchCameraBtn.style.border = "none";
switchCameraBtn.style.padding = "10px";
switchCameraBtn.style.cursor = "pointer";
switchCameraBtn.style.borderRadius = "5px";
switchCameraBtn.style.fontSize = "16px";
switchCameraBtn.style.marginTop = "10px";

document.body.insertBefore(switchCameraBtn, video.nextSibling);
document.body.insertBefore(cameraSelect, switchCameraBtn.nextSibling);

let currentStream = null;

function startCamera(deviceId = null) {
    const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true
    };
    
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Gagal mengakses kamera: ", err);
            alert("Pastikan Anda memberikan izin akses kamera!");
        });
}

function getCameraDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            cameraSelect.innerHTML = "";
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            videoDevices.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label || `Kamera ${cameraSelect.length + 1}`;
                cameraSelect.appendChild(option);
            });
            if (videoDevices.length > 0) {
                startCamera(videoDevices[0].deviceId);
            }
        })
        .catch(err => console.error("Error mendapatkan daftar kamera: ", err));
}

// Mulai kamera pertama kali
getCameraDevices();

// Fungsi untuk mengambil foto
captureBtn.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    photo.src = canvas.toDataURL('image/png');
    photo.style.display = 'block';
});

// Fungsi untuk mengganti kamera berdasarkan pilihan
cameraSelect.addEventListener('change', () => {
    startCamera(cameraSelect.value);
});

// Fungsi untuk mengganti kamera ke yang berikutnya
switchCameraBtn.addEventListener('click', () => {
    const options = cameraSelect.options;
    if (options.length > 1) {
        const currentIndex = cameraSelect.selectedIndex;
        const nextIndex = (currentIndex + 1) % options.length;
        cameraSelect.selectedIndex = nextIndex;
        startCamera(options[nextIndex].value);
    }
    // Fungsi untuk mengecek apakah elemen berada di dalam viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fungsi untuk menambahkan animasi saat elemen muncul di viewport
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.hidden');
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Jalankan fungsi saat halaman dimuat dan saat pengguna menggulir
window.addEventListener('load', handleScrollAnimation);
window.addEventListener('scroll', handleScrollAnimation);
});

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}