const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/submit-crush', async (req, res) => {
  const { yourName, crushName } = req.body;

  if (!yourName || !crushName) {
    return res.status(400).send('Both names are required.');
  }

  try {
    const { data, error } = await supabase
      .from('crushes')
      .insert([{ your_name: yourName, crush_name: crushName }]);

    if (error) throw error;
    res.status(200).send('Data submitted successfully.');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error submitting data: ' + error.message);
  }
});
