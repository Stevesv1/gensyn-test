// /api/proxy.js
export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Peer name is required' });
  }

  try {
    const response = await fetch(`https://swarm.gensyn.ai/api/v1/peer?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the data from the API
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch peer data' });
  }
}
