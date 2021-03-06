import { useEffect, useState } from "react";
import axios from "axios";
import UseInput from "../hooks/useInput";
import Image from "next/image";
import UseUser from "../hooks/useUser";

import closeIcon from "../assets/images/close-icon.svg";

function Library() {
  const [editBookData, setEditBookData] = useState({
    bookName: "",
    author: "",
  });
  const [inputs, setInputs] = UseInput({
    book: "",
    author: "",
    editedbook: "",
    editedauthor: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showGiveBookModal, setShowGiveBookModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [user, setUser] = UseUser();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const res = await axios.get("/api/getBooks");
      const availableBooks = res.data.filter((b) => !b.userId);
      const userBooks = res.data.filter((b) => b.userId);
      setMyBooks(userBooks);
      setBooks(availableBooks);
    }
    getBooks();
  }, []);

  useEffect(() => {
    async function getActions() {
      if (user) {
        const res = await axios.post("/api/getActions", { id: user.id });
        setActions(res.data);
      }
    }
    getActions();
  }, [user]);

  const removeBook = async (e) => {
    e.preventDefault();
    setShowDeleteModal(!showDeleteModal);
    await axios.post(`/api/removeBook`, {
      bookName: e.target.parentElement.querySelector("p").textContent,
    });
    e.target.parentElement.parentElement.remove();
  };

  const getBook = async (e) => {
    const bookName = e.target.parentElement.querySelector("p").textContent;
    const removeActionResponse = await axios.post(`/api/removeAction`, {
      bookName: bookName,
      userId: user.id,
      actionType: 1,
    });
    await axios.post(`/api/getBook`, {
      userId: user.id,
      bookName: bookName,
    });
    setMyBooks([...myBooks, ...books.filter((b) => b.bookName === bookName)]);
    setBooks(books.filter((b) => b.bookName !== bookName));
  };

  const [editedSelect, setEditedSelect] = useState();

  const openEditBook = async (e) => {
    setShowEditModal(!showEditModal);
    setEditBookData({
      bookName: e.target.parentElement.querySelector("#book-name").textContent,
      author: e.target.parentElement.querySelector("#author").textContent,
    });
    setEditedSelect({
      bookName: e.target.parentElement.querySelector("#book-name"),
      author: e.target.parentElement.querySelector("#author"),
    });
  };

  const editBook = async (e) => {
    setShowEditModal(!showEditModal);
    await axios.post(`/api/editBook`, {
      bookName: editBookData.bookName,
      editedBookName: inputs.editedbook,
      editedAuthor: inputs.editedauthor,
    });
    editedSelect.bookName.innerHTML = inputs.editedbook;
    editedSelect.author.innerHTML = inputs.editedauthor;
    inputs.editedbook = "";
    inputs.editedauthor = "";
  };

  const addBook = async (e) => {
    e.preventDefault();
    const addBookResponse = await axios.post(`/api/addBook`, {
      bookName: inputs.book,
      author: inputs.author,
    });
    setBooks([...books, addBookResponse.data]);
    setShowAddBookModal(!showAddBookModal);

    inputs.book = "";
    inputs.author = "";
  };

  const giveBook = async (book) => {
    const addActionResponse = await axios.post(`/api/addAction`, {
      bookName: book.bookName,
      userId: user.id,
      actionType: 0,
    });
    await axios.post(`/api/giveBook`, {
      bookName: book.bookName,
    });

    setBooks([
      ...books,
      ...myBooks.filter((b) => b.bookName === book.bookName),
    ]);
    setMyBooks(myBooks.filter((b) => b.bookName !== book.bookName));
  };

  if (user) {
    return (
      <div className="flex justify-center dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 lg:w-5/12 sm:w-8/12 w-full max-w-lg rounded-lg sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Library
            </h5>
            {user.role == "admin" ? (
              <button
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                onClick={() => setShowAddBookModal(!showAddBookModal)}
              >
                Add Book
              </button>
            ) : (
              <>
                <button
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => setShowActionModal(!showActionModal)}
                >
                  History
                </button>
                <button
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => setShowGiveBookModal(!showGiveBookModal)}
                >
                  Give Book
                </button>
              </>
            )}

            {showAddBookModal ? (
              <div
                id="authentication-modal"
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
              >
                <div className="relative m-auto p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal"
                        onClick={() => setShowAddBookModal(!showAddBookModal)}
                      >
                        <Image alt="closeIcon" src={closeIcon} />
                      </button>
                    </div>
                    <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                      <input
                        type="text"
                        name="book"
                        id="book"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="book name"
                        required
                        value={inputs.book}
                        onChange={setInputs}
                      />
                      <input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="author"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        value={inputs.author}
                        onChange={setInputs}
                      />
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={addBook}
                      >
                        Add Book
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {showGiveBookModal ? (
              <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div className="m-auto relative p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-center py-4 px-6 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                        My Books
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setShowGiveBookModal(!showGiveBookModal)}
                      >
                        <Image alt="closeIcon" src={closeIcon} />
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Click book to give book
                      </p>
                      <ul className="my-4 space-y-3">
                        {myBooks.map((book, index) => (
                          <li key={index}>
                            <div
                              onClick={() => giveBook(book)}
                              className="w-full items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                            >
                              {book.bookName}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {showActionModal ? (
              <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
                <div className="relative m-auto p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal"
                        onClick={() => setShowActionModal(!showActionModal)}
                      >
                        <Image alt="closeIcon" src={closeIcon} />
                      </button>
                    </div>
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-2">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            {actions.map((action) => (
                              <p
                                key={action.id}
                                className="ml-4 text-sm font-medium text-gray-900 truncate dark:text-white"
                              >
                                Book Name: <b> {action.bookName} </b> Action
                                Type:{" "}
                                <b>
                                  {action.actionType === 1 ? "take" : "give"}
                                </b>
                              </p>
                            ))}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {books.map((book, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p
                        id="book-name"
                        className="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        {book.bookName}
                      </p>
                      <p
                        id="author"
                        className="text-sm text-gray-500 truncate dark:text-gray-400"
                      >
                        {book.author}
                      </p>
                    </div>
                    {user.role == "admin" ? (
                      <>
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={openEditBook}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                          onClick={removeBook}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={getBook}
                      >
                        Get Book
                      </button>
                    )}
                  </div>
                </li>
              ))}
              {showEditModal ? (
                <div
                  id="authentication-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
                >
                  <div className="relative m-auto p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex justify-end p-2">
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                          data-modal-toggle="authentication-modal"
                          onClick={() => setShowEditModal(!showEditModal)}
                        >
                          <Image alt="closeIcon" src={closeIcon} />
                        </button>
                      </div>
                      <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                          Sign in to our platform
                        </h3>
                        <input
                          type="text"
                          name="editedbook"
                          id="editedbook"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder={editBookData.bookName}
                          required
                          value={inputs.editedbook}
                          onChange={setInputs}
                        />
                        <input
                          type="text"
                          name="editedauthor"
                          id="editedauthor"
                          placeholder={editBookData.author}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          value={inputs.editedauthor}
                          onChange={setInputs}
                        />
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={editBook}
                        >
                          Edit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 text-center text-red-700">Lutfen giris yapiniz.</div>
  );
}

export default Library;
