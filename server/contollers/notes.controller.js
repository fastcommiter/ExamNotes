import Notes from "../models/notes.model.js";


// ========================================
// GET ALL NOTES HISTORY
// ========================================

export const getNotesHistory = async (req, res) => {

  try {

    console.log(
      "📚 HISTORY REQUEST"
    );

    console.log(
      "REQ USER ID =",
      req.userId
    );

    console.log(
      "REQ USER =",
      req.user
    );


    const userId =
      req.userId ||
      req.user?._id;


    console.log(
      "🆔 HISTORY USER ID =",
      userId
    );


    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });

    }


    // ========================================
    // FIND USER'S NOTES
    // ========================================

    const notes = await Notes.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .select(
        "_id topic classLevel examType revisionMode includeDiagram includeChart createdAt updatedAt"
      );


    console.log(
      "📚 HISTORY NOTES =",
      notes
    );


    return res.status(200).json({

      success: true,

      data: notes,

    });


  } catch (error) {

    console.error(
      "❌ GET NOTES HISTORY ERROR =",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Failed to fetch notes history",

    });

  }

};



// ========================================
// GET SINGLE NOTE
// ========================================

export const getNoteById = async (req, res) => {

  try {

    const userId =
      req.userId ||
      req.user?._id;


    console.log(
      "🆔 SINGLE NOTE USER ID =",
      userId
    );


    if (!userId) {

      return res.status(401).json({

        success: false,

        message: "User not authenticated",

      });

    }


    const note = await Notes.findOne({

      _id: req.params.noteId,

      user: userId,

    });


    console.log(
      "📄 SELECTED NOTE =",
      note
    );


    if (!note) {

      return res.status(404).json({

        success: false,

        message: "Note not found",

      });

    }


    return res.status(200).json({

      success: true,

      data: note,

    });


  } catch (error) {

    console.error(
      "❌ GET SINGLE NOTE ERROR =",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Failed to fetch note",

    });

  }

};