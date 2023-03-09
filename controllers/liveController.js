const ZoomLink = require('../models/live');

async function addZoomLink (req, res){
  try {
    const { description, category ,instrutor_email} = req.body;
    console.log(req.body)

    const newZoomLink = new ZoomLink.Live({
     link: description,
      course_name:category,
      instrutor_email: instrutor_email
    });

    await newZoomLink.save();

    res.status(201).json({
      success: true,
      message: 'Zoom link added successfully',
      data: newZoomLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Unable to add zoom link at this time',
    });
  }
};
module.exports={addZoomLink}
