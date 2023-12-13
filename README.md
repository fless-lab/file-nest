# File Nest - File Management Server

Welcome to File Nest, a file management server developed using Node.js, Express, MongoDB, and HMAC authentication for secure operations.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [HMAC Authentication](#hmac-authentication)
- [Logical File Deletion](#logical-file-deletion)
- [Permanent File Deletion](#permanent-file-deletion)
- [Restoration of Deleted Files](#restoration-of-deleted-files)
- [Usage Tutorial](#usage-tutorial)
- [Demo Video](#demo-video)
- [Concrete Example](#concrete-example)
- [Contributions](#contributions)
- [License](#license)

## Introduction

The File Nest server is designed to provide secure and centralized file storage, accessible via a RESTful API. It allows for the storage, retrieval, and deletion of files while ensuring security through HMAC authentication.

## Features

- Centralized file storage.
- Secure authentication via HMAC.
- RESTful API for simple operations.
- Support for large storage volumes and requests.
- Utilization of Node.js and MongoDB for speed and flexibility.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/fless-lab/file-nest.git`
2. Navigate to the directory: `cd file-nest`
3. Install dependencies: `npm install`

## Configuration

Create a `.env` file at the root of the project with the following configurations:

```makefile
PORT=9330
MONGO_URI=mongodb://localhost:27017
DB_NAME=file-nest
HMAC_SECRET=yourHmacSecret
GARBAGE_COLLECTION_INTERVAL=86400000 # Daily automatic cleanup (in milliseconds)
PERMANENT_DELETE_DELAY=604800000 # Delay for permanent deletion (7 days in milliseconds)
```

## Usage

Run the application: `npm start`
The application is now accessible at [http://localhost:9330](http://localhost:9330)

## API Routes

- **POST /files** : Uploads a file.
- **GET /files/:id** : Retrieves a file.
- **DELETE /files/:id** : Deletes a file.
- **DELETE /files/permanent/:id** : Permanently deletes a file.
- **PATCH /files/restore/:id** : Restores a deleted file.
- **GET /metadata/:id** : Retrieves file metadata [Not yet implemented].

## HMAC Authentication

HMAC authentication is used to ensure the security of operations. Make sure to use the HMAC secret key specified in the `.env` file.

## Logical File Deletion

File Nest supports logical file deletion. Deleted files are not immediately removed but are marked for deletion. 
Automatic cleanup of marked files is performed periodically.

## Permanent File Deletion

File Nest supports permanent file deletion. Once done, these files are no longer accessible and are permanently removed from File Nest.

## Restoration of Deleted Files

File Nest supports file restoration. Logically deleted files can be restored [if the garbage collector has not yet passed to permanently delete them].

## Usage Tutorial

Welcome to the File Nest usage tutorial. This guide will show you how to use the basic features of File Nest to manage your files securely.

### 1. Upload a file

To upload a file to File Nest, use the POST method on the `/files` endpoint. Make sure to include your file in the request body. Here's an example using curl:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-hmac-signature: YOUR_HMAC_SIGNATURE" \
  -d '{"content": "Base64_encoded_file_content"}' \
  http://localhost:9330/files
```

Make sure to replace `YOUR_HMAC_SIGNATURE` with your actual HMAC signature.

### 2. Retrieve a file

To retrieve a file from File Nest, use the GET method on the `/files/:id` endpoint. Replace `:id` with the ID of the file you want to retrieve. Here's an example using curl:

```bash
curl -X GET \
  -H "x-hmac-signature: YOUR_HMAC_SIGNATURE" \
  http://localhost:9330/files/FILE_ID
```

Make sure to replace `YOUR_HMAC_SIGNATURE` and `FILE_ID` with the appropriate values.

### 3. Delete a file

To logically delete a file, use the DELETE method on the `/files/:id` endpoint. Here's an example using curl:

```bash
curl -X DELETE \
  -H "x-hmac-signature: YOUR_HMAC_SIGNATURE" \
  http://localhost:9330/files/FILE_ID
```

Make sure to replace `YOUR_HMAC_SIGNATURE` and `FILE_ID` with the appropriate values.

### 4. Permanently delete a file

To permanently delete a file, use the DELETE method on the `/files/permanent/:id` endpoint. Here's an example using curl:

```bash
curl -X DELETE \
  -H "x-hmac-signature: YOUR_HMAC_SIGNATURE" \
  http://localhost:9330/files/permanent/FILE_ID
```

Make sure to replace `YOUR_HMAC_SIGNATURE` and `FILE_ID` with the appropriate values.

### 5. Restore a file

To restore a previously deleted file, use the PATCH method on the `/files/restore/:id` endpoint. Here's an example using curl:

```bash
curl -X PATCH \
  -H "x-hmac-signature: YOUR_HMAC_SIGNATURE" \
  http://localhost:9330/files/restore/FILE_ID
```

Make sure to replace `YOUR_HMAC_SIGNATURE` and `FILE_ID` with the appropriate values.

## Demo Video

For a visual demonstration of File Nest features, you can watch our video on [YouTube - File Nest Demo](https://www.youtube.com/@raoufcode).

## Concrete Example

Want a concrete example of using File Nest with another project that has both a backend and a frontend? Check out this repo 👉 [Github - File Nest Usage Example](https://www.github.com/fless-lab/file-nest-usage-example).

## Contributions

Contributions are welcome! To contribute, follow these steps:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add a new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Create a Pull Request

Thank you for contributing to File Nest!

## License

This project is licensed under the [MIT License](LICENSE).