var mongoose = require('mongoose');

var userObject = {
  username: {
    type: String,
    unique: true},
  password: {
    type: String
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  age: {
    type: Number,
    default:69
  },
  currentCity: {
    type: String,
    default: ""
  },
  favoriteMovie: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  viber: {
    type: String,
    default: ""
  },
  line: {
    type: String,
    default: ""
  },
  isSuitor: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  branch: {
    type: String
  },
  rank: {
    type: String
  },
  page: {
    private: {
      matches: [{
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
      }],
      mates: [{
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
      }],
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    },
    public: {
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    },
    common: {
      widgets: [{
        type: mongoose.Schema.ObjectId,
        ref: "YWidgetModel"
      }]
    }
  },
  dateCreated: {
    type: Date,
    default: Date.now},
  google: {
    id: {
      type: String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  },
  facebook: {
    id: {
      type: String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  },
  instagram: {
    id: {
      type: String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  }
};

var collectionParam = {
  collection: "yuser"
};

var userSchema = mongoose.Schema(userObject, collectionParam);
module.exports = userSchema;
