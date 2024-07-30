
import express from 'express';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileData = fs.createReadStream(filePath);
    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v13.0/8086887734/media`,
      headers: {
        'Authorization': `Bearer EAAWhrUSWj7YBO1yFxBminl4ZCCNZBPpbCVEZBeFktntDOfXBTS5POodETKpI9PZAMtkerbZCYlqpqHZBjZB0JIj1XMc5SWeFnrPA1Gfpqq7XRYRqRYw9o8gZBsV9iO4tqanCCbMZBCvoVKPaZAsU0hDqPJ1ttnA2IN608e9dALMZCQUnmlymB2hvBL3SyMJ5R1W4mGZARQzQYrX2LM6s3bghltfLqY3pZCONrQIrIeuCpyZBkZD`,
        'Content-Type': 'multipart/form-data',
      },
      data: {
        messaging_product: 'whatsapp',
        file: fileData,
      },
    });

    const mediaId = response.data.id;

    await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v13.0/8086887734/messages`,
      headers: {
        'Authorization': `Bearer EAAWhrUSWj7YBO1yFxBminl4ZCCNZBPpbCVEZBeFktntDOfXBTS5POodETKpI9PZAMtkerbZCYlqpqHZBjZB0JIj1XMc5SWeFnrPA1Gfpqq7XRYRqRYw9o8gZBsV9iO4tqanCCbMZBCvoVKPaZAsU0hDqPJ1ttnA2IN608e9dALMZCQUnmlymB2hvBL3SyMJ5R1W4mGZARQzQYrX2LM6s3bghltfLqY3pZCONrQIrIeuCpyZBkZD`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: 'whatsapp',
        to: '8547163847',
        type: 'document',
        document: {
          id: mediaId,
          caption: 'Here is your PDF document.',
        },
      },
    });

    res.send('PDF sent successfully!');
  } catch (error) {
    console.error('Error sending PDF:', error);
    res.status(500).send('Failed to send PDF');
  }
});

export default router;
 