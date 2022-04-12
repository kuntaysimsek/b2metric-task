import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await db.collection("authentication").get();

    const usersEmail = users.docs.map((user) => user.data());

    if (usersEmail.some((user) => user.email === email)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection("authentication").add(req.body);
      res.status(200).json(id);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
