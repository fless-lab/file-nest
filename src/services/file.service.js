const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const FileModel = require("../models/file.model");
const { FileNotFoundError } = require("../common/error");

class FileService {
  static async uploadFile(filename, contentBuffer) {
    try {
      const hash = crypto
        .createHash("sha256")
        .update(contentBuffer)
        .digest("hex");

      const extension = path.extname(filename).toLowerCase();

      const fileId = `${hash}-${new Date().getTime()}`;
      const filePath = path.join(__dirname, "uploads", fileId);
      let mimeType;
      (async ()=>{
        const FileType = await import("file-type");
        mimeType = await FileType.fileTypeFromBuffer(contentBuffer);
      });

      await fs.writeFile(filePath, contentBuffer);

      const fileData = {
        name: fileId,
        size: contentBuffer.length,
        type: mimeType,
        extension: extension,
        hash: hash,
      };

      const savedFile = await FileModel.create(fileData);

      return { success: true, id: savedFile._id };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async getFile(fileId, includeDeleted = false) {
    try {
      let fileQuery = FileModel.findById(fileId);

      if (!includeDeleted) {
        fileQuery = fileQuery.where({ deletedAt: { $eq: null } });
      }

      const file = await fileQuery.exec();

      if (!file) {
        throw new FileNotFoundError();
      }

      const filePath = path.join(__dirname, "uploads", file.name);
      const contentBuffer = await fs.readFile(filePath);

      return { success: true, metadata: file, content: contentBuffer };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async deleteFile(fileId) {
    try {
      const file = await FileModel.findByIdAndUpdate(fileId, {
        deletedAt: new Date(),
      });
      if (!file) {
        throw new FileNotFoundError();
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async permanentDeleteFile(fileId) {
    try {
      const file = await FileModel.findByIdAndDelete(fileId);
      if (!file) {
        throw new FileNotFoundError();
      }

      const filePath = path.join(__dirname, "uploads", file.name);
      await fs.unlink(filePath);

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async restoreFile(fileId) {
    try {
      const file = await FileModel.findByIdAndUpdate(fileId, {
        deletedAt: null,
      });
      if (!file) {
        throw new FileNotFoundError();
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  static async runGarbageCollection() {
    try {
      const delay = parseInt(process.env.PERMANENT_DELETE_DELAY);
      const deletionCutoff = new Date(Date.now() - delay);
      const filesToDelete = await FileModel.find({
        deletedAt:{$ne:null},
        deletedAt:{$lt:deletionCutoff}
      });
      for (const fileToDelete of filesToDelete){
        await this.permanentDeleteFile(fileToDelete._id);
      }
      return {success:true}
    } catch (error) {
      return { success: false, error };
    }
  }
}

module.exports = FileService;
