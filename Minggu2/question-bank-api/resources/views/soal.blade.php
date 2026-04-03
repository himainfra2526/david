<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Question Bank - Premium CRUD</title>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary: #6366f1;
            --primary-light: #818cf8;
            --secondary: #ec4899;
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            --glass-bg: rgba(30, 41, 59, 0.7);
            --glass-border: rgba(255, 255, 255, 0.1);
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background: var(--bg-gradient);
            background-attachment: fixed;
            color: var(--text-main);
            min-height: 100vh;
            padding: 2rem;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 1000px;
            animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(to right, #818cf8, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn {
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .btn-primary:hover {
            background: var(--primary-light);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        /* Table Design */
        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        th {
            background: rgba(255, 255, 255, 0.03);
            text-align: left;
            padding: 1rem 1.5rem;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-dim);
        }

        td {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--glass-border);
            color: var(--text-main);
        }

        tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .badge {
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-pg { background: rgba(52, 211, 153, 0.2); color: #34d399; }
        .badge-essay { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
        .badge-praktikum { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }

        .actions {
            display: flex;
            gap: 10px;
        }

        .btn-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: grid;
            place-items: center;
            border: none;
            cursor: pointer;
            color: white;
            transition: 0.2s;
        }

        .btn-edit { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .btn-edit:hover { background: #3b82f6; color: white; }
        .btn-delete { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .btn-delete:hover { background: #ef4444; color: white; }

        /* Modal styling */
        .modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            display: none;
            place-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal.active {
            display: grid;
            opacity: 1;
        }

        .modal-content {
            background: #1e293b;
            padding: 2.5rem;
            border-radius: 24px;
            width: 450px;
            position: relative;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            border: 1px solid var(--glass-border);
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .modal.active .modal-content {
            transform: scale(1);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-dim);
            font-size: 0.9rem;
        }

        input, select {
            width: 100%;
            padding: 0.8rem 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            color: white;
            outline: none;
            transition: 0.3s;
        }

        input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
        }

        .modal-title {
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 2rem;
        }

        /* Toast notifications */
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 12px;
            background: #34d399;
            color: white;
            font-weight: bold;
            display: none;
            animation: slideIn 0.3s ease forwards;
            z-index: 2000;
        }

        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <h1>Bank Soal API</h1>
                <p style="color: var(--text-dim);">Kelola daftar mata kuliah dan tipe soal</p>
            </div>
            <button class="btn btn-primary" onclick="openModal()">
                <i class="fas fa-plus"></i> Tambah Soal
            </button>
        </header>

        <div class="glass-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mata Kuliah</th>
                        <th>Tahun</th>
                        <th>Tipe</th>
                        <th style="width: 120px;">Aksi</th>
                    </tr>
                </thead>
                <tbody id="soalTableBody">
                    <!-- Data will be loaded here -->
                    <tr><td colspan="5" style="text-align:center">Memuat data...</td></tr>
                </tbody>
            </table>
        </div>

        <div id="paginationContainer" class="pagination"></div>
    </div>

    <!-- Modal Form -->
    <div id="soalModal" class="modal">
        <div class="modal-content">
            <h2 class="modal-title" id="modalTitle">Tambah Soal Baru</h2>
            <form id="soalForm">
                <input type="hidden" id="soalId">
                <div class="form-group">
                    <label>Nama Mata Kuliah</label>
                    <input type="text" id="matkul" placeholder="Contoh: Pemrograman Dasar" required>
                </div>
                <div class="form-group">
                    <label>Tahun Ajaran</label>
                    <input type="number" id="tahun" value="2024" min="2000" max="2100" required>
                </div>
                <div class="form-group">
                    <label>Tipe Ujian</label>
                    <select id="tipe">
                        <option value="pilihan_ganda">Pilihan Ganda</option>
                        <option value="essay">Essay</option>
                        <option value="praktikum">Praktikum</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 2rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1">Simpan Data</button>
                    <button type="button" class="btn" style="background: transparent; border: 1px solid var(--glass-border); color: white;" onclick="closeModal()">Batal</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Simple Toast -->
    <div id="toast" class="toast">Berhasil!</div>

    <script>
        const API_URL = '/api/soal';
        let currentPage = 1;

        // Fetch Data
        async function fetchSoal(page = 1) {
            currentPage = page;
            const res = await fetch(`${API_URL}?page=${page}`);
            const result = await res.json();
            
            const tbody = document.getElementById('soalTableBody');
            tbody.innerHTML = '';

            if (result.success && result.data.data.length > 0) {
                result.data.data.forEach(soal => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>#${soal.id}</td>
                        <td><strong>${soal.matkul}</strong></td>
                        <td>${soal.tahun}</td>
                        <td><span class="badge badge-${soal.tipe.replace('_', '-')}">${soal.tipe.replace('_', ' ').toUpperCase()}</span></td>
                        <td>
                            <div class="actions">
                                <button class="btn-icon btn-edit" onclick="editSoal(${soal.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon btn-delete" onclick="deleteSoal(${soal.id})"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
                renderPagination(result.data);
            } else {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 3rem; color: var(--text-dim)">Tidak ada data soal ditemukan.</td></tr>';
                document.getElementById('paginationContainer').innerHTML = '';
            }
        }

        // Render Pagination buttons
        function renderPagination(data) {
            const container = document.getElementById('paginationContainer');
            container.innerHTML = '';
            
            if (data.last_page > 1) {
                // Prev
                if (data.current_page > 1) {
                    container.innerHTML += `<button class="btn" onclick="fetchSoal(${data.current_page - 1})"><i class="fas fa-chevron-left"></i></button>`;
                }
                
                // Info
                container.innerHTML += `<span style="padding: 10px">Halaman ${data.current_page} dari ${data.last_page}</span>`;
                
                // Next
                if (data.current_page < data.last_page) {
                    container.innerHTML += `<button class="btn" onclick="fetchSoal(${data.current_page + 1})"><i class="fas fa-chevron-right"></i></button>`;
                }
            }
        }

        // Open Modal (Add/Edit)
        function openModal(id = null) {
            document.getElementById('soalModal').classList.add('active');
            if (!id) {
                document.getElementById('modalTitle').innerText = 'Tambah Soal Baru';
                document.getElementById('soalForm').reset();
                document.getElementById('soalId').value = '';
            }
        }

        function closeModal() {
            document.getElementById('soalModal').classList.remove('active');
        }

        // Form Submit
        document.getElementById('soalForm').onsubmit = async (e) => {
            e.preventDefault();
            const id = document.getElementById('soalId').value;
            const data = {
                matkul: document.getElementById('matkul').value,
                tahun: document.getElementById('tahun').value,
                tipe: document.getElementById('tipe').value
            };

            const method = id ? 'PUT' : 'POST';
            const url = id ? `${API_URL}/${id}` : API_URL;

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                showToast(id ? 'Berhasil diperbarui!' : 'Berhasil ditambahkan!');
                closeModal();
                fetchSoal(currentPage);
            } else {
                alert('Gagal menyimpan data. Cek input atau database.');
            }
        };

        // Edit
        async function editSoal(id) {
            const res = await fetch(`${API_URL}/${id}`);
            const result = await res.json();
            if (result.success) {
                const soal = result.data;
                document.getElementById('soalId').value = soal.id;
                document.getElementById('matkul').value = soal.matkul;
                document.getElementById('tahun').value = soal.tahun;
                document.getElementById('tipe').value = soal.tipe;
                document.getElementById('modalTitle').innerText = 'Edit Data Soal';
                openModal(id);
            }
        }

        // Delete
        async function deleteSoal(id) {
            if (confirm('Yakin ingin menghapus soal ini?')) {
                const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    showToast('Data dihapus!', '#ef4444');
                    fetchSoal(currentPage);
                }
            }
        }

        function showToast(msg, color = '#34d399') {
            const t = document.getElementById('toast');
            t.style.background = color;
            t.innerText = msg;
            t.style.display = 'block';
            setTimeout(() => { t.style.display = 'none'; }, 3000);
        }

        // Initial Load
        fetchSoal();
    </script>
</body>
</html>
