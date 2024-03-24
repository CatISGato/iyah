// Data contoh untuk ditampilkan
var data = [
    { nim: '123', nama: 'John Doe', alamat: 'Jl. Contoh No. 123' },
    { nim: '456', nama: 'Jane Smith', alamat: 'Jl. Contoh No. 456' },
];

// Fungsi untuk menampilkan data
function displayData() {
    var table = document.getElementById('data-table');
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = data[i].nim;
        cell2.innerHTML = data[i].nama;
        cell3.innerHTML = data[i].alamat;
        cell4.innerHTML = '<button onclick="openEditModal(' + i + ')">Edit</button>';
        cell5.innerHTML = '<button onclick="deleteRow(' + i + ')">Hapus</button>';
    }
}

// Fungsi untuk membuka modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Fungsi untuk menutup modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Fungsi untuk menambahkan data baru
function addData() {
    var nim = document.getElementById('nim').value;
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    if (nim && nama && alamat) {
        data.push({ nim: nim, nama: nama, alamat: alamat });
        closeModal('addModal');
        addRowToTable(data[data.length - 1], data.length - 1); // Tambahkan baris baru ke tabel
        alert('Data berhasil ditambahkan!');
    } else {
        alert('Data tidak lengkap. Harap isi semua kolom.');
    }
}

// Fungsi untuk membuka modal edit
function openEditModal(index) {
    var modal = document.getElementById('editModal');
    document.getElementById('editNama').value = data[index].nama;
    document.getElementById('editAlamat').value = data[index].alamat;
    modal.style.display = 'block';
    document.getElementById('editIndex').value = index; // Assign index value here
}

// Fungsi untuk menghapus baris dari tabel
function deleteRow(index) {
    var table = document.getElementById('data-table');
    if (index >= 0 && index < table.rows.length) {
        // Pastikan indeks valid
        table.deleteRow(index + 1); // Hapus baris berdasarkan indeks (+1 karena baris header dianggap indeks 0)
        data.splice(index, 1); // Hapus data dari array
        alert('Baris berhasil dihapus!');
    } else {
        alert('Indeks baris tidak valid!');
    }
}

// Fungsi untuk melakukan edit data
function editData() {
    var index = parseInt(document.getElementById('editIndex').value);
    var nama = document.getElementById('editNama').value;
    var alamat = document.getElementById('editAlamat').value;
    data[index].nama = nama;
    data[index].alamat = alamat;
    updateRowInTable(index); // Memperbarui baris dalam tabel
    closeModal('editModal');
    // Mengirimkan pesan sukses
    alert('Data berhasil diubah!');
}

// Fungsi untuk menghapus data
function deleteData(index) {
    data.splice(index, 1);
    location.reload(); // Refresh tabel
    alert('Data berhasil dihapus!');
}

// Memanggil fungsi untuk menampilkan data saat halaman dimuat
window.onload = function () {
    displayData();
};

// Fungsi untuk menambahkan baris ke tabel
function addRowToTable(data, index) {
    var table = document.getElementById('data-table');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = data.nim;
    cell2.innerHTML = data.nama;
    cell3.innerHTML = data.alamat;
    cell4.innerHTML = '<button onclick="openEditModal(' + index + ')">Edit</button>';
    cell5.innerHTML = '<button onclick="deleteRow(' + index + ')">Hapus</button>';
}

// Fungsi untuk memperbarui baris dalam tabel dengan data yang telah diubah
function updateRowInTable(index) {
    var table = document.getElementById('data-table');
    table.rows[index + 1].cells[1].innerHTML = data[index].nama;
    table.rows[index + 1].cells[2].innerHTML = data[index].alamat;
}
