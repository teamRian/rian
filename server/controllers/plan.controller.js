import Plan from '../models/plan';
import url from 'url';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';
export function calendarRequest(req,res){
  // var parsed = url.parse(req.url, true).query; // true parse queryString
    Plan.find()
      .then(response=>{
        console.log('response from database: ', response)
        res.json(response)
      })
      .catch(err=>console.log(err))

}

export function calendarPost(req,res){
  console.log('req:body!', req.body)
  var post = new Plan(req.body);
  post.save()
    .then(form=>{
      console.log('FORM!!!::', form)
      res.json(form)
    })
    .catch(err=>console.log(err))
}

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getSchedule(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
