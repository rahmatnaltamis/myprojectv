const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing request body
app.use(bodyParser.json());

// Inisialisasi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Endpoint untuk menangani form submission
app.post('/submit-crush', async (req, res) => {
  const { yourName, crushName } = req.body;

  if (!yourName || !crushName) {
    return res.status(400).send('Both names are required.');
  }

  try {
    const { data, error } = await supabase
      .from('your_table_name')
      .insert([{ your_name: yourName, crush_name: crushName }]);

    if (error) throw error;
    res.status(200).send('Data submitted successfully.');
  } catch (error) {
    res.status(500).send('Error submitting data: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
