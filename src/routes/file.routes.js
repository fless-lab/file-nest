const express = require("express");
const FileController = require("../controllers/file.controller");
const router = express.Router();

router.post('/', FileController.upload);
router.get('/:id', FileController.get);
router.delete('/:id', FileController.delete);
router.delete('/permanent/:id', FileController.permanentDelete);
router.patch('/restore/:id', FileController.restore);

module.exports = router;