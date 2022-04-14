import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    const usersData = await db
      .collection("authentication")
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (usersData.docs.length === 1) {
      res.status(200).json({...usersData.docs[0].data(), id: usersData.docs[0].id});
    } else {
      res.status(401).json({ error: "email yada pass uyusmadi" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
