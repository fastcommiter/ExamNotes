import React, { useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopicForm from "../components/TopicForm";

export default function Notes() {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const credits = userData?.credits ?? 0;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          max-w-7xl
          mx-auto
          mb-10
          rounded-2xl
          bg-black/90
          backdrop-blur-xl
          border
          border-white/10
          px-8
          py-6
          shadow-[0_20px_45px_rgba(0,0,0,0.6)]
          flex
          flex-col
          md:flex-row
          md:items-center
          justify-between
          gap-5
        "
      >

        {/* LOGO / TITLE */}

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1
            className="
              text-2xl
              font-bold
              bg-gradient-to-r
              from-white
              via-gray-300
              to-white
              bg-clip-text
              text-transparent
            "
          >
            ExamNotes AI
          </h1>

          <p className="text-sm text-gray-300 mt-1">
            AI-powered exam-oriented notes & revision
          </p>
        </div>


        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4 flex-wrap">

          {/* CREDITS */}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/pricing")}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/10
              border
              border-white/20
              text-white
              text-sm
              shadow-lg
            "
          >

            <span className="text-xl">
              💎
            </span>

            <span className="font-semibold">
              {credits}
            </span>

            <span
            className="
              ml-1
              h-5
              w-5
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              text-sm
              font-bold
              leading-none
            "
          >
            ➕
          </span>

          </motion.button>


          {/* HISTORY */}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/history")}
            className="
              px-5
              py-3
              rounded-full
              bg-white/10
              hover:bg-white/20
              text-white
              text-sm
              font-medium
              transition
              flex
              items-center
              gap-2
            "
          >
            📚 Your Notes
          </motion.button>

        </div>

      </motion.header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-7xl mx-auto">

        {/* ===================================================
            TOPIC FORM
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >

          <TopicForm
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setResult={setResult}
          />

        </motion.div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="
              mb-8
              p-4
              rounded-xl
              bg-red-50
              border
              border-red-200
              text-red-600
              text-center
              font-medium
            "
          >
            ❌ {error}
          </motion.div>

        )}


        {/* ===================================================
            GENERATED NOTES
        =================================================== */}

        {result ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="
              rounded-3xl
              bg-white
              border
              border-gray-200
              shadow-[0_25px_70px_rgba(0,0,0,0.12)]
              overflow-hidden
            "
          >

            {/* =============================================
                RESULT TOP BAR
            ============================================= */}

            <div
              className="
                bg-gradient-to-r
                from-black
                via-gray-900
                to-black
                px-6
                md:px-10
                py-7
                text-white
              "
            >

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
              >

                <div>

                  <p className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-gray-400
                    mb-2
                  ">
                    AI Generated
                  </p>

                  <h2 className="
                    text-2xl
                    md:text-3xl
                    font-bold
                  ">
                    📘 Generated Notes
                  </h2>

                  <p className="
                    text-gray-400
                    text-sm
                    mt-2
                  ">
                    Exam-oriented notes generated specially for your topic.
                  </p>

                </div>


                {/* IMPORTANCE */}

                {result.data?.importance && (

                  <div
                    className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/20
                      backdrop-blur-lg
                      text-center
                    "
                  >

                    <p className="
                      text-xs
                      text-gray-400
                      mb-1
                    ">
                      Importance
                    </p>

                    <p className="
                      text-xl
                      font-bold
                    ">
                      {result.data.importance}
                    </p>

                  </div>

                )}

              </div>

            </div>


            {/* =============================================
                CONTENT
            ============================================= */}

            <div className="p-6 md:p-10">


              {/* ===========================================
                  NOTES
              =========================================== */}

              {result.data?.notes && (

                <section className="mb-12">

                  <SectionTitle
                    icon="📝"
                    title="Notes"
                  />

                  <div
                    className="
                      rounded-2xl
                      bg-gray-50
                      border
                      border-gray-200
                      p-6
                      md:p-8
                    "
                  >

                    <div
                      className="
                        whitespace-pre-wrap
                        text-gray-700
                        leading-8
                        text-[15px]
                      "
                    >
                      {result.data.notes}
                    </div>

                  </div>

                </section>

              )}


              {/* ===========================================
                  REVISION POINTS
              =========================================== */}

              {Array.isArray(result.data?.revisionPoints) &&
                result.data.revisionPoints.length > 0 && (

                  <section className="mb-12">

                    <SectionTitle
                      icon="🔥"
                      title="Revision Points"
                    />

                    <div className="grid gap-4">

                      {result.data.revisionPoints.map(
                        (point, index) => (

                          <motion.div
                            key={index}
                            whileHover={{
                              y: -2
                            }}
                            className="
                              flex
                              items-start
                              gap-4
                              p-5
                              rounded-2xl
                              bg-white
                              border
                              border-gray-200
                              shadow-sm
                            "
                          >

                            <div
                              className="
                                flex-shrink-0
                                w-8
                                h-8
                                rounded-full
                                bg-black
                                text-white
                                flex
                                items-center
                                justify-center
                                text-sm
                                font-bold
                              "
                            >
                              {index + 1}
                            </div>

                            <p className="
                              text-gray-700
                              leading-relaxed
                              pt-1
                            ">
                              {point}
                            </p>

                          </motion.div>

                        )
                      )}

                    </div>

                  </section>

                )}


              {/* ===========================================
                  SUBTOPICS
              =========================================== */}

              {result.data?.subTopics &&
                Object.keys(result.data.subTopics).length > 0 && (

                  <section className="mb-12">

                    <SectionTitle
                      icon="📚"
                      title="Important Subtopics"
                    />

                    <div className="
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-5
                    ">

                      {Object.entries(
                        result.data.subTopics
                      ).map(([level, topics]) => (

                        <motion.div
                          key={level}
                          whileHover={{
                            y: -5
                          }}
                          className="
                            rounded-2xl
                            bg-gradient-to-br
                            from-gray-50
                            to-white
                            border
                            border-gray-200
                            p-6
                            shadow-sm
                          "
                        >

                          <h4 className="
                            text-lg
                            font-bold
                            text-gray-900
                            mb-4
                          ">
                            {level}
                          </h4>

                          {Array.isArray(topics) && (

                            <ul className="
                              space-y-3
                            ">

                              {topics.map(
                                (topic, index) => (

                                  <li
                                    key={index}
                                    className="
                                      flex
                                      gap-2
                                      text-sm
                                      text-gray-600
                                    "
                                  >

                                    <span className="text-black">
                                      •
                                    </span>

                                    <span>
                                      {topic}
                                    </span>

                                  </li>

                                )
                              )}

                            </ul>

                          )}

                        </motion.div>

                      ))}

                    </div>

                  </section>

                )}


              {/* ===========================================
                  QUESTIONS
              =========================================== */}

              {result.data?.questions && (

                <section className="mb-12">

                  <SectionTitle
                    icon="❓"
                    title="Important Questions"
                  />


                  {/* SHORT */}

                  {Array.isArray(
                    result.data.questions.short
                  ) &&
                    result.data.questions.short.length > 0 && (

                      <div className="mb-8">

                        <h4 className="
                          text-lg
                          font-bold
                          mb-4
                          text-gray-800
                        ">
                          Short Questions
                        </h4>

                        <div className="space-y-4">

                          {result.data.questions.short.map(
                            (question, index) => (

                              <QuestionCard
                                key={index}
                                question={question}
                                number={index + 1}
                              />

                            )
                          )}

                        </div>

                      </div>

                    )}


                  {/* LONG */}

                  {Array.isArray(
                    result.data.questions.long
                  ) &&
                    result.data.questions.long.length > 0 && (

                      <div>

                        <h4 className="
                          text-lg
                          font-bold
                          mb-4
                          text-gray-800
                        ">
                          Long Questions
                        </h4>

                        <div className="space-y-4">

                          {result.data.questions.long.map(
                            (question, index) => (

                              <QuestionCard
                                key={index}
                                question={question}
                                number={index + 1}
                              />

                            )
                          )}

                        </div>

                      </div>

                    )}

                </section>

              )}


              {/* ===========================================
                  DIAGRAM
              =========================================== */}

              {result.data?.diagram?.data && (

                <section className="mb-12">

                  <SectionTitle
                    icon="📊"
                    title="Diagram"
                  />

                  <div className="
                    rounded-2xl
                    bg-gray-950
                    p-6
                    overflow-x-auto
                    shadow-lg
                  ">

                    <pre className="
                      text-green-300
                      text-sm
                      leading-7
                      whitespace-pre-wrap
                    ">
                      {result.data.diagram.data}
                    </pre>

                  </div>

                </section>

              )}


              {/* ===========================================
                  CHARTS
              =========================================== */}

              {Array.isArray(result.data?.charts) &&
                result.data.charts.length > 0 && (

                  <section className="mb-12">

                    <SectionTitle
                      icon="📈"
                      title="Charts"
                    />

                    <div className="space-y-6">

                      {result.data.charts.map(
                        (chart, index) => (

                          <div
                            key={index}
                            className="
                              rounded-2xl
                              bg-gray-50
                              border
                              border-gray-200
                              p-6
                            "
                          >

                            <h4 className="
                              text-lg
                              font-bold
                              mb-5
                            ">
                              {chart.title || "Chart"}
                            </h4>


                            {Array.isArray(chart.data) && (

                              <div className="space-y-4">

                                {chart.data.map(
                                  (item, itemIndex) => {

                                    const maxValue =
                                      Math.max(
                                        ...chart.data.map(
                                          (x) =>
                                            Number(x.value) || 0
                                        )
                                      ) || 1;

                                    const value =
                                      Number(item.value) || 0;

                                    const width =
                                      (value / maxValue) * 100;

                                    return (

                                      <div
                                        key={itemIndex}
                                      >

                                        <div className="
                                          flex
                                          justify-between
                                          text-sm
                                          mb-1
                                        ">

                                          <span className="
                                            text-gray-600
                                          ">
                                            {item.name}
                                          </span>

                                          <span className="
                                            font-bold
                                            text-gray-900
                                          ">
                                            {item.value}
                                          </span>

                                        </div>


                                        <div className="
                                          h-3
                                          bg-gray-200
                                          rounded-full
                                          overflow-hidden
                                        ">

                                          <motion.div
                                            initial={{
                                              width: 0
                                            }}
                                            animate={{
                                              width: `${width}%`
                                            }}
                                            transition={{
                                              duration: 0.7
                                            }}
                                            className="
                                              h-full
                                              bg-black
                                              rounded-full
                                            "
                                          />

                                        </div>

                                      </div>

                                    );
                                  }
                                )}

                              </div>

                            )}

                          </div>

                        )
                      )}

                    </div>

                  </section>

                )}


              {/* ===========================================
                  FOOTER INFO
              =========================================== */}

              <div className="
                mt-10
                pt-6
                border-t
                border-gray-200
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              ">

                {/* NOTES ID */}

                <div className="
                  rounded-2xl
                  bg-gray-50
                  border
                  border-gray-200
                  p-5
                ">

                  <p className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                    mb-2
                  ">
                    Notes ID
                  </p>

                  <p className="
                    text-sm
                    font-mono
                    text-gray-700
                    break-all
                  ">
                    {result.notesId || "Not available"}
                  </p>

                </div>


                {/* CREDITS */}

                <div className="
                  rounded-2xl
                  bg-black
                  text-white
                  p-5
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-gray-400
                      mb-2
                    ">
                      Credits Remaining
                    </p>

                    <p className="
                      text-2xl
                      font-bold
                    ">
                      💎 {result.creditLeft ?? credits}
                    </p>

                  </div>

                  <button
                    onClick={() => navigate("/pricing")}
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-white
                      text-black
                      text-sm
                      font-semibold
                    "
                  >
                    Get More
                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            whileHover={{
              scale: 1.01
            }}
            className="
              max-w-7xl
              mx-auto
              h-72
              rounded-3xl
              flex
              flex-col
              items-center
              justify-center
              bg-white/70
              backdrop-blur-lg
              border
              border-dashed
              border-gray-300
              text-gray-500
              shadow-inner
            "
          >

            <div className="
              text-5xl
              mb-5
            ">
              📘
            </div>

            <h3 className="
              text-lg
              font-semibold
              text-gray-700
            ">
              Generated notes will appear here
            </h3>

            <p className="
              text-sm
              text-gray-400
              mt-2
            ">
              Enter a topic above and click Generate Notes
            </p>

          </motion.div>

        )}

      </main>

    </div>
  );
}


/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ icon, title }) {

  return (
    <div className="
      flex
      items-center
      gap-3
      mb-5
    ">

      <div className="
        h-10
        w-10
        rounded-xl
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">
        {icon}
      </div>

      <h3 className="
        text-xl
        font-bold
        text-gray-900
      ">
        {title}
      </h3>

    </div>
  );
}


/* =========================================================
   QUESTION CARD
========================================================= */

function QuestionCard({ question, number }) {

  return (
    <motion.div
      whileHover={{
        y: -2
      }}
      className="
        rounded-2xl
        bg-gray-50
        border
        border-gray-200
        p-5
        shadow-sm
      "
    >

      <div className="
        flex
        items-start
        gap-4
      ">

        <div className="
          flex-shrink-0
          h-8
          w-8
          rounded-full
          bg-black
          text-white
          flex
          items-center
          justify-center
          text-xs
          font-bold
        ">
          {number}
        </div>

        <p className="
          whitespace-pre-wrap
          text-gray-700
          leading-7
          text-sm
        ">
          {question}
        </p>

      </div>

    </motion.div>
  );
}