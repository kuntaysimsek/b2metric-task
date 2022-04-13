import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { bookName } = req.body;

    const book = await db
      .collection("library")
      .where("bookName", "==", bookName)
      .get();

    book.forEach((doc) => {
      console.log(doc.ref.id);
        doc.ref.delete();
    });

    res.status(200).json();
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;
