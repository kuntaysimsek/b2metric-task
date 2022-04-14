import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { id } = req.body;

    const actions = await db
    .collection("actions")
    .where("userId", "==", id)
    .get();

    const actionDocs = actions.docs.map((action) => ({...action.data(), id: action.id}));
    res.status(200).json(actionDocs);
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
