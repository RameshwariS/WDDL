const File = require('../models/File');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      user: req.user._id
    });

    res.status(201).json(file);
  } catch (error) {
    next(error);
  }
};

// server/controllers/fileController.js
exports.getUserFiles = async (req, res) => {
    try {
      const files = await File.find({ user: req.user._id })
        .sort('-createdAt')
        .select('filename originalname mimetype size createdAt');
        
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files' });
    }
  };

  exports.downloadFile = async (req, res) => {
    try {
      const file = await File.findOne({
        _id: req.params.id,
        user: req.user._id
      });
  
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      const filePath = path.join(__dirname, '..', file.path);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File missing from server' });
      }
  
      // Set proper headers
      res.set({
        'Content-Type': file.mimetype,
        'Content-Disposition': `attachment; filename="${file.originalname}"`,
        'Content-Length': file.size
      });
  
      // Create read stream
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
  
      // Handle stream errors
      fileStream.on('error', (err) => {
        console.error('File stream error:', err);
        res.status(500).end();
      });
  
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ message: 'Download failed' });
    }
  };

exports.deleteFile = async (req, res, next) => {
  try {
    const file = await File.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', file.path);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
};