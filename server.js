function startQuestionnaire() {
  const yourName = document.getElementById('your-name').value;
  const crushName = document.getElementById('crush-name').value;

  if (yourName && crushName) {
    // Kirim data ke backend tanpa memberi tahu pengguna
    fetch('http://localhost:3000/submit-crush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ yourName, crushName }),
    }).catch(error => {
      console.error('Error:', error); // Log di console saja jika terjadi error
    });

    // Tetap lanjutkan ke tampilan pertanyaan
    document.getElementById('input-section').style.display = 'none';
    document.getElementById('question-section').style.display = 'block';
    document.getElementById('crush-placeholder').textContent = crushName;
  } else {
    alert('Please enter both names.');
  }
}

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Inisialisasi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Route sederhana untuk menyimpan data
app.get('/add', async (req, res) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .insert([{ name: 'example_name', age: 25 }]);

  if (error) return res.status(500).send(error.message);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
