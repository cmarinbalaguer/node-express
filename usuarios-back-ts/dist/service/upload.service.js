exports.uploadfile = (file, route) => {
    try {
        if (!file) {
            return ({
                status: false,
                message: 'No file uploaded'
            });
        }
        else {
            deleteFiles(route);
            let name = file.file;
            name.mv(`${route}/${name.name}`);
            return ({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: name.name,
                    mimetype: name.mimetype,
                    size: name.size
                }
            });
        }
    }
    catch (err) {
        return err;
    }
};
const deleteFiles = (route) => {
    const fs = require('fs').promises;
    const path = require('path');
    const FOLDER_TO_REMOVE = `${route}`;
    fs.readdir(FOLDER_TO_REMOVE)
        .then(files => {
        const unlinkPromises = files.map(file => {
            const filePath = path.join(FOLDER_TO_REMOVE, file);
            return fs.unlink(filePath);
        });
        return Promise.all(unlinkPromises);
    }).catch(err => {
        console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}`);
    });
};
//# sourceMappingURL=upload.service.js.map