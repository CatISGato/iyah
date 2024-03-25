var data = [
  { nim: "00000104848", nama: "Denito Fransiskus Triarta Samosir", buku: "Cara Tidur selama 20 Jam" },
];

function displayData() {
  var table = document.getElementById("data-table");
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = data[i].nim;
    cell2.innerHTML = data[i].nama;
    cell3.innerHTML = data[i].buku;
    cell4.innerHTML =
      '<button onclick="openEditModal(' +
      i +
      ')">Edit</button>' +
      '<button onclick="deleteRow(' +
      i +
      ')">Hapus</button>';
  }
}

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function addData() {
  var nim = document.getElementById("nim").value;
  var nama = document.getElementById("nama").value;
  var buku = document.getElementById("buku").value;
  if (nim && nama && buku) {
    data.push({ nim: nim, nama: nama, buku: buku });
    closeModal("addModal");
    addRowToTable(data[data.length - 1], data.length - 1); 
    showAlert("Data berhasil ditambahkan!");
  } else {
    showAlert("Data tidak lengkap. Harap isi semua kolom.");
  }
}

function openEditModal(index) {
  var modal = document.getElementById("editModal");
  document.getElementById("editNama").value = data[index].nama;
  document.getElementById("editBuku").value = data[index].buku;
  modal.style.display = "block";
  document.getElementById("editIndex").value = index;
}

function editData() {
  var index = parseInt(document.getElementById("editIndex").value);
  var nama = document.getElementById("editNama").value;
  var buku = document.getElementById("editBuku").value;
  data[index].nama = nama;
  data[index].buku = buku;
  updateRowInTable(index);
  closeModal("editModal");

  showAlert("Data berhasil diubah!");
}

window.onload = function () {
  displayData();
};

function addRowToTable(data, index) {
  var table = document.getElementById("data-table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = data.nim;
  cell2.innerHTML = data.nama;
  cell3.innerHTML = data.buku;
  cell4.innerHTML =
    '<button onclick="openEditModal(' +
    index +
    ')">Edit</button>' +
    '<button onclick="deleteRow(' +
    index +
    ')">Hapus</button>';
}

function updateRowInTable(index) {
  var table = document.getElementById("data-table");
  table.rows[index + 1].cells[1].innerHTML = data[index].nama;
  table.rows[index + 1].cells[2].innerHTML = data[index].buku;
}
function showAlert(message) {
  var messageModal = document.getElementById("messageModal");
  var messageText = document.getElementById("messageText");
  messageText.innerText = message;
  messageModal.style.display = "block";
}

function closeMessageModal() {
  var messageModal = document.getElementById("messageModal");
  messageModal.style.display = "none";
}

function deleteRow(index) {
  var confirmation = confirm("Apakah Anda yakin ingin menghapus data ini?");
  if (confirmation) {
    data.splice(index, 1);

    var table = document.getElementById("data-table");
    table.deleteRow(index + 1);

    for (var i = index; i < table.rows.length - 1; i++) {
      var editButton = table.rows[i + 1].cells[3].querySelector("button");
      var deleteButton = table.rows[i + 1].cells[4].querySelector("button");
      editButton.setAttribute("onclick", "openEditModal(" + i + ")");
      deleteButton.setAttribute("onclick", "deleteRow(" + i + ")");
    }
    showAlert("Data berhasil dihapus!");
  }
}
