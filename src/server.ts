import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Request, Response } from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async (req: Request, res: Response) => {
    // Retrieve the image_url query parameter from the request
    const { image_url } = req.query;
    // console.log(image_url);
    // Validating the image_url query parameter
    // If the query parameter is not present or is not a valid URL, return a 400 - Bad Request response
    if (!image_url) {
      return res.status(400).send({ message: "Image url is required" });
    }
    // If the query parameter is present and is a valid URL, call filterImageFromURL(image_url) to filter the image
    const filteredpath = await filterImageFromURL(image_url);
    // console.log(filteredpath);
    // Send the resulting file in the response
    res.status(200).sendFile(filteredpath);
    // Delete any files on the server on finish of the response
    deleteLocalFiles([filteredpath]);
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();