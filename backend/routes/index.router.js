const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlProject = require('../controllers/project.controller');
const ctrlProjectBidding = require('../controllers/projectBidding.controller');
const ctrlProgressTimeline = require('../controllers/progressTimeline.controller');

const jwtHelper = require('../config/jwtHelper');

/*
User routes
 */
router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/users', ctrlUser.users);


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
router.get('/getbidProject', ctrlProjectBidding.getBidProject);
router.get('/projectBidList', ctrlProjectBidding.getprojectBidlist);
router.get('/acceptWinningBid', ctrlProjectBidding.acceptWinningBid);
router.get('/getContractorBids', ctrlProjectBidding.getContractorBids);
router.put('/updateProjectBid', ctrlProjectBidding.updateProjectBid);
router.delete('/deleteProjectBid', ctrlProjectBidding.deleteProjectBid);

/**
 * getProgressList
 */
router.post('/createProgressTimeline', ctrlProgressTimeline.ProgressTimeline);
router.get('/getProjectTimelineList', ctrlProgressTimeline.getprojectTimelineList);

module.exports = router;
