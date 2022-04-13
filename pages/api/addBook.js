import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { id } = await db.collection("library").add(req.body);
    res.status(200).json(id);
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
