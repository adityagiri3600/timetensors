const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = require('express').Router();

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET =  process.env.DRIVE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const FOLDER_ID = process.env.DRIVE_FOLDER_ID;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const jsonFilePath = path.join(__dirname,'..', 'abstractFileStructure.json');
let uploadedFiles = {};

if (fs.existsSync(jsonFilePath)) {
    const rawData = fs.readFileSync(jsonFilePath);
    uploadedFiles = JSON.parse(rawData);
}

function createNestedStructure(base, keys, value) {
    if (keys.length === 1) {
        if (!base[keys[0]]) {
            base[keys[0]] = [];
        }
        base[keys[0]].push(value);
        return;
    }
    if (!base[keys[0]]) {
        base[keys[0]] = {};
    }
    createNestedStructure(base[keys[0]], keys.slice(1), value);
}

function getNestedStructure(base, keys) {
    if (keys.length === 1) {
        return base[keys[0]] || null;
    }
    if (!base[keys[0]]) {
        return null;
    }
    return getNestedStructure(base[keys[0]], keys.slice(1));
}

router.post('/', upload.single('file'), async (req, res) => {
    const filePathParam = req.body.filePath;

    if (!req.file || !filePathParam) {
        return res.status(400).send('No file uploaded.');
    }

    const file = req.file;
    const filePath = path.join(__dirname, '..', 'files', file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
                parents: [FOLDER_ID]
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(filePath)
            }
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const fileLink = `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`;

        // delete file
        fs.unlinkSync(filePath);

        const pathParts = filePathParam.split('/');
        createNestedStructure(uploadedFiles, pathParts, { name: file.originalname, link: fileLink });
        fs.writeFileSync(jsonFilePath, JSON.stringify(uploadedFiles, null, 2));

        res.send(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to upload file.');
    }
});


router.get('/:filePath', (req, res) => {
    const filePathParam = req.params.filePath;
    const pathParts = filePathParam.split('/');

    const fileData = getNestedStructure(uploadedFiles, pathParts);

    if (fileData) {
        res.json(fileData);
    } else {
        res.status(404).send('File path not found.');
    }
});

module.exports = router;