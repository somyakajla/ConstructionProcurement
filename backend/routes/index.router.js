const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlProject = require('../controllers/project.controller');
const ctrlProjectBidding = require('../controllers/projectBidding.controller');

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
router.get('/openProjects', ctrlProject.getOpenProjects);
router.put('/updateProject', ctrlProject.updateProject);
router.delete('/deleteProject', ctrlProject.deleteProject);

// /**
//  * Project bidding routes
//  */
router.post('/bidProject', ctrlProjectBidding.bidProject);
router.get('/bidProject', ctrlProjectBidding.getBidProject);
router.get('/bidProjects', ctrlProjectBidding.getBidProjects);
router.put('/updateBidProject', ctrlProjectBidding.updateBidProject);
router.delete('/deleteBidProject', ctrlProjectBidding.deleteBidProject);


module.exports = router;
