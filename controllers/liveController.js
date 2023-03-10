const ZoomCTRL = require('../models/live');


async function addZoomLink (req, res){
  try {
     const { title, date, time, duration, link } = req.body;
    console.log(req.body)
 
    const newZoomLink = new ZoomCTRL.Live({
      title:req.body.title,
      date:req.body.date,
      time:req.body.time,
      duration:req.body.duration,
      link:req.body.link
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

function getZoomLink(req,res){
  const zoomLink = ZoomCTRL.Live.find({},(err,result)=>{
    if(err) throw err
    return res.send(result)
  }) 

}


module.exports = {addZoomLink ,getZoomLink};
