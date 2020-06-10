const express = require('express');
const db = require('./data/db');

const router = express.Router();

router.post('/', async (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}
	try {
		const { id } = await db.insert(req.body);
		const [ post ] = await db.findById(id);
		res.status(201).json(post);
	} catch (e) {
		return res.status(500).json({
			error: 'There was an error while saving the post to the database'
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const posts = await db.find();
		res.json(posts);
	} catch (e) {
		return res.status(500).json({
			error: 'The posts information could not be retrieved.'
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const [ post ] = await db.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		}
		res.json(post);
	} catch (e) {
		return res.status(500).json({
			error: 'The post information could not be retrieved.'
		});
	}
});

router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}
	try {
		const [ post ] = await db.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
        }
        await db.update(req.params.id, req.body)
        const [ updatedPost ] = await db.findById(req.params.id);
		res.json(updatedPost);
	} catch (e) {
		return res.status(500).json({
			error: 'The post information could not be modified.'
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const [ post ] = await db.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		}
		await db.remove(req.param.id);
		res.json(true);
	} catch (e) {
		return res.status(500).json({
			error: 'The post could not be removed'
		});
	}
});

router.post('/:id/comments', async (req, res) => {
	if (!req.body.text) {
		return res.status(400).json({
			errorMessage: 'Please provide text for the comment.'
		});
	}
	try {
		const [ post ] = await db.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		}
		const { id } = await db.insertComment(req.body);
		const [ comment ] = await db.findCommentById(id);
		res.status(201).json(comment);
	} catch (e) {
		return res.status(500).json({
			error: 'There was an error while saving the comment to the database'
		});
	}
});

router.get('/:id/comments', async (req, res) => {
	try {
		const [ post ] = await db.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				message: 'The post with the specified ID does not exist.'
			});
		}
		const comments = await db.findPostComments(req.params.id);
		res.json(comments);
	} catch (e) {
		return res.status(500).json({
			error: 'The comments information could not be retrieved.'
		});
	}
});



module.exports = router;
