const CatchAsync = require("../utills/catcAsync");
const Users = require("../model/userModel");
const MultiParty = require("multiparty");
const Images_Upload_Dir = "./public/images";
const IMAGE_BASE_URL = "http://192.168.10.6:3000/images/";
exports.EditProfile = CatchAsync(async (req, res) => {
  let form = new MultiParty.Form({ uploadDir: Images_Upload_Dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.send({ error: err.message });
    console.log(`Feilds ${JSON.stringify(fields, null, 2)}`);
    console.log(`files ${JSON.stringify(files, null, 2)}`);
    if (Object.keys(files).length === 0){
      const profile = await Users.updateOne(
        { _id: fields.user_id[0] },
        {
          $set: {
            name: fields.name[0],
            email: fields.email[0],
          },
        }
      );
      res.status(202).json({
        status: "success",
        message:'Profile Updated Sucessfuly'
      });
      return
    }
    const filepath =await files.image[0].path;
    const ImageFileName = filepath.slice(filepath.lastIndexOf("\\") + 1);
    const imageUrl = IMAGE_BASE_URL + ImageFileName;
    try {
      const profile = await Users.updateOne(
        { _id: fields.user_id[0] },
        {
          $set: {
            name: fields.name[0],
            email: fields.email[0],
            photo: ImageFileName,
          },
        }
      );

      console.log(`profile ${JSON.stringify(profile)}`);
      res.status(202).json({
        status: "success",
        message:'Profile Updated Sucessfuly'
      });
    } catch (err) {
      console.log(err);
      res.send({ error: err.message });
    }
  });
});
exports.getProfile = CatchAsync(async (req, res) => {
  console.log("req.params.id");
  const id = req.query.id;
  const PrfileData = await Users.findOne({ _id: id });
  res.status(200).json({
    status: "Success",
    PrfileData,
  });
});
