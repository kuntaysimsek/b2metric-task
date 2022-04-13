import db from "../../utils/db";

const handler = async (req, res) => {
  try {
    const { bookName } = req.body;
    const { editedBookName } = req.body;
    const { editedAuthor } = req.body;

    const book = await db
      .collection("library")
      .where("bookName", "==", bookName)
      .get();

    book.forEach((doc) => {
        doc.ref.update({
          bookName: editedBookName,
          author: editedAuthor
        });
    });

    res.status(200).json();
  } catch (e) {
    console.log(e.message);
    res.status(400).end();
  }
};

export default handler;