const express = require("express");
const router = express.Router();

const courseController = require("../controllers/coursepage");
const Auth = require("../middleware/is-auth");

router.get("/course/:courseName/:courseId", Auth, courseController.CoursePage);
router.post("/home/:courseId/:courseName", Auth, courseController.Bookmark);
router.get("/users/:userName/:userId", Auth, courseController.ShowBookmark);
router.post("/unbookmark", Auth, courseController.unbookmark);
router.put("/rating", courseController.rating);
router.post("/certificate/:courseName/:userName", courseController.certificate);
router.post("/courses/:courseId/:userId", courseController.courseCompleted);
router.post(
  "/courses/:courseid/:userid/:progress/:username/:email",
  courseController.ongoingInformation
);

module.exports = router;
