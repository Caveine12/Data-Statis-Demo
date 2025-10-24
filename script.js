let dataAsli = [];
const container = document.getElementById('data-container');
const searchInput = document.getElementById('search');
const minSkorInput = document.getElementById('min-skor');

function tampilkanData(data) {
  container.innerHTML = '';
  if (data.length === 0) {
    container.innerHTML = '<p>Tidak ada hasil yang cocok.</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.nama}</h3>
      <p>Skor: ${item.skor}</p>
    `;
    container.appendChild(card);
  });
}

function filterData() {
  const keyword = searchInput.value.toLowerCase();
  const minSkor = parseInt(minSkorInput.value) || 0;

  const hasil = dataAsli.filter(item =>
    item.nama.toLowerCase().includes(keyword) && item.skor >= minSkor
  );
  tampilkanData(hasil);
}

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    dataAsli = data;
    tampilkanData(dataAsli);
  })
  .catch(err => console.error('Gagal memuat data:', err));

searchInput.addEventListener('input', filterData);
minSkorInput.addEventListener('input', filterData);