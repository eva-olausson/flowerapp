
export default async (req, res) => {
  console.log(req)
  const {id} = req.query;
  const {comment, name} = req.body;

  const payload = {
    name: name,
    comment: comment
  }

  console.log(comment, name, id)

  // Pga att det inte går att skicka från client till annan server. 

  const response = await fetch(`https://flowers-mock-data.firebaseio.com/comments/eva-olausson/${id}.json`,
  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
  });

  console.log("Firebase response", response.statusText)

  res.status(200).end();
}
