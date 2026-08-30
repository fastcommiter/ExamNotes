import React, {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getNotesHistory,
  getNoteById,
} from "../services/api";


// ========================================
// HISTORY PAGE
// ========================================

export default function History() {

  const [notes, setNotes] = useState([]);

  const [selectedNote, setSelectedNote] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [noteLoading, setNoteLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ========================================
  // FORMAT TIME
  // ========================================

  const formatTime = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // ========================================
  // GET HISTORY
  // ========================================

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        setLoading(true);
        setError("");

        const result =
          await getNotesHistory();

        const history =
          result?.data || [];

        const historyArray =
          Array.isArray(history)
            ? history
            : [];

        setNotes(historyArray);

        // Automatically select latest note
        if (historyArray.length > 0) {

          await openNote(
            historyArray[0]._id
          );

        }

      } catch (error) {

        console.log(
          "HISTORY ERROR =",
          error
        );

        setError(
          error?.response?.data?.message ||
          "Failed to load your notes"
        );

      } finally {

        setLoading(false);

      }
    };


    fetchHistory();

  }, []);


  // ========================================
  // OPEN NOTE
  // ========================================

  const openNote = async (noteId) => {

    try {

      setNoteLoading(true);
      setError("");

      const result =
        await getNoteById(noteId);

      const note =
        result?.data || null;

      setSelectedNote(note);

    } catch (error) {

      console.log(
        "OPEN NOTE ERROR =",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to load note"
      );

    } finally {

      setNoteLoading(false);

    }
  };


  // ========================================
  // EXTRACT CONTENT
  // ========================================

  const getContent = () => {

    if (!selectedNote) {
      return {};
    }

    return (
      selectedNote?.content?.data ||
      selectedNote?.content ||
      {}
    );
  };


  const noteContent = getContent();

  const notesText =
    noteContent?.notes || "";


  return (

    <div
      className="
        min-h-screen
        px-4
        md:px-6
        pb-10
      "
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          max-w-7xl
          mx-auto
          mt-8
          mb-6
        "
      >

        <h1
          className="
            text-3xl
            md:text-4xl
            font-bold
            text-gray-900
          "
        >
          Your Notes
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Access all your previously generated notes.
        </p>

      </motion.div>


      {/* =====================================
          MAIN
      ===================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[300px_1fr]
          gap-5
          min-h-[650px]
        "
      >

        {/* ===================================
            LEFT SIDEBAR
        =================================== */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
            flex
            flex-col
          "
        >

          {/* SIDEBAR HEADER */}

          <div
            className="
              px-5
              py-4
              border-b
              border-gray-200
            "
          >

            <h2
              className="
                font-bold
                text-gray-900
              "
            >
              Notes History
            </h2>

            <p
              className="
                text-xs
                text-gray-500
                mt-1
              "
            >
              {notes.length} saved note
              {notes.length !== 1
                ? "s"
                : ""}
            </p>

          </div>


          {/* NOTES LIST */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-3
              space-y-2
              max-h-[650px]
            "
          >

            {/* LOADING */}

            {loading && (

              <div
                className="
                  p-5
                  text-center
                  text-sm
                  text-gray-500
                "
              >
                Loading your notes...
              </div>

            )}


            {/* EMPTY */}

            {!loading &&
              notes.length === 0 && (

                <div
                  className="
                    p-5
                    text-center
                  "
                >

                  <div className="text-3xl mb-3">
                    📝
                  </div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                    "
                  >
                    No notes yet
                  </p>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "
                  >
                    Generate your first notes
                    to see them here.
                  </p>

                </div>

              )}


            {/* HISTORY ITEMS */}

            {!loading &&
              notes.map((note) => {

                const isSelected =
                  selectedNote?._id ===
                  note._id;

                return (

                  <motion.button
                    key={note._id}
                    type="button"
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      openNote(note._id)
                    }
                    className={`
                      w-full
                      text-left
                      rounded-xl
                      px-4
                      py-3
                      border
                      transition

                      ${
                        isSelected
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                      }
                    `}
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          shrink-0
                          w-9
                          h-9
                          rounded-lg
                          bg-black
                          text-white
                          flex
                          items-center
                          justify-center
                        "
                      >
                        📝
                      </div>


                      {/* DETAILS */}

                      <div
                        className="
                          min-w-0
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-gray-900
                            truncate
                          "
                        >
                          {note.topic}
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-500
                            mt-1
                          "
                        >
                          {formatDate(
                            note.createdAt
                          )}
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-400
                          "
                        >
                          {formatTime(
                            note.createdAt
                          )}
                        </p>

                      </div>

                    </div>

                  </motion.button>

                );

              })}

          </div>

        </div>


        {/* ===================================
            RIGHT SIDE
        =================================== */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* LOADING */}

          {noteLoading && (

            <div
              className="
                min-h-[650px]
                flex
                items-center
                justify-center
                text-gray-500
              "
            >
              Loading note...
            </div>

          )}


          {/* SELECTED NOTE */}

          {!noteLoading &&
            selectedNote && (

              <motion.div
                key={selectedNote._id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  p-6
                  md:p-10
                "
              >

                {/* =================================
                    NOTE HEADER
                ================================= */}

                <div
                  className="
                    mb-8
                    pb-5
                    border-b
                    border-gray-200
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      📝
                    </div>


                    <div>

                      <h2
                        className="
                          text-2xl
                          md:text-3xl
                          font-bold
                          text-gray-900
                        "
                      >
                        {selectedNote.topic}
                      </h2>

                      <p
                        className="
                          text-xs
                          text-gray-500
                          mt-1
                        "
                      >
                        Generated on{" "}
                        {formatDate(
                          selectedNote.createdAt
                        )}
                        {" at "}
                        {formatTime(
                          selectedNote.createdAt
                        )}
                      </p>

                    </div>

                  </div>

                </div>


                {/* =================================
                    NOTES
                ================================= */}

                {notesText && (

                  <div
                    className="
                      text-gray-700
                      text-[15px]
                      leading-8

                      [&_h1]:text-3xl
                      [&_h1]:font-bold
                      [&_h1]:text-gray-900
                      [&_h1]:mb-6

                      [&_h2]:text-2xl
                      [&_h2]:font-bold
                      [&_h2]:text-gray-900
                      [&_h2]:mt-10
                      [&_h2]:mb-5

                      [&_h3]:text-xl
                      [&_h3]:font-bold
                      [&_h3]:text-gray-900
                      [&_h3]:mt-8
                      [&_h3]:mb-4

                      [&_p]:mb-5

                      [&_ul]:list-disc
                      [&_ul]:pl-6
                      [&_ul]:mb-6
                      [&_ul]:space-y-2

                      [&_ol]:list-decimal
                      [&_ol]:pl-6
                      [&_ol]:mb-6
                      [&_ol]:space-y-2

                      [&_li]:pl-1

                      [&_strong]:font-bold
                      [&_strong]:text-gray-900

                      [&_table]:w-full
                      [&_table]:my-6
                      [&_table]:border-collapse

                      [&_th]:border
                      [&_th]:border-gray-200
                      [&_th]:bg-gray-100
                      [&_th]:p-3
                      [&_th]:text-left

                      [&_td]:border
                      [&_td]:border-gray-200
                      [&_td]:p-3
                    "
                  >

                    <ReactMarkdown
                      remarkPlugins={[
                        remarkGfm,
                      ]}
                    >
                      {notesText}
                    </ReactMarkdown>

                  </div>

                )}


                {/* =================================
                    REVISION POINTS
                ================================= */}

                {Array.isArray(
                  noteContent?.revisionPoints
                ) &&
                  noteContent
                    .revisionPoints
                    .length > 0 && (

                    <section
                      className="
                        mt-12
                      "
                    >

                      <h3
                        className="
                          text-xl
                          font-bold
                          text-gray-900
                          mb-4
                        "
                      >
                        🔥 Revision Points
                      </h3>

                      <div
                        className="
                          rounded-xl
                          bg-gray-50
                          border
                          border-gray-200
                          p-5
                        "
                      >

                        <ul
                          className="
                            list-disc
                            pl-5
                            space-y-2
                          "
                        >

                          {noteContent
                            .revisionPoints
                            .map(
                              (
                                point,
                                index
                              ) => (

                                <li
                                  key={index}
                                  className="
                                    text-sm
                                    text-gray-700
                                    leading-7
                                  "
                                >
                                  {point}
                                </li>

                              )
                            )}

                        </ul>

                      </div>

                    </section>

                  )}


                {/* =================================
                    SUBTOPICS
                ================================= */}

                {noteContent?.subTopics && (

                  <section
                    className="
                      mt-10
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                        mb-4
                      "
                    >
                      📚 Important Subtopics
                    </h3>

                    <div
                      className="
                        space-y-4
                      "
                    >

                      {Object.entries(
                        noteContent.subTopics
                      ).map(
                        ([level, topics]) => {

                          if (
                            !Array.isArray(
                              topics
                            ) ||
                            topics.length === 0
                          ) {
                            return null;
                          }

                          return (

                            <div
                              key={level}
                              className="
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                p-4
                              "
                            >

                              <p
                                className="
                                  font-semibold
                                  text-sm
                                  mb-2
                                "
                              >
                                {level}
                              </p>

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >

                                {topics.map(
                                  (
                                    item,
                                    index
                                  ) => (

                                    <span
                                      key={index}
                                      className="
                                        px-3
                                        py-1.5
                                        rounded-full
                                        bg-white
                                        border
                                        border-gray-200
                                        text-xs
                                        text-gray-700
                                      "
                                    >
                                      {item}
                                    </span>

                                  )
                                )}

                              </div>

                            </div>

                          );
                        }
                      )}

                    </div>

                  </section>

                )}


                {/* =================================
                    QUESTIONS
                ================================= */}

                {noteContent?.questions && (

                  <section
                    className="
                      mt-12
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                        mb-5
                      "
                    >
                      ❓ Important Questions
                    </h3>


                    {/* SHORT QUESTIONS */}

                    {Array.isArray(
                      noteContent
                        .questions
                        .short
                    ) &&
                      noteContent
                        .questions
                        .short
                        .length > 0 && (

                        <QuestionSection
                          title="Short Questions"
                          questions={
                            noteContent
                              .questions
                              .short
                          }
                        />

                      )}


                    {/* LONG QUESTIONS */}

                    {Array.isArray(
                      noteContent
                        .questions
                        .long
                    ) &&
                      noteContent
                        .questions
                        .long
                        .length > 0 && (

                        <QuestionSection
                          title="Long Questions"
                          questions={
                            noteContent
                              .questions
                              .long
                          }
                        />

                      )}

                  </section>

                )}


                {/* =================================
                    DIAGRAM
                ================================= */}

                {noteContent?.diagram?.data && (

                  <section
                    className="
                      mt-12
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                      "
                    >
                      📊 Diagram
                    </h3>

                    <div
                      className="
                        mt-4
                        rounded-xl
                        bg-gray-50
                        border
                        border-gray-200
                        p-5
                        overflow-auto
                      "
                    >

                      <pre
                        className="
                          text-sm
                          text-gray-700
                          whitespace-pre-wrap
                        "
                      >
                        {noteContent
                          .diagram
                          .data}
                      </pre>

                    </div>

                  </section>

                )}


                {/* =================================
                    CHARTS
                ================================= */}

                {Array.isArray(
                  noteContent?.charts
                ) &&
                  noteContent.charts.length > 0 && (

                    <section
                      className="
                        mt-12
                      "
                    >

                      <h3
                        className="
                          text-xl
                          font-bold
                          text-gray-900
                          mb-4
                        "
                      >
                        📈 Charts
                      </h3>

                      <div
                        className="
                          space-y-4
                        "
                      >

                        {noteContent.charts.map(
                          (chart, index) => (

                            <div
                              key={index}
                              className="
                                rounded-xl
                                bg-gray-50
                                border
                                border-gray-200
                                p-5
                              "
                            >

                              <h4
                                className="
                                  font-semibold
                                  text-gray-900
                                  mb-3
                                "
                              >
                                {chart.title}
                              </h4>

                              <div
                                className="
                                  space-y-2
                                "
                              >

                                {Array.isArray(
                                  chart.data
                                ) &&
                                  chart.data.map(
                                    (
                                      item,
                                      itemIndex
                                    ) => (

                                      <div
                                        key={
                                          itemIndex
                                        }
                                        className="
                                          flex
                                          justify-between
                                          text-sm
                                        "
                                      >

                                        <span>
                                          {item.name}
                                        </span>

                                        <span
                                          className="
                                            font-semibold
                                          "
                                        >
                                          {item.value}
                                        </span>

                                      </div>

                                    )
                                  )}

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </section>

                  )}

              </motion.div>

            )}


          {/* =================================
              NO NOTE
          ================================= */}

          {!noteLoading &&
            !selectedNote &&
            !loading && (

              <div
                className="
                  min-h-[650px]
                  flex
                  items-center
                  justify-center
                  text-center
                  p-10
                "
              >

                <div>

                  <div
                    className="
                      text-5xl
                      mb-4
                    "
                  >
                    📚
                  </div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Select a note
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-2
                    "
                  >
                    Choose a note from the
                    left to view it.
                  </p>

                </div>

              </div>

            )}

        </div>

      </div>


      {/* ERROR */}

      {error && (

        <div
          className="
            max-w-7xl
            mx-auto
            mt-4
            rounded-xl
            bg-red-50
            border
            border-red-200
            text-red-600
            text-sm
            p-4
          "
        >
          {error}
        </div>

      )}

    </div>
  );
}


// ========================================
// QUESTION SECTION
// ========================================

function QuestionSection({
  title,
  questions,
}) {

  return (

    <div className="mb-8">

      <h4
        className="
          font-semibold
          text-gray-800
          mb-3
        "
      >
        {title}
      </h4>

      <div
        className="
          space-y-3
        "
      >

        {questions.map(
          (item, index) => {

            const question =
              typeof item === "string"
                ? item
                : item?.question || "";

            const answer =
              typeof item === "object"
                ? item?.answer
                : null;

            return (

              <QuestionAccordion
                key={index}
                number={index + 1}
                question={question}
                answer={answer}
              />

            );
          }
        )}

      </div>

    </div>

  );
}


// ========================================
// QUESTION ACCORDION
// ========================================

function QuestionAccordion({
  question,
  answer,
  number,
}) {

  const [open, setOpen] =
    useState(false);


  return (

    <motion.div
      layout
      className="
        rounded-xl
        bg-gray-50
        border
        border-gray-200
        overflow-hidden
      "
    >

      <button
        type="button"
        onClick={() =>
          setOpen(
            (prev) => !prev
          )
        }
        className="
          w-full
          flex
          items-center
          gap-4
          text-left
          px-4
          py-4
          hover:bg-gray-100
          transition
        "
      >

        <span
          className="
            shrink-0
            w-8
            h-8
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            text-sm
            font-semibold
          "
        >
          {number}
        </span>


        <span
          className="
            flex-1
            text-sm
            font-medium
            text-gray-800
          "
        >
          {question}
        </span>


        <motion.span
          animate={{
            rotate: open
              ? 180
              : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            text-gray-500
          "
        >
          ↓
        </motion.span>

      </button>


      <AnimatePresence initial={false}>

        {open && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              overflow-hidden
            "
          >

            <div
              className="
                border-t
                border-gray-200
                bg-white
                px-5
                py-4
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  text-gray-900
                  mb-2
                "
              >
                Answer
              </p>

              <div
                className="
                  text-sm
                  text-gray-600
                  leading-7
                  whitespace-pre-wrap
                "
              >
                {answer ||
                  "Answer not available."}
              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>

  );
}