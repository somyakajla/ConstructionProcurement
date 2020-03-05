const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlProject = require('../controllers/project.controller');
// const ctrlProjectBidding = require('../controllers/projectBidding.controller');

const jwtHelper = require('../config/jwtHelper');

/*
User routes
 */
router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

/*
*Project routes
*/
router.post('/createProject', ctrlProject.createProject);
router.get('/project', ctrlProject.getProject);
router.get('/projects', ctrlProject.getProjects);
router.put('/updateProject', ctrlProject.updateProject);
router.delete('/deleteProject', ctrlProject.deleteProject);

// /**
//  * Project bidding routes
//  */
// router.post('/bidProject', ctrlProjectBidding.bidProject);
// router.get('/bidProject/{projectBidId}', ctrlProject.getProject);
// router.get('/bidProjects', ctrlProject.getProjects);
// router.put('/updateBidProject/{projectBidId}', ctrlProject.updateProject);
// router.delete('/deleteBidProject/{projectBidId}', ctrlProject.deleteProject);


module.exports = router;
