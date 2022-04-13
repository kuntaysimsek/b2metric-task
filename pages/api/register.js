import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await db.collection("authentication").get();

    const usersData = users.docs.map((user) => user.data());

    if (usersData.some((user) => user.email === email)) {
      res.status(401).json({error: "email daha once kullanildi"});
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
