import React from "react";

export default function NotesSidebar({ result }) {
  const scrollToQuestion = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const shortQuestions = result?.data?.questions?.short || [];
  const longQuestions = result?.data?.questions?.long || [];

  const getQuestionText = (question) => {
    if (typeof question === "string") {
      return question;
    }

    return question?.question || "";
  };

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">

        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">

          {/* =========================
              EXAM IMPORTANCE
          ========================= */}

          {result?.data?.importance && (
            <div className="mb-7">

              <h3
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-500
                  mb-3
                "
              >
                Exam Importance
              </h3>

              <div
                className="
                  rounded-xl
                  bg-yellow-50
                  border
                  border-yellow-200
                  p-3
                "
              >

                <div className="flex items-center gap-2">

                  <span className="text-yellow-500">
                    ⭐
                  </span>

                  <span className="text-sm font-semibold text-gray-800">
                    {result.data.importance}
                  </span>

                </div>

              </div>

            </div>
          )}


          {/* =========================
              IMPORTANT QUESTIONS
          ========================= */}

          {(shortQuestions.length > 0 ||
            longQuestions.length > 0) && (

            <div>

              <h3
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-gray-500
                  mb-4
                "
              >
                Important Questions
              </h3>


              {/* =========================
                  SHORT QUESTIONS
              ========================= */}

              {shortQuestions.length > 0 && (

                <div className="mb-6">

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                      mb-2
                    "
                  >
                    Short Questions
                  </p>

                  <div className="space-y-1">

                    {shortQuestions.map(
                      (question, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            scrollToQuestion(
                              `short-question-${index}`
                            )
                          }
                          className="
                            w-full
                            text-left
                            text-xs
                            text-gray-600
                            hover:text-black
                            hover:bg-gray-50
                            rounded-lg
                            px-2
                            py-2
                            transition
                          "
                        >

                          <span className="font-semibold mr-2">
                            {index + 1}.
                          </span>

                          {getQuestionText(question)}

                        </button>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* =========================
                  LONG QUESTIONS
              ========================= */}

              {longQuestions.length > 0 && (

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-gray-800
                      mb-2
                    "
                  >
                    Long Questions
                  </p>

                  <div className="space-y-1">

                    {longQuestions.map(
                      (question, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            scrollToQuestion(
                              `long-question-${index}`
                            )
                          }
                          className="
                            w-full
                            text-left
                            text-xs
                            text-gray-600
                            hover:text-black
                            hover:bg-gray-50
                            rounded-lg
                            px-2
                            py-2
                            transition
                          "
                        >

                          <span className="font-semibold mr-2">
                            {index + 1}.
                          </span>

                          {getQuestionText(question)}

                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>
    </aside>
  );
}