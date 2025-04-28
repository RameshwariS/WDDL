// server/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../config/multer');
const { protect } = require('../middleware/auth');

router.use(protect);


router.get('/myfiles', fileController.getUserFiles);
router.get('/:id/download', fileController.downloadFile);
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;