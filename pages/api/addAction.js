import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const {id} = await db.collection("actions").add(req.body);
    const doc = await db.collection("actions").doc(id).get();
    res.status(200).json({id: doc.id, ...doc.data()});
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
