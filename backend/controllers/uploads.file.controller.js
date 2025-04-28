exports.uploadsFile = (req, res) => {
    console.log(req.file)
    try {
        if (!req.file) {
            return res.send({
                message: 'Please select file!',
            });
        }
        const url = `http://${req.host}/uploads/${req.file.filename}`
        return res.send({
            message: 'File uploaded successfully!',
            file: url,
        });
    } catch (err) {
       return res.status(500).send({
            message: 'Error uploading file',
            error: err.message,
        });
    }
};
