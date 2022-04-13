import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await db
      .collection("authentication")
      .where("email", "==", email)
      .get();

    users.forEach((doc) => {
      res.status(200).json(doc.data().role);
    });
  } catch (e) {
    console.log(e.message);
    res.status(401).json({error: "giris yap"});
  }
};

export default handler;
