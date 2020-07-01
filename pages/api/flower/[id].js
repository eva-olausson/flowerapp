
export default async (req, res) => {
  const {id} = req.query;
  const {comment, name} = req.body;

  const payload = {
    name: name,
    comment: comment
  }

  // Pga att det inte går att skicka från client till annan server. 

  const response = await fetch(`https://flowers-mock-data.firebaseio.com/comments/eva-olausson/${id}.json`,
  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
  });

  res.status(200).end();
}
