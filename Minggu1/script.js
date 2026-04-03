const form = document.getElementById('questionForm');
const input = document.getElementById('matkulInput');
const list = document.getElementById('questionList');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const fetchAPIBtn = document.getElementById('fetchAPIBtn');
const fetchLocalBtn = document.getElementById('fetchLocalBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');

let allData = [];
let displayedCount = 0;
const batchSize = 5;

// Helper: get current filtered data
function getFilteredData() {
  const query = searchInput.value.trim().toLowerCase();
  return allData.filter(item =>
    item.matkul.toLowerCase().includes(query) ||
    item.tahun.toString().includes(query) ||
    item.soal.toLowerCase().includes(query)
  );
}

// 2. Fetch data dari JSON lokal
async function fetchLocalData() {
  try {
    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to fetch local data');
    allData = await response.json();
    displayData(false);  // Reset dan tampilkan batch pertama
  } catch (err) {
    errorDiv.textContent = 'Error loading local data: ' + err.message;
    errorDiv.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
}

// 3. Fetch data dari API
async function fetchAPIData() {
  try {
    loading.style.display = 'block';
    errorDiv.style.display = 'none';
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Failed to fetch API data');
    const data = await response.json();
    // Transform to match our format
    allData = data.slice(0, 20).map(post => ({
      matkul: `Post ${post.id}`,
      tahun: 2023,
      soal: post.title
    }));
    displayData(false);
  } catch (err) {
    errorDiv.textContent = 'Error loading API data: ' + err.message;
    errorDiv.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
}

// 4. Display data
function displayData(append = false) {
  const filtered = getFilteredData();

  // Reset jika bukan append mode
  if (!append) {
    list.innerHTML = '';
    displayedCount = 0;
  }

  // Hitung range yang akan ditampilkan
  const start = displayedCount;
  const end = Math.min(displayedCount + batchSize, filtered.length);

  // Tampilkan items dari start sampai end
  for (let i = start; i < end; i++) {
    const item = filtered[i];
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.matkul}</strong> (${item.tahun}) - ${item.soal}`;
    list.appendChild(li);
  }

  // Update counter
  displayedCount = end;

  // Kontrol tombol Load More
  if (displayedCount >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline';
  }
}

// 5. Event Listeners
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const value = input.value.trim();
  if (value === "") {
    alert("Input tidak boleh kosong!");
    return;
  }
  // Add new item
  const newItem = { matkul: value, tahun: new Date().getFullYear(), soal: `Soal tentang ${value}` };
  allData.push(newItem);
  input.value = "";
  displayData(false);
});

// Search: reset display
searchInput.addEventListener('input', () => displayData(false));

// Load More: append items
loadMoreBtn.addEventListener('click', () => displayData(true));

// Fetch buttons
fetchAPIBtn.addEventListener('click', fetchAPIData);
fetchLocalBtn.addEventListener('click', fetchLocalData);

// 7. Initialize
fetchLocalData();
