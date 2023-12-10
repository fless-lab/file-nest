const FileService = require("../services/file.service");
const { msToCron } = require("../utils/convert");

class FileController {
    static async upload(req, res) {
        try {
            const {filename,content} = req.body;
            const {success,id,error} = await FileService.uploadFile(filename, Buffer.from(content, 'base64'));
            if(!success){
                throw error;
            }
            res.status(201).json({ fileId: id });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: "Unable to upload file" });
        }
    }

    static async get(req, res) {
        try {
            const fileId = req.params.id;
            const {success, metadata, content, error} = await FileService.getFile(fileId);
            if(!success){
                throw error;
            }
            res.status(200).json({metadata,content});
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: "Unable to get requested file" });
        }
    }

    static async delete(req, res) {
        try {
            const fileId = req.params.id;
            const {success, error} = await FileService.deleteFile(fileId);
            if(!success){
                throw error;
            }
            res.status(204).json({success});
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: "Unable to delete selected file" });
        }
    }

    static async permanentDelete(req, res) {
        try {
            const fileId = req.params.id;
            const {success, error}  = await FileService.permanentDeleteFile(fileId);
            if(!success){
                throw error;
            }
            res.status(204).json({success});
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: "Unable to delete (permanently) selected file" });
        }
    }

    static async restore(req, res) {
        try {
            const fileId = req.params.id;
            const {success, error} = await FileService.restoreFile(fileId);
            if(!success){
                throw error;
            }
            res.status(204).json({success});
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: "Unable to restore selected file" });
        }
    }
}

module.exports = FileController;