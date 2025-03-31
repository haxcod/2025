const mongoose = require('mongoose')


invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
